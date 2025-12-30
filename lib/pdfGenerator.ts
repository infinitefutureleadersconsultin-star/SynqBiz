/**
 * PDF Generator for Partnership Agreement
 * Generates a downloadable, legally-valid PDF with e-signatures
 */

import jsPDF from 'jspdf';
import type { PartnershipAgreement } from '@/types';

/**
 * Generate PDF from partnership agreement
 * Includes full agreement text and digital signatures
 */
export function generateAgreementPDF(agreement: PartnershipAgreement): void {
  // Create PDF document (Letter size: 8.5 x 11 inches)
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'in',
    format: 'letter',
  });

  // Page dimensions
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 0.75; // 0.75 inch margins
  const contentWidth = pageWidth - (margin * 2);
  const lineHeight = 0.2; // Line spacing

  let yPosition = margin;

  // Helper function to add new page if needed
  function checkPageBreak(neededSpace: number = 0.3) {
    if (yPosition + neededSpace > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  }

  // Helper function to add text with word wrap
  function addText(text: string, fontSize: number = 10, fontStyle: 'normal' | 'bold' = 'normal', align: 'left' | 'center' | 'right' = 'left') {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', fontStyle);

    const lines = pdf.splitTextToSize(text, contentWidth);

    for (const line of lines) {
      checkPageBreak();

      if (align === 'center') {
        pdf.text(line, pageWidth / 2, yPosition, { align: 'center' });
      } else if (align === 'right') {
        pdf.text(line, pageWidth - margin, yPosition, { align: 'right' });
      } else {
        pdf.text(line, margin, yPosition);
      }

      yPosition += lineHeight;
    }
  }

  // ========================================
  // HEADER
  // ========================================
  pdf.setFillColor(59, 130, 246); // Primary blue
  pdf.rect(0, 0, pageWidth, 0.5, 'F');

  pdf.setTextColor(255, 255, 255);
  addText('CO-FOUNDER PARTNERSHIP AGREEMENT', 16, 'bold', 'center');
  addText('SynqBiz / SponsorSynq', 12, 'normal', 'center');

  pdf.setTextColor(0, 0, 0);
  yPosition += 0.3;

  // ========================================
  // AGREEMENT DETAILS
  // ========================================
  addText(`Agreement Version: ${agreement.version}`, 9, 'normal', 'right');
  addText(`Document ID: ${agreement.id}`, 9, 'normal', 'right');
  addText(`Created: ${new Date(agreement.created_at).toLocaleDateString()}`, 9, 'normal', 'right');
  yPosition += 0.2;

  pdf.setLineWidth(0.01);
  pdf.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 0.3;

  // ========================================
  // AGREEMENT CONTENT
  // ========================================

  // Split content by sections (marked with ##)
  const sections = agreement.content.split(/(?=##)/g);

  for (const section of sections) {
    const lines = section.split('\n');

    for (const line of lines) {
      if (!line.trim()) {
        yPosition += 0.1;
        continue;
      }

      // Main headers (##)
      if (line.startsWith('##') && !line.startsWith('###')) {
        checkPageBreak(0.5);
        yPosition += 0.2;
        const headerText = line.replace(/^##\s*/, '').replace(/\*/g, '');
        addText(headerText, 14, 'bold');
        yPosition += 0.1;
      }
      // Sub headers (###)
      else if (line.startsWith('###')) {
        checkPageBreak(0.4);
        yPosition += 0.15;
        const subHeaderText = line.replace(/^###\s*/, '').replace(/\*/g, '');
        addText(subHeaderText, 11, 'bold');
      }
      // Bold text
      else if (line.includes('**')) {
        const cleanText = line.replace(/\*\*/g, '');
        if (line.trim().startsWith('-') || line.trim().startsWith('✓')) {
          addText(cleanText, 10, 'normal');
        } else {
          addText(cleanText, 10, 'bold');
        }
      }
      // Regular text
      else {
        const cleanText = line.replace(/\*/g, '');
        addText(cleanText, 10, 'normal');
      }
    }
  }

  // ========================================
  // SIGNATURE SECTION
  // ========================================
  checkPageBreak(4);
  yPosition += 0.5;

  pdf.setFillColor(240, 240, 240);
  pdf.rect(margin, yPosition, contentWidth, 0.4, 'F');
  yPosition += 0.25;
  addText('DIGITAL SIGNATURES', 14, 'bold', 'center');
  yPosition += 0.3;

  addText('This agreement has been executed electronically with full legal effect.', 9, 'normal', 'center');
  yPosition += 0.1;
  addText('Signatures are recorded with timestamp and IP address for legal validity.', 9, 'normal', 'center');
  yPosition += 0.4;

  // ISSIAH'S SIGNATURE
  pdf.setDrawColor(200, 200, 200);
  pdf.setLineWidth(0.01);
  pdf.rect(margin, yPosition, contentWidth / 2 - 0.2, 2);

  yPosition += 0.2;
  addText('ISSIAH MCLEAN', 11, 'bold');
  addText('Business Co-Founder', 9, 'normal');
  addText('50% Equity Owner', 9, 'normal');
  yPosition += 0.2;

  if (agreement.signatures.issiah.signed && agreement.signatures.issiah.signature_data) {
    try {
      // Add signature image
      pdf.addImage(
        agreement.signatures.issiah.signature_data,
        'PNG',
        margin + 0.1,
        yPosition,
        2,
        0.6
      );
    } catch (error) {
      console.error('Error adding Issiah signature:', error);
      addText('[ Signature on file ]', 9, 'normal');
    }
    yPosition += 0.7;
    addText(`Signed: ${new Date(agreement.signatures.issiah.signed_at!).toLocaleString()}`, 8, 'normal');
    addText(`IP: ${agreement.signatures.issiah.ip_address || 'N/A'}`, 8, 'normal');
  } else {
    yPosition += 0.5;
    addText('_________________________________', 10, 'normal');
    yPosition += 0.1;
    addText('[ NOT YET SIGNED ]', 9, 'bold');
  }

  // SOYA'S SIGNATURE (right side)
  yPosition = yPosition - 2.7; // Reset to top of signature box
  const rightColumnX = pageWidth / 2 + 0.1;

  pdf.rect(rightColumnX, yPosition, contentWidth / 2 - 0.2, 2);

  yPosition += 0.2;
  pdf.text('SOYA DIAOUNE', rightColumnX + 0.1, yPosition);
  yPosition += lineHeight;
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.text('Technical Co-Founder', rightColumnX + 0.1, yPosition);
  yPosition += lineHeight;
  pdf.text('50% Equity Owner', rightColumnX + 0.1, yPosition);
  yPosition += 0.2;

  if (agreement.signatures.soya.signed && agreement.signatures.soya.signature_data) {
    try {
      // Add signature image
      pdf.addImage(
        agreement.signatures.soya.signature_data,
        'PNG',
        rightColumnX + 0.1,
        yPosition,
        2,
        0.6
      );
    } catch (error) {
      console.error('Error adding Soya signature:', error);
      pdf.text('[ Signature on file ]', rightColumnX + 0.1, yPosition);
    }
    yPosition += 0.7;
    pdf.text(`Signed: ${new Date(agreement.signatures.soya.signed_at!).toLocaleString()}`, rightColumnX + 0.1, yPosition);
    yPosition += lineHeight;
    pdf.text(`IP: ${agreement.signatures.soya.ip_address || 'N/A'}`, rightColumnX + 0.1, yPosition);
  } else {
    pdf.text('_________________________________', rightColumnX + 0.1, yPosition);
    yPosition += 0.2;
    pdf.setFont('helvetica', 'bold');
    pdf.text('[ NOT YET SIGNED ]', rightColumnX + 0.1, yPosition);
  }

  yPosition = Math.max(yPosition + 2, yPosition + 0.5);

  // ========================================
  // FOOTER
  // ========================================
  checkPageBreak(0.8);
  yPosition += 0.5;

  pdf.setDrawColor(200, 200, 200);
  pdf.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 0.2;

  pdf.setFontSize(8);
  pdf.setTextColor(100, 100, 100);
  addText('© 2025 SynqBiz Partnership Agreement. All Rights Reserved.', 8, 'normal', 'center');
  addText('This is a legally binding document. Seek independent legal counsel before signing.', 8, 'normal', 'center');
  addText(`Generated: ${new Date().toLocaleString()}`, 8, 'normal', 'center');

  // ========================================
  // SAVE PDF
  // ========================================
  const fileName = `SynqBiz-Partnership-Agreement-${agreement.version}-${Date.now()}.pdf`;
  pdf.save(fileName);
}
