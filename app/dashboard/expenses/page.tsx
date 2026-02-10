"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { getCurrentUser } from "@/lib/firebase";
import {
  createExpense,
  getAllExpenses,
  markExpenseAsPaid,
  confirmExpenseReceived,
  deleteExpense,
  updateExpense,
  calculateMonthlySettlement,
  calculatePartnerShare,
  getExpenseMonths,
} from "@/lib/firestore";
import type { Expense, ExpenseCategory, CoFounder, MonthlySettlement } from "@/types";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  DollarSign,
  Plus,
  CheckCircle,
  Clock,
  Trash2,
  Send,
  ChevronLeft,
  ChevronRight,
  Edit3,
  X,
  Download,
  TrendingUp,
  TrendingDown,
  ArrowRightLeft,
  Receipt,
  Laptop,
  Megaphone,
  Server,
  Monitor,
  Building2,
  Plane,
  UtensilsCrossed,
  CreditCard,
  Scale,
  Palette,
  Globe,
  Link,
  BarChart3,
  Package,
  Filter,
  CalendarDays,
  FileText,
} from "lucide-react";

// ─── Category config with icons & colors ────────────────────────────────
const CATEGORY_CONFIG: Record<
  ExpenseCategory,
  { label: string; icon: React.ElementType; color: string; bgColor: string }
> = {
  software: { label: "Software", icon: Laptop, color: "text-violet-600", bgColor: "bg-violet-100" },
  marketing: { label: "Marketing", icon: Megaphone, color: "text-pink-600", bgColor: "bg-pink-100" },
  infrastructure: { label: "Infrastructure", icon: Server, color: "text-cyan-600", bgColor: "bg-cyan-100" },
  equipment: { label: "Equipment", icon: Monitor, color: "text-slate-600", bgColor: "bg-slate-100" },
  office: { label: "Office", icon: Building2, color: "text-amber-600", bgColor: "bg-amber-100" },
  travel: { label: "Travel", icon: Plane, color: "text-sky-600", bgColor: "bg-sky-100" },
  meals: { label: "Meals", icon: UtensilsCrossed, color: "text-orange-600", bgColor: "bg-orange-100" },
  subscriptions: { label: "Subscriptions", icon: CreditCard, color: "text-indigo-600", bgColor: "bg-indigo-100" },
  legal: { label: "Legal", icon: Scale, color: "text-rose-600", bgColor: "bg-rose-100" },
  design: { label: "Design", icon: Palette, color: "text-fuchsia-600", bgColor: "bg-fuchsia-100" },
  hosting: { label: "Hosting", icon: Globe, color: "text-teal-600", bgColor: "bg-teal-100" },
  domains: { label: "Domains", icon: Link, color: "text-emerald-600", bgColor: "bg-emerald-100" },
  advertising: { label: "Advertising", icon: BarChart3, color: "text-red-600", bgColor: "bg-red-100" },
  other: { label: "Other", icon: Package, color: "text-gray-600", bgColor: "bg-gray-100" },
};

// ─── Helpers ─────────────────────────────────────────────────────────────
function formatMonthKey(monthKey: string): string {
  const [year, month] = monthKey.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function getCurrentMonthKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function navigateMonth(monthKey: string, direction: -1 | 1): string {
  const [year, month] = monthKey.split("-").map(Number);
  const d = new Date(year, month - 1 + direction, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function splitLabel(expense: Expense): string {
  if (expense.split_type === "50/50") return "50/50";
  if (expense.split_type === "custom") return `${expense.split_percentage || 50}/${100 - (expense.split_percentage || 50)}`;
  return "Full";
}

// ─── Main Page ───────────────────────────────────────────────────────────
export default function ExpensesPage() {
  // ── State ──────────────────────────────────────────────────────────────
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [userId, setUserId] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<CoFounder | null>(null);
  const [allExpenses, setAllExpenses] = useState<Expense[]>([]);

  // Month navigation
  const [selectedMonth, setSelectedMonth] = useState<string>(getCurrentMonthKey());

  // UI panels
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [paymentProofInput, setPaymentProofInput] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "paid_by_partner" | "completed">("all");

  // Form data
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "other" as ExpenseCategory,
    date: new Date().toISOString().split("T")[0],
    split_type: "50/50" as "50/50" | "custom" | "full",
    split_percentage: "50",
    receipt_note: "",
  });

  // ── Data loading ───────────────────────────────────────────────────────
  useEffect(() => {
    loadUserAndExpenses();
  }, []);

  async function loadUserAndExpenses() {
    const user = await getCurrentUser();
    if (user) {
      setUserId(user.uid);
      const coFounder: CoFounder = user.email?.includes("issiah") ? "issiah" : "soya";
      setCurrentUser(coFounder);
      await loadExpenses();
    }
    setInitialLoading(false);
  }

  async function loadExpenses() {
    const { data } = await getAllExpenses();
    if (data) {
      setAllExpenses(data);
    }
  }

  // ── Derived data ───────────────────────────────────────────────────────
  const monthExpenses = useMemo(
    () => allExpenses.filter((e) => (e.month_key || e.date.substring(0, 7)) === selectedMonth),
    [allExpenses, selectedMonth]
  );

  const settlement: MonthlySettlement = useMemo(
    () => calculateMonthlySettlement(monthExpenses),
    [monthExpenses]
  );

  const availableMonths = useMemo(() => getExpenseMonths(allExpenses), [allExpenses]);

  const filteredExpenses = useMemo(() => {
    if (filter === "all") return monthExpenses;
    return monthExpenses.filter((e) => e.status === filter);
  }, [monthExpenses, filter]);

  // Category breakdown for the current month
  const categoryBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    monthExpenses.forEach((e) => {
      map[e.category] = (map[e.category] || 0) + e.amount;
    });
    return Object.entries(map)
      .sort(([, a], [, b]) => b - a)
      .map(([cat, total]) => ({ category: cat as ExpenseCategory, total }));
  }, [monthExpenses]);

  // ── Form handlers ──────────────────────────────────────────────────────
  const resetForm = useCallback(() => {
    setFormData({
      amount: "",
      description: "",
      category: "other",
      date: new Date().toISOString().split("T")[0],
      split_type: "50/50",
      split_percentage: "50",
      receipt_note: "",
    });
    setEditingExpense(null);
    setShowForm(false);
  }, []);

  const openEditForm = useCallback((expense: Expense) => {
    setEditingExpense(expense);
    setFormData({
      amount: String(expense.amount),
      description: expense.description,
      category: expense.category,
      date: expense.date,
      split_type: expense.split_type || "50/50",
      split_percentage: String(expense.split_percentage || 50),
      receipt_note: expense.receipt_note || "",
    });
    setShowForm(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !currentUser) return;

    setLoading(true);
    try {
      if (editingExpense) {
        // Update existing
        const result = await updateExpense(editingExpense.id, {
          amount: parseFloat(formData.amount),
          description: formData.description,
          category: formData.category,
          date: formData.date,
          split_type: formData.split_type,
          split_percentage: formData.split_type === "custom" ? parseInt(formData.split_percentage) : undefined,
          receipt_note: formData.receipt_note || undefined,
        });
        if (result.success) {
          resetForm();
          await loadExpenses();
        } else {
          alert(`Failed to update: ${result.error}`);
        }
      } else {
        // Create new
        const result = await createExpense({
          created_by: userId,
          created_by_name: currentUser,
          amount: parseFloat(formData.amount),
          description: formData.description,
          category: formData.category,
          date: formData.date,
          split_type: formData.split_type,
          split_percentage: formData.split_type === "custom" ? parseInt(formData.split_percentage) : undefined,
          receipt_note: formData.receipt_note || undefined,
        });
        if (result.success) {
          resetForm();
          await loadExpenses();
        } else {
          alert(`Failed to add expense: ${result.error}`);
        }
      }
    } catch (error) {
      console.error("Error saving expense:", error);
      alert("Failed to save expense");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsPaid = async (expense: Expense) => {
    if (!paymentProofInput.trim()) {
      alert('Please provide payment details (e.g., "Sent via Venmo")');
      return;
    }
    setLoading(true);
    try {
      const result = await markExpenseAsPaid(expense.id, paymentProofInput);
      if (result.success) {
        setSelectedExpense(null);
        setPaymentProofInput("");
        await loadExpenses();
      } else {
        alert(`Failed: ${result.error}`);
      }
    } catch {
      alert("Failed to mark as paid");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmReceived = async (expense: Expense) => {
    if (!window.confirm("Confirm you received this payment?")) return;
    setLoading(true);
    try {
      const result = await confirmExpenseReceived(expense.id);
      if (result.success) await loadExpenses();
      else alert(`Failed: ${result.error}`);
    } catch {
      alert("Failed to confirm");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (expenseId: string) => {
    if (!window.confirm("Delete this expense? This cannot be undone.")) return;
    setLoading(true);
    try {
      const result = await deleteExpense(expenseId);
      if (result.success) await loadExpenses();
      else alert(`Failed: ${result.error}`);
    } catch {
      alert("Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  // ── Export ─────────────────────────────────────────────────────────────
  const handleExportCSV = useCallback(() => {
    if (monthExpenses.length === 0) return;
    const header = "Date,Description,Category,Paid By,Amount,Split,Partner Share,Status\n";
    const rows = monthExpenses
      .map((e) => {
        const partnerShare = calculatePartnerShare(e);
        return `${e.date},"${e.description}",${e.category},${e.created_by_name},${e.amount.toFixed(2)},${splitLabel(e)},${partnerShare.toFixed(2)},${e.status}`;
      })
      .join("\n");

    const summary = `\n\n--- SETTLEMENT SUMMARY ---\nMonth,${formatMonthKey(selectedMonth)}\nIssiah Total Paid,${settlement.issiah_total_paid.toFixed(2)}\nSoya Total Paid,${settlement.soya_total_paid.toFixed(2)}\nIssiah Owes Soya,${settlement.issiah_owes_soya.toFixed(2)}\nSoya Owes Issiah,${settlement.soya_owes_issiah.toFixed(2)}\nNet Settlement,"${settlement.net_owed_by === "settled" ? "Settled - no payment needed" : `${settlement.net_owed_by === "issiah" ? "Issiah" : "Soya"} pays ${settlement.net_owed_by === "issiah" ? "Soya" : "Issiah"} ${formatCurrency(settlement.net_amount)}`}"`;

    const blob = new Blob([header + rows + summary], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `synqbiz-expenses-${selectedMonth}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [monthExpenses, selectedMonth, settlement]);

  // ── Status badge ───────────────────────────────────────────────────────
  const getStatusBadge = (status: Expense["status"]) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-semibold border border-amber-200">
            <Clock className="w-3 h-3" />
            Awaiting Split
          </span>
        );
      case "paid_by_partner":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-200">
            <Send className="w-3 h-3" />
            Payment Sent
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold border border-green-200">
            <CheckCircle className="w-3 h-3" />
            Settled
          </span>
        );
    }
  };

  // ── Loading state ──────────────────────────────────────────────────────
  if (initialLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600" />
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Expense Tracker</h1>
          <p className="text-gray-500 mt-1">Track shared expenses &middot; Settle up at month end</p>
        </div>
        <div className="flex gap-3">
          {monthExpenses.length > 0 && (
            <Button variant="outline" size="sm" onClick={handleExportCSV}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          )}
          <Button
            onClick={() => {
              if (showForm) resetForm();
              else setShowForm(true);
            }}
          >
            {showForm ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
            {showForm ? "Cancel" : "Add Expense"}
          </Button>
        </div>
      </div>

      {/* ── Month Navigator ────────────────────────────────────────────── */}
      <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 px-5 py-3 shadow-sm">
        <button
          onClick={() => setSelectedMonth(navigateMonth(selectedMonth, -1))}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3">
          <CalendarDays className="w-5 h-5 text-primary-600" />
          <span className="text-lg font-semibold text-gray-900">{formatMonthKey(selectedMonth)}</span>
          {selectedMonth === getCurrentMonthKey() && (
            <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
              Current
            </span>
          )}
        </div>
        <button
          onClick={() => setSelectedMonth(navigateMonth(selectedMonth, 1))}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* ── Quick month selector (if past months exist) ────────────────── */}
      {availableMonths.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {availableMonths.slice(0, 6).map((mk) => (
            <button
              key={mk}
              onClick={() => setSelectedMonth(mk)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                mk === selectedMonth
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {formatMonthKey(mk)}
            </button>
          ))}
        </div>
      )}

      {/* ── Add / Edit Expense Form ────────────────────────────────────── */}
      {showForm && (
        <Card className="border-2 border-primary-200 shadow-md">
          <CardHeader className="bg-gradient-to-r from-primary-50 to-blue-50">
            <CardTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-primary-600" />
              {editingExpense ? "Edit Expense" : "Log New Expense"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Amount */}
                <div>
                  <Input
                    type="number"
                    label="Amount ($)"
                    placeholder="0.00"
                    step="0.01"
                    min="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
                    required
                  />
                </div>

                {/* Date */}
                <div>
                  <Input
                    type="date"
                    label="Date"
                    value={formData.date}
                    onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                    value={formData.category}
                    onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value as ExpenseCategory }))}
                  >
                    {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => (
                      <option key={key} value={key}>
                        {cfg.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <Input
                  type="text"
                  label="Description"
                  placeholder="e.g., AWS hosting for January, Figma Pro license"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>

              {/* Split Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Split Type</label>
                <div className="flex gap-3">
                  {(["50/50", "custom", "full"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, split_type: type }))}
                      className={`flex-1 py-2.5 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
                        formData.split_type === type
                          ? "border-primary-500 bg-primary-50 text-primary-700"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {type === "50/50" && "50/50 Split"}
                      {type === "custom" && "Custom Split"}
                      {type === "full" && "Full Reimburse"}
                    </button>
                  ))}
                </div>
                {formData.split_type === "50/50" && (
                  <p className="text-xs text-gray-500 mt-1.5">Each person pays half</p>
                )}
                {formData.split_type === "full" && (
                  <p className="text-xs text-gray-500 mt-1.5">Partner reimburses the full amount</p>
                )}
              </div>

              {/* Custom split slider */}
              {formData.split_type === "custom" && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Partner&apos;s Share: {formData.split_percentage}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    step="5"
                    value={formData.split_percentage}
                    onChange={(e) => setFormData((prev) => ({ ...prev, split_percentage: e.target.value }))}
                    className="w-full accent-primary-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>You: {100 - parseInt(formData.split_percentage)}%</span>
                    <span>Partner: {formData.split_percentage}%</span>
                  </div>
                  {formData.amount && (
                    <p className="text-sm text-primary-600 font-medium mt-2">
                      Partner pays: {formatCurrency(parseFloat(formData.amount) * (parseInt(formData.split_percentage) / 100))}
                    </p>
                  )}
                </div>
              )}

              {/* Receipt note */}
              <div>
                <Input
                  type="text"
                  label="Notes (optional)"
                  placeholder="Invoice #, vendor name, additional context..."
                  value={formData.receipt_note}
                  onChange={(e) => setFormData((prev) => ({ ...prev, receipt_note: e.target.value }))}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" isLoading={loading}>
                  {editingExpense ? "Save Changes" : "Add Expense"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* ── Net Settlement Card ────────────────────────────────────────── */}
      {monthExpenses.length > 0 && (
        <Card className={`border-2 shadow-md ${
          settlement.net_owed_by === "settled"
            ? "border-green-200 bg-gradient-to-r from-green-50 to-emerald-50"
            : "border-primary-200 bg-gradient-to-r from-primary-50 to-blue-50"
        }`}>
          <CardContent className="py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Left: settlement summary */}
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                  settlement.net_owed_by === "settled" ? "bg-green-100" : "bg-primary-100"
                }`}>
                  {settlement.net_owed_by === "settled" ? (
                    <CheckCircle className="w-7 h-7 text-green-600" />
                  ) : (
                    <ArrowRightLeft className="w-7 h-7 text-primary-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {formatMonthKey(selectedMonth)} Settlement
                  </p>
                  {settlement.net_owed_by === "settled" ? (
                    <p className="text-xl font-bold text-green-700">All settled up!</p>
                  ) : (
                    <p className="text-xl font-bold text-gray-900">
                      <span className="capitalize">{settlement.net_owed_by}</span> owes{" "}
                      <span className="capitalize">
                        {settlement.net_owed_by === "issiah" ? "Soya" : "Issiah"}
                      </span>{" "}
                      <span className="text-primary-600">{formatCurrency(settlement.net_amount)}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Right: individual totals */}
              <div className="flex gap-8">
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Issiah Paid</p>
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(settlement.issiah_total_paid)}</p>
                </div>
                <div className="w-px bg-gray-300" />
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Soya Paid</p>
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(settlement.soya_total_paid)}</p>
                </div>
                <div className="w-px bg-gray-300" />
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Combined</p>
                  <p className="text-lg font-bold text-gray-900">
                    {formatCurrency(settlement.issiah_total_paid + settlement.soya_total_paid)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Summary Stats Row ──────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Issiah Owes</p>
                <p className="text-lg font-bold text-orange-600">
                  {formatCurrency(settlement.issiah_owes_soya)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Soya Owes</p>
                <p className="text-lg font-bold text-blue-600">
                  {formatCurrency(settlement.soya_owes_issiah)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Pending</p>
                <p className="text-lg font-bold text-amber-600">
                  {monthExpenses.filter((e) => e.status === "pending").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Settled</p>
                <p className="text-lg font-bold text-green-600">
                  {monthExpenses.filter((e) => e.status === "completed").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Category Breakdown ─────────────────────────────────────────── */}
      {categoryBreakdown.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="w-4 h-4 text-gray-500" />
              Spending by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {categoryBreakdown.map(({ category, total }) => {
                const cfg = CATEGORY_CONFIG[category];
                const Icon = cfg.icon;
                const totalSpend = settlement.issiah_total_paid + settlement.soya_total_paid;
                const pct = totalSpend > 0 ? Math.round((total / totalSpend) * 100) : 0;
                return (
                  <div key={category} className="text-center p-3 rounded-lg bg-gray-50 border border-gray-100">
                    <div className={`w-9 h-9 ${cfg.bgColor} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                      <Icon className={`w-4 h-4 ${cfg.color}`} />
                    </div>
                    <p className="text-xs font-medium text-gray-500">{cfg.label}</p>
                    <p className="text-sm font-bold text-gray-900">{formatCurrency(total)}</p>
                    <p className="text-xs text-gray-400">{pct}%</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Filter Tabs ────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-400" />
        {(["all", "pending", "paid_by_partner", "completed"] as const).map((f) => {
          const count =
            f === "all" ? monthExpenses.length : monthExpenses.filter((e) => e.status === f).length;
          const labels = { all: "All", pending: "Pending", paid_by_partner: "Paid", completed: "Settled" };
          const activeColors = {
            all: "bg-gray-800 text-white",
            pending: "bg-amber-600 text-white",
            paid_by_partner: "bg-blue-600 text-white",
            completed: "bg-green-600 text-white",
          };
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === f ? activeColors[f] : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {labels[f]} ({count})
            </button>
          );
        })}
      </div>

      {/* ── Expenses List ──────────────────────────────────────────────── */}
      <div className="space-y-3">
        {filteredExpenses.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <DollarSign className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">
                {monthExpenses.length === 0
                  ? `No expenses for ${formatMonthKey(selectedMonth)}`
                  : "No expenses match this filter"}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                {monthExpenses.length === 0
                  ? "Add your first expense to start tracking"
                  : "Try a different filter"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredExpenses.map((expense) => {
            const isCreator = expense.created_by_name === currentUser;
            const partnerName = expense.created_by_name === "issiah" ? "Soya" : "Issiah";
            const creatorName = expense.created_by_name === "issiah" ? "Issiah" : "Soya";
            const partnerShare = calculatePartnerShare(expense);
            const catCfg = CATEGORY_CONFIG[expense.category] || CATEGORY_CONFIG.other;
            const CatIcon = catCfg.icon;

            return (
              <Card key={expense.id} className="hover:shadow-md transition-all border border-gray-200">
                <CardContent className="py-4">
                  <div className="flex items-start gap-4">
                    {/* Category icon */}
                    <div className={`w-11 h-11 ${catCfg.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <CatIcon className={`w-5 h-5 ${catCfg.color}`} />
                    </div>

                    {/* Main content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base font-semibold text-gray-900 truncate">
                              {expense.description}
                            </h3>
                            {getStatusBadge(expense.status)}
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                            <span>{formatDate(expense.date)}</span>
                            <span>&middot;</span>
                            <span className="capitalize">Paid by {creatorName}</span>
                            <span>&middot;</span>
                            <span>{splitLabel(expense)} split</span>
                          </div>
                          {expense.receipt_note && (
                            <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              {expense.receipt_note}
                            </p>
                          )}
                          {expense.payment_proof && (
                            <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              {expense.payment_proof}
                            </p>
                          )}
                        </div>

                        {/* Amount column */}
                        <div className="text-right flex-shrink-0">
                          <p className="text-lg font-bold text-gray-900">{formatCurrency(expense.amount)}</p>
                          <p className="text-xs text-gray-500">
                            {partnerName}&apos;s share:{" "}
                            <span className="font-semibold text-primary-600">{formatCurrency(partnerShare)}</span>
                          </p>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 mt-3">
                        {/* Partner can mark as paid when pending */}
                        {!isCreator && expense.status === "pending" && (
                          <>
                            {selectedExpense?.id === expense.id ? (
                              <div className="flex items-center gap-2 flex-1">
                                <input
                                  type="text"
                                  placeholder='How did you pay? (e.g., "Sent via Zelle")'
                                  value={paymentProofInput}
                                  onChange={(e) => setPaymentProofInput(e.target.value)}
                                  className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                                <Button size="sm" onClick={() => handleMarkAsPaid(expense)} isLoading={loading}>
                                  Send
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => { setSelectedExpense(null); setPaymentProofInput(""); }}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            ) : (
                              <Button size="sm" onClick={() => setSelectedExpense(expense)}>
                                <Send className="w-3.5 h-3.5 mr-1.5" />
                                Mark as Paid
                              </Button>
                            )}
                          </>
                        )}

                        {/* Creator can confirm receipt */}
                        {isCreator && expense.status === "paid_by_partner" && (
                          <Button
                            size="sm"
                            onClick={() => handleConfirmReceived(expense)}
                            isLoading={loading}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                            Confirm Received
                          </Button>
                        )}

                        {/* Creator can edit or delete when pending */}
                        {isCreator && expense.status === "pending" && (
                          <>
                            <Button size="sm" variant="ghost" onClick={() => openEditForm(expense)}>
                              <Edit3 className="w-3.5 h-3.5 mr-1.5" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(expense.id)}
                              className="text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                              Delete
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* ── Footer: Total expenses in dataset ──────────────────────────── */}
      {allExpenses.length > 0 && (
        <div className="text-center text-sm text-gray-400 py-4">
          {allExpenses.length} total expense{allExpenses.length !== 1 ? "s" : ""} tracked across{" "}
          {availableMonths.length} month{availableMonths.length !== 1 ? "s" : ""}
          &nbsp;&middot;&nbsp; Data saved to cloud &middot; Persists across sessions
        </div>
      )}
    </div>
  );
}
