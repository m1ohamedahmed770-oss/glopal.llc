import React, { useState, useRef } from 'react';
import { Download, Loader2, Linkedin } from 'lucide-react';

// Declare globals for the libraries loaded via script tags
declare global {
  interface Window {
    html2canvas: any;
    jspdf: any;
  }
}

// --- Main App ---

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [isDownloading, setIsDownloading] = useState(false);
  const contractRef = useRef(null);

  const handleDownloadPDF = async () => {
    if (!contractRef.current) return;
    
    // Check if libraries are loaded
    if (!window.html2canvas || !window.jspdf) {
      alert("PDF libraries are not fully loaded yet. Please try again in a moment.");
      return;
    }

    setIsDownloading(true);
    try {
      // Capture the element using the global html2canvas
      const canvas = await window.html2canvas(contractRef.current, {
        scale: 2, // Higher scale for crisp text
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      
      // Initialize jsPDF using global window.jspdf
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Calculate dimensions to fit A4 width
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      const fileName = `Global_U_Agreement_${formData.name.replace(/\s+/g, '_') || 'Draft'}.pdf`;
      pdf.save(fileName);
    } catch (err) {
      console.error("PDF Download failed:", err);
      alert("Could not generate PDF.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen py-8 px-4 flex flex-col items-center gap-6">
      
      {/* Action Bar (Hidden when printing) */}
      <div className="no-print w-full max-w-[210mm] flex flex-wrap gap-4 justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="text-sm text-gray-500 font-medium">
          Digital Contract System
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#f28e1c] hover:bg-[#d97b10] rounded-md transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            <span className="hidden sm:inline">Download PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>

          <button 
            onClick={() => window.open('https://www.linkedin.com/in/global-llc', '_blank')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#0077b5] hover:bg-[#005582] rounded-md transition-colors shadow-sm"
            title="Contact Team on LinkedIn"
          >
            <Linkedin size={16} />
            <span className="hidden sm:inline">Contact Team</span>
          </button>
        </div>
      </div>

      {/* The Contract Paper */}
      <div ref={contractRef} className="print-container bg-white w-full max-w-[210mm] min-h-[297mm] p-12 shadow-2xl relative text-[#0f284e]">
        
        {/* Watermark Effect */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center overflow-hidden">
             <div className="transform -rotate-45 text-9xl font-bold">GLOBAL U</div>
        </div>

        {/* Header Section */}
        <header className="text-center mb-10 border-b-2 border-[#f28e1c] pb-6">
          <h2 className="text-2xl font-bold uppercase tracking-wider mb-2">Digital Volunteer Work Agreement</h2>
          <div className="text-sm font-semibold space-y-1 text-gray-600">
            <p>Global LLC – Non-Profit Digital Entity</p>
            <p>Owner & Digital Publisher: MohamedElectronics.io</p>
            <p>Contract Duration: 30 Days (Renewable)</p>
            <p className="text-[#f28e1c] font-bold">Contract Type: Unpaid Volunteer Digital Service</p>
          </div>
        </header>

        {/* Contract Body */}
        <main className="text-sm leading-relaxed space-y-6 text-justify">
          
          <section>
            <h3 className="font-bold text-lg mb-2 text-[#0f284e]">1. Introduction</h3>
            <p className="mb-2">This Digital Volunteer Work Agreement ("Agreement") is established between:</p>
            
            <div className="pl-4 mb-3 border-l-2 border-[#f28e1c]">
              <strong className="block text-[#0f284e]">1.1 The Company (First Party)</strong>
              Global LLC<br/>
              A non-profit, individually-owned digital entity specializing in digital, technical, and informational services.<br/>
              Legal Owner & Digital Controller: <span className="font-semibold">MohamedElectronics.io</span>
            </div>

            <div className="pl-4 border-l-2 border-gray-300 bg-gray-50 p-3 rounded">
              <strong className="block text-[#0f284e] mb-2">1.2 The Volunteer (Second Party)</strong>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-24 font-medium">Name:</span>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Full Name"
                    className="flex-1 bg-transparent border-b border-gray-400 focus:border-[#f28e1c] outline-none px-1 text-[#0f284e] font-semibold placeholder-gray-300"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-24 font-medium">Email:</span>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email Address"
                    className="flex-1 bg-transparent border-b border-gray-400 focus:border-[#f28e1c] outline-none px-1 text-[#0f284e] font-semibold placeholder-gray-300"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-24 font-medium">Digital Sig:</span>
                  <div className="flex-1 border-b border-gray-400 px-1 text-gray-400 italic font-mono text-xs">
                    {formData.name ? `Digitally Signed by ${formData.name}` : '(Pending Signature)'}
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-2 text-xs italic text-gray-500">The Volunteer agrees to perform digital tasks or contributions for Global LLC on a voluntary, unpaid basis.</p>
          </section>

          <div className="grid grid-cols-2 gap-8">
            <section>
              <h3 className="font-bold mb-1">2. Nature of the Agreement</h3>
              <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700">
                <li>This is not an employment contract.</li>
                <li>No salary, wage, or financial compensation is provided.</li>
                <li>The work is performed strictly on a voluntary basis.</li>
                <li>No employment rights such as paid leave, insurance, pensions, etc., apply.</li>
                <li>The volunteer may resign at any time with prior notice.</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold mb-1">3. Contract Duration</h3>
              <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700">
                <li>The Agreement lasts 30 days starting from the date of signature.</li>
                <li>Renewal is optional and based on mutual consent.</li>
                <li>Renewal is issued as a digital extension under the same conditions unless otherwise stated.</li>
              </ul>
            </section>
          </div>

          <section>
            <h3 className="font-bold mb-1">4. Scope of Work</h3>
            <p className="text-xs mb-1">The volunteer may perform one or more of the following digital tasks:</p>
            <div className="text-xs text-gray-700 grid grid-cols-2 gap-2">
              <div>• Content writing</div>
              <div>• Technical assistance</div>
              <div>• Software testing</div>
              <div>• API usage or improvement</div>
              <div>• Community or project support</div>
              <div>• Documentation or translation</div>
            </div>
            <p className="text-xs mt-1 italic">Any other digital, non-financial contribution as requested by Global LLC.</p>
          </section>

          <div className="grid grid-cols-2 gap-6">
            <section>
              <h3 className="font-bold mb-1">5. Rights of the Volunteer</h3>
              <ul className="list-disc pl-4 space-y-0.5 text-xs text-gray-700">
                <li>Receive clear instructions.</li>
                <li>Withdraw/end cooperation at any time.</li>
                <li>Credit for digital contributions.</li>
                <li>Safe, non-exploitative digital conditions.</li>
                <li>Data protection under Privacy Policy.</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold mb-1">6. Responsibilities</h3>
              <ul className="list-disc pl-4 space-y-0.5 text-xs text-gray-700">
                <li>Complete assigned tasks.</li>
                <li>Respect digital guidelines.</li>
                <li>Maintain confidentiality.</li>
                <li>Avoid misusing company data/APIs.</li>
                <li>Refrain from malicious activity.</li>
              </ul>
            </section>
          </div>

          <section>
            <h3 className="font-bold mb-1">7. Rights of Global LLC</h3>
            <p className="text-xs text-gray-700">The Company reserves the right to accept, reject, or modify tasks, terminate the Agreement, maintain digital security, and protect proprietary systems.</p>
          </section>

          <section>
            <h3 className="font-bold mb-1">8. Company Legal Policies</h3>
            <p className="text-xs text-gray-700">
              Global LLC operates under: Digital Ownership Policy, Privacy Policy (GDPR-compliant), Terms of Use, Non-Profit Declaration, and API Rules.
            </p>
          </section>

          <section className="bg-gray-50 p-3 rounded border border-gray-200">
            <h3 className="font-bold mb-1">14. Final Declaration</h3>
            <p className="text-xs text-gray-700 mb-2">
              By signing this Agreement digitally, both parties confirm: Understanding and acceptance of all conditions; Participation based on voluntary, unpaid digital work; Compliance with all internal policies; That Global LLC remains a non-profit, single-owner digital entity.
            </p>
          </section>

          {/* Signatures */}
          <section className="mt-8 pt-6 border-t-2 border-[#0f284e]">
            <h3 className="font-bold text-lg mb-4 uppercase text-[#f28e1c]">13. Digital Signatures</h3>
            <p className="text-xs text-gray-500 mb-6">This Agreement is valid without a handwritten signature. Digital acceptance is recognized as equivalent to physical signing.</p>
            
            <div className="grid grid-cols-2 gap-12">
              {/* Owner Signature */}
              <div className="space-y-3">
                <div className="font-bold text-sm">Owner & Publisher – Global LLC</div>
                <div className="text-xs">Name: <span className="font-semibold">MohamedElectronics.io</span></div>
                <div className="relative h-12 border-b border-gray-400 flex items-end pb-1">
                   <span className="font-dancing text-2xl text-[#0f284e] font-bold opacity-80" style={{ fontFamily: 'cursive' }}>Global_LLC_Official</span>
                </div>
                <div className="text-xs text-gray-500">Date: {new Date().toLocaleDateString()}</div>
              </div>

              {/* Volunteer Signature */}
              <div className="space-y-3">
                <div className="font-bold text-sm">Volunteer (Second Party)</div>
                <div className="text-xs">Name: <span className="font-semibold">{formData.name || '________________'}</span></div>
                <div className="relative h-12 border-b border-gray-400 flex items-end pb-1 bg-yellow-50/50">
                  {formData.name ? (
                     <span className="font-dancing text-xl text-blue-900 font-bold" style={{ fontFamily: 'cursive' }}>{formData.name.replace(/\s/g, '_')}_Accepted</span>
                  ) : (
                    <span className="text-gray-300 text-xs italic">Digital Signature will appear here</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs">
                   <span>Date:</span>
                   <input 
                    type="date" 
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="bg-transparent border-none outline-none text-gray-700 font-mono"
                   />
                </div>
              </div>
            </div>
          </section>
          
          <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-xs text-gray-400">
            © 2025 Global LLC. All rights reserved.
          </footer>
        </main>
      </div>
    </div>
  );
}