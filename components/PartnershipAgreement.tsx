"use client";

import { useState, useRef, useEffect } from "react";
import { getCurrentUser } from "@/lib/firebase";
import { getCurrentAgreement, signAgreement, savePartnershipAgreement } from "@/lib/firestore";
import { PARTNERSHIP_AGREEMENT_CONTENT, AGREEMENT_VERSION } from "@/lib/partnershipAgreement";
import type { PartnershipAgreement as AgreementType } from "@/types";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { FileText, CheckCircle, AlertCircle, PenTool, Type } from "lucide-react";

export default function PartnershipAgreement() {
  const [agreement, setAgreement] = useState<AgreementType | null>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [signing, setSigning] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [userRole, setUserRole] = useState<'issiah' | 'soya' | null>(null);
  const [userId, setUserId] = useState<string>('');
  const [ipAddress, setIpAddress] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureType, setSignatureType] = useState<'draw' | 'type'>('type');
  const [typedName, setTypedName] = useState<string>('');

  useEffect(() => {
    loadAgreementAndUser();
    fetchIPAddress();
  }, []);

  // Render typed signature to canvas whenever typedName changes
  useEffect(() => {
    if (signatureType === 'type' && typedName && canvasRef.current) {
      renderTypedSignature();
    }
  }, [typedName, signatureType]);

  async function loadAgreementAndUser() {
    setLoading(true);
    try {
      const user = await getCurrentUser();
      if (user) {
        setUserId(user.uid);
        setUserRole((user.user_metadata?.role || 'issiah') as 'issiah' | 'soya');
      }

      const { data, error } = await getCurrentAgreement();
      if (error) {
        console.error('Error loading agreement:', error);
      }

      if (data) {
        setAgreement(data);
      } else {
        // Create initial agreement
        await createInitialAgreement();
      }
    } catch (error) {
      console.error('Error loading agreement:', error);
      alert('Error loading agreement. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  }

  async function createInitialAgreement() {
    setCreating(true);
    try {
      const newAgreement = {
        version: AGREEMENT_VERSION,
        content: PARTNERSHIP_AGREEMENT_CONTENT,
        signatures: {
          issiah: { signed: false },
          soya: { signed: false },
        },
        status: 'pending' as const,
      };

      const result = await savePartnershipAgreement(newAgreement);
      if (result.success) {
        alert('✅ Partnership Agreement created successfully! Please review and sign below.');
        await loadAgreementAndUser();
      } else {
        alert(`❌ Failed to create agreement: ${result.error}`);
      }
    } catch (error) {
      console.error('Error creating agreement:', error);
      alert('❌ Error creating agreement. Please try again.');
    } finally {
      setCreating(false);
    }
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

  // Render typed name in cursive font on canvas
  const renderTypedSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas || !typedName) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set cursive font style
    ctx.font = '48px "Brush Script MT", "Lucida Handwriting", cursive';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw text in center
    ctx.fillText(typedName, canvas.width / 2, canvas.height / 2);
  };

  // Canvas drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (signatureType !== 'draw') return;

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
    if (!isDrawing || signatureType !== 'draw') return;

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
    setTypedName('');
  };

  const handleSignatureTypeChange = (type: 'draw' | 'type') => {
    setSignatureType(type);
    clearSignature();
  };

  const handleSign = async () => {
    if (!userRole || !agreement || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check if signature exists
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const isEmpty = !imageData.data.some(channel => channel !== 0);

    if (isEmpty) {
      alert('Please provide your signature before signing.');
      return;
    }

    // Check if other co-founder has signed already
    const otherRole = userRole === 'issiah' ? 'soya' : 'issiah';
    const otherSigned = agreement.signatures[otherRole]?.signed;

    setSigning(true);

    try {
      const signatureData = canvas.toDataURL('image/png');
      const result = await signAgreement(agreement.id, userRole, signatureData, ipAddress);

      if (result.success) {
        if (otherSigned) {
          alert('Agreement fully signed! 🎉 Both co-founders have now signed the partnership agreement.');
        } else {
          alert('Your signature has been recorded! ✅ Waiting for your co-founder to sign.');
        }
        setShowSignature(false);
        setTypedName('');
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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-3"></div>
          <p className="text-gray-600">Loading partnership agreement...</p>
        </CardContent>
      </Card>
    );
  }

  if (!agreement) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-3 text-amber-600" />
          <p className="text-gray-600 mb-4">No partnership agreement found.</p>
          <p className="text-sm text-gray-500 mb-6">
            Create a comprehensive 50/50 co-founder partnership agreement with unanimous decision requirements,
            fair input/output tracking, and clean exit provisions.
          </p>
          <Button
            onClick={() => createInitialAgreement()}
            isLoading={creating}
            disabled={creating}
          >
            {creating ? 'Creating Agreement...' : 'Create Partnership Agreement'}
          </Button>
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
            {bothSigned ? (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 font-semibold rounded-lg">
                <CheckCircle className="w-5 h-5" />
                ✅ Fully Signed & Complete
              </div>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 font-semibold rounded-lg">
                <AlertCircle className="w-5 h-5" />
                ⏳ Awaiting Signatures
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
                    <span className="text-sm text-green-700 font-medium">✅ Signed</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">⏳ Pending</span>
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
                    <span className="text-sm text-green-700 font-medium">✅ Signed</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">⏳ Pending</span>
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

          {!bothSigned && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-900 font-medium">⚠️ Agreement Not Complete</p>
              <p className="text-xs text-blue-800 mt-1">
                This partnership agreement requires signatures from BOTH co-founders to be legally binding and complete.
                {!hasUserSigned && userRole && " Please sign below to record your agreement."}
                {hasUserSigned && " Waiting for your co-founder to sign."}
              </p>
            </div>
          )}

          {!hasUserSigned && userRole && (
            <Button
              onClick={() => setShowSignature(true)}
              className="w-full"
            >
              <PenTool className="w-4 h-4 mr-2" />
              Sign Agreement Now
            </Button>
          )}

          {hasUserSigned && !bothSigned && (
            <div className="text-center py-4 text-green-700 font-medium">
              ✅ You have signed! Waiting for your co-founder to complete the agreement.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Agreement Content */}
      <Card>
        <CardHeader>
          <CardTitle>Partnership Agreement - Full Legal Document</CardTitle>
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
                Choose your signature method and sign below to legally bind yourself to this agreement.
              </p>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {/* Signature Type Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Signature Method
                  </label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleSignatureTypeChange('type')}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                        signatureType === 'type'
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <Type className="w-5 h-5 mx-auto mb-1" />
                      <span className="text-sm font-medium">Type Name (Cursive)</span>
                    </button>
                    <button
                      onClick={() => handleSignatureTypeChange('draw')}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                        signatureType === 'draw'
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <PenTool className="w-5 h-5 mx-auto mb-1" />
                      <span className="text-sm font-medium">Draw Signature</span>
                    </button>
                  </div>
                </div>

                {/* Typed Signature Input */}
                {signatureType === 'type' && (
                  <div>
                    <Input
                      label="Type Your Full Name"
                      value={typedName}
                      onChange={(e) => setTypedName(e.target.value)}
                      placeholder="e.g., Issiah McLean"
                      className="text-lg"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Your name will appear in elegant cursive font below
                    </p>
                  </div>
                )}

                {/* Signature Canvas */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {signatureType === 'type' ? 'Preview (Cursive)' : 'Draw Your Signature'}
                  </label>
                  <div className="border-2 border-gray-300 rounded-lg bg-white">
                    <canvas
                      ref={canvasRef}
                      width={600}
                      height={200}
                      className={`w-full rounded-lg ${signatureType === 'draw' ? 'cursor-crosshair' : 'cursor-default'}`}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {signatureType === 'draw'
                      ? 'Draw your signature using your mouse or trackpad'
                      : 'Your typed name appears automatically in cursive handwriting'}
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-900 font-medium">⚖️ Legal Confirmation</p>
                  <p className="text-xs text-blue-800 mt-1">
                    By signing, you confirm that you have read, understood, and agree to be legally bound by all terms
                    of this 50/50 Partnership Agreement. Your signature will be recorded with timestamp and IP address for legal validity.
                    <strong className="block mt-2">Note: This agreement is NOT complete until BOTH co-founders have signed.</strong>
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
                    disabled={signatureType === 'type' && !typedName.trim()}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Sign & Submit
                  </Button>
                  <Button
                    onClick={() => {
                      setShowSignature(false);
                      setTypedName('');
                      clearSignature();
                    }}
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
