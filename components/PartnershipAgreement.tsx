"use client";

import { useState, useRef, useEffect } from "react";
import { getCurrentUser } from "@/lib/firebase";
import { getCurrentAgreement, signAgreement, savePartnershipAgreement } from "@/lib/firestore";
import { PARTNERSHIP_AGREEMENT_CONTENT, AGREEMENT_VERSION } from "@/lib/partnershipAgreement";
import type { PartnershipAgreement as AgreementType } from "@/types";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { FileText, CheckCircle, AlertCircle, PenTool } from "lucide-react";

export default function PartnershipAgreement() {
  const [agreement, setAgreement] = useState<AgreementType | null>(null);
  const [loading, setLoading] = useState(true);
  const [signing, setSigning] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [userRole, setUserRole] = useState<'issiah' | 'soya' | null>(null);
  const [userId, setUserId] = useState<string>('');
  const [ipAddress, setIpAddress] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    loadAgreementAndUser();
    fetchIPAddress();
  }, []);

  async function loadAgreementAndUser() {
    setLoading(true);
    try {
      const user = await getCurrentUser();
      if (user) {
        setUserId(user.uid);
        setUserRole((user.user_metadata?.role || 'issiah') as 'issiah' | 'soya');
      }

      const { data } = await getCurrentAgreement();
      if (data) {
        setAgreement(data);
      } else {
        // Create initial agreement
        await createInitialAgreement();
      }
    } catch (error) {
      console.error('Error loading agreement:', error);
    } finally {
      setLoading(false);
    }
  }

  async function createInitialAgreement() {
    const newAgreement = {
      version: AGREEMENT_VERSION,
      content: PARTNERSHIP_AGREEMENT_CONTENT,
      signatures: {
        issiah: { signed: false },
        soya: { signed: false },
      },
      status: 'pending' as const,
    };

    await savePartnershipAgreement(newAgreement);
    await loadAgreementAndUser();
  }

  async function fetchIPAddress() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setIpAddress(data.ip);
    } catch (error) {
      console.error('Error fetching IP:', error);
      setIpAddress('Unknown');
    }
  }

  // Canvas drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSign = async () => {
    if (!userRole || !agreement || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const signatureData = canvas.toDataURL('image/png');

    // Check if signature is empty
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const isEmpty = !imageData.data.some(channel => channel !== 0);

    if (isEmpty) {
      alert('Please provide your signature before signing.');
      return;
    }

    setSigning(true);

    try {
      const result = await signAgreement(agreement.id, userRole, signatureData, ipAddress);

      if (result.success) {
        alert('Agreement signed successfully! 🎉');
        setShowSignature(false);
        await loadAgreementAndUser();
      } else {
        alert(`Failed to sign: ${result.error}`);
      }
    } catch (error) {
      console.error('Error signing agreement:', error);
      alert('Failed to sign agreement');
    } finally {
      setSigning(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-gray-600">Loading agreement...</p>
        </CardContent>
      </Card>
    );
  }

  if (!agreement) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-3 text-amber-600" />
          <p className="text-gray-600">No partnership agreement found.</p>
        </CardContent>
      </Card>
    );
  }

  const hasUserSigned = userRole && agreement.signatures[userRole]?.signed;
  const bothSigned = agreement.signatures.issiah.signed && agreement.signatures.soya.signed;

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <Card className="border-2 border-primary-200">
        <CardHeader className="bg-gradient-to-r from-primary-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary-600" />
              <div>
                <CardTitle>Co-Founder Partnership Agreement</CardTitle>
                <p className="text-sm text-gray-600 mt-1">Version {agreement.version} • 50/50 Equal Partnership</p>
              </div>
            </div>
            {bothSigned && (
              <div className="flex items-center gap-2 text-green-700 font-semibold">
                <CheckCircle className="w-5 h-5" />
                Fully Signed
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Issiah's Signature Status */}
            <div className={`p-4 rounded-lg border-2 ${agreement.signatures.issiah.signed ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-300'}`}>
              <p className="text-sm font-semibold text-gray-700">Issiah McLean</p>
              <p className="text-xs text-gray-600">Business Co-Founder</p>
              <div className="mt-2 flex items-center gap-2">
                {agreement.signatures.issiah.signed ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-700 font-medium">Signed</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Pending</span>
                  </>
                )}
              </div>
              {agreement.signatures.issiah.signed && agreement.signatures.issiah.signed_at && (
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(agreement.signatures.issiah.signed_at).toLocaleDateString()}
                </p>
              )}
            </div>

            {/* Soya's Signature Status */}
            <div className={`p-4 rounded-lg border-2 ${agreement.signatures.soya.signed ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-300'}`}>
              <p className="text-sm font-semibold text-gray-700">Soya Diaoune</p>
              <p className="text-xs text-gray-600">Technical Co-Founder</p>
              <div className="mt-2 flex items-center gap-2">
                {agreement.signatures.soya.signed ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-700 font-medium">Signed</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Pending</span>
                  </>
                )}
              </div>
              {agreement.signatures.soya.signed && agreement.signatures.soya.signed_at && (
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(agreement.signatures.soya.signed_at).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>

          {!hasUserSigned && userRole && (
            <Button
              onClick={() => setShowSignature(true)}
              className="w-full"
            >
              <PenTool className="w-4 h-4 mr-2" />
              Sign Agreement
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Agreement Content */}
      <Card>
        <CardHeader>
          <CardTitle>Agreement Terms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <div className="bg-white p-6 border rounded-lg max-h-[600px] overflow-y-auto">
              <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800">
                {agreement.content}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Signature Modal */}
      {showSignature && !hasUserSigned && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full">
            <CardHeader className="bg-primary-50">
              <CardTitle>Sign Partnership Agreement</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Please sign below to acknowledge your agreement to all terms and conditions.
              </p>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Signature
                  </label>
                  <div className="border-2 border-gray-300 rounded-lg">
                    <canvas
                      ref={canvasRef}
                      width={600}
                      height={200}
                      className="w-full cursor-crosshair bg-white rounded-lg"
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Draw your signature using your mouse or trackpad
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-900 font-medium">Legal Confirmation</p>
                  <p className="text-xs text-blue-800 mt-1">
                    By signing, you confirm that you have read, understood, and agree to be legally bound by all terms
                    of this Partnership Agreement. Your signature will be recorded with timestamp and IP address for legal purposes.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={clearSignature}
                    variant="outline"
                  >
                    Clear
                  </Button>
                  <Button
                    onClick={handleSign}
                    isLoading={signing}
                    className="flex-1"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Sign & Submit
                  </Button>
                  <Button
                    onClick={() => setShowSignature(false)}
                    variant="outline"
                    disabled={signing}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
