"use client";

import { useState, useEffect } from "react";
import { getCurrentUser } from "@/lib/firebase";
import {
  createExpense,
  getAllExpenses,
  markExpenseAsPaid,
  confirmExpenseReceived,
  deleteExpense
} from "@/lib/firestore";
import type { Expense, CoFounder } from "@/types";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  DollarSign,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle,
  Trash2,
  Send
} from "lucide-react";

export default function ExpensesPage() {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<CoFounder | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [paymentProofInput, setPaymentProofInput] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'paid_by_partner' | 'completed'>('all');

  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: 'other' as Expense['category'],
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    loadUserAndExpenses();
  }, []);

  async function loadUserAndExpenses() {
    const user = await getCurrentUser();
    if (user) {
      setUserId(user.uid);
      // Determine cofounder based on email
      const coFounder: CoFounder = user.email?.includes('issiah') ? 'issiah' : 'soya';
      setCurrentUser(coFounder);
      await loadExpenses();
    }
  }

  async function loadExpenses() {
    const { data } = await getAllExpenses();
    if (data) {
      setExpenses(data);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !currentUser) {
      alert('Please log in first');
      return;
    }

    setLoading(true);
    try {
      const result = await createExpense({
        created_by: userId,
        created_by_name: currentUser,
        amount: parseFloat(formData.amount),
        description: formData.description,
        category: formData.category,
        date: formData.date,
      });

      if (result.success) {
        alert('Expense added successfully!');
        setShowForm(false);
        setFormData({
          amount: '',
          description: '',
          category: 'other',
          date: new Date().toISOString().split('T')[0],
        });
        await loadExpenses();
      } else {
        alert(`Failed to add expense: ${result.error}`);
      }
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense');
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
        alert('Marked as paid!');
        setSelectedExpense(null);
        setPaymentProofInput('');
        await loadExpenses();
      } else {
        alert(`Failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to mark as paid');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmReceived = async (expense: Expense) => {
    if (!window.confirm('Confirm you received this payment?')) return;

    setLoading(true);
    try {
      const result = await confirmExpenseReceived(expense.id);
      if (result.success) {
        alert('Confirmed received!');
        await loadExpenses();
      } else {
        alert(`Failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to confirm');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (expenseId: string) => {
    if (!window.confirm('Delete this expense?')) return;

    setLoading(true);
    try {
      const result = await deleteExpense(expenseId);
      if (result.success) {
        alert('Expense deleted');
        await loadExpenses();
      } else {
        alert(`Failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete');
    } finally {
      setLoading(false);
    }
  };

  // Calculate totals
  const calculateTotals = () => {
    const soyaExpenses = expenses.filter(e => e.created_by_name === 'soya');
    const issiahExpenses = expenses.filter(e => e.created_by_name === 'issiah');

    const issiahOwesToSoya = soyaExpenses
      .filter(e => e.status !== 'completed')
      .reduce((sum, e) => sum + e.amount / 2, 0);

    const soyaOwesToIssiah = issiahExpenses
      .filter(e => e.status !== 'completed')
      .reduce((sum, e) => sum + e.amount / 2, 0);

    const totalPending = expenses
      .filter(e => e.status === 'pending')
      .reduce((sum, e) => sum + e.amount, 0);

    const totalCompleted = expenses
      .filter(e => e.status === 'completed')
      .reduce((sum, e) => sum + e.amount, 0);

    return { issiahOwesToSoya, soyaOwesToIssiah, totalPending, totalCompleted };
  };

  const totals = calculateTotals();
  const filteredExpenses = filter === 'all' ? expenses : expenses.filter(e => e.status === filter);

  const getStatusBadge = (status: Expense['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
            <Clock className="w-4 h-4" />
            Awaiting Payment
          </span>
        );
      case 'paid_by_partner':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            <Send className="w-4 h-4" />
            Payment Sent
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            Completed
          </span>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Expense Tracker</h1>
          <p className="text-gray-600 mt-1">Shared expenses & reimbursements</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" />
          {showForm ? 'Cancel' : 'Add Expense'}
        </Button>
      </div>

      {/* Add Expense Form */}
      {showForm && (
        <Card className="border-2 border-primary-200">
          <CardHeader className="bg-primary-50">
            <CardTitle>Add New Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="number"
                  label="Amount ($)"
                  placeholder="100.00"
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                  required
                />

                <Input
                  type="date"
                  label="Date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  required
                />

                <div className="md:col-span-2">
                  <Input
                    type="text"
                    label="Description"
                    placeholder="e.g., AWS hosting fees"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Category
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as Expense['category'] }))}
                  >
                    <option value="software">Software</option>
                    <option value="marketing">Marketing</option>
                    <option value="infrastructure">Infrastructure</option>
                    <option value="equipment">Equipment</option>
                    <option value="office">Office</option>
                    <option value="travel">Travel</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" isLoading={loading}>
                  Add Expense
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Issiah Owes Soya</p>
                <p className="text-3xl font-bold text-orange-600 mt-1">
                  ${totals.issiahOwesToSoya.toFixed(2)}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Soya Owes Issiah</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">
                  ${totals.soyaOwesToIssiah.toFixed(2)}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Total</p>
                <p className="text-3xl font-bold text-amber-600 mt-1">
                  ${totals.totalPending.toFixed(2)}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Total</p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  ${totals.totalCompleted.toFixed(2)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'all'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All ({expenses.length})
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'pending'
              ? 'bg-amber-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Pending ({expenses.filter(e => e.status === 'pending').length})
        </button>
        <button
          onClick={() => setFilter('paid_by_partner')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'paid_by_partner'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Paid ({expenses.filter(e => e.status === 'paid_by_partner').length})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'completed'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Completed ({expenses.filter(e => e.status === 'completed').length})
        </button>
      </div>

      {/* Expenses List */}
      <div className="space-y-4">
        {filteredExpenses.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              No expenses found. Add your first expense to get started!
            </CardContent>
          </Card>
        ) : (
          filteredExpenses.map((expense) => {
            const isCreator = expense.created_by_name === currentUser;
            const partnerName = expense.created_by_name === 'issiah' ? 'Soya' : 'Issiah';
            const yourShare = expense.amount / 2;

            return (
              <Card key={expense.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {expense.description}
                        </h3>
                        {getStatusBadge(expense.status)}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                        <div>
                          <p className="text-gray-500">Total Amount</p>
                          <p className="font-semibold text-gray-900">${expense.amount.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Your Share</p>
                          <p className="font-semibold text-primary-600">${yourShare.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Paid By</p>
                          <p className="font-semibold text-gray-900 capitalize">{expense.created_by_name}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Category</p>
                          <p className="font-semibold text-gray-900 capitalize">{expense.category}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Date</p>
                          <p className="font-semibold text-gray-900">{expense.date}</p>
                        </div>
                        {expense.payment_proof && (
                          <div className="md:col-span-3">
                            <p className="text-gray-500">Payment Details</p>
                            <p className="font-semibold text-blue-600">{expense.payment_proof}</p>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-4">
                        {!isCreator && expense.status === 'pending' && (
                          <div className="flex gap-2">
                            {selectedExpense?.id === expense.id ? (
                              <>
                                <Input
                                  type="text"
                                  placeholder="Payment details (e.g., Sent via Venmo)"
                                  value={paymentProofInput}
                                  onChange={(e) => setPaymentProofInput(e.target.value)}
                                  className="w-64"
                                />
                                <Button
                                  size="sm"
                                  onClick={() => handleMarkAsPaid(expense)}
                                  isLoading={loading}
                                >
                                  Confirm Payment
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setSelectedExpense(null);
                                    setPaymentProofInput('');
                                  }}
                                >
                                  Cancel
                                </Button>
                              </>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() => setSelectedExpense(expense)}
                              >
                                <Send className="w-4 h-4 mr-2" />
                                Mark as Paid
                              </Button>
                            )}
                          </div>
                        )}

                        {isCreator && expense.status === 'paid_by_partner' && (
                          <Button
                            size="sm"
                            onClick={() => handleConfirmReceived(expense)}
                            isLoading={loading}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Confirm Received
                          </Button>
                        )}

                        {isCreator && expense.status === 'pending' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(expense.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
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
    </div>
  );
}
