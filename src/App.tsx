import React, { useState, useEffect } from 'react';
import { Download, CheckCircle2, User, Building, Briefcase, Sparkles } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'ats_cover_letter_draft';

const DEFAULT_COVER_LETTER = {
  // Personal Info
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '(555) 123-4567',
  location: 'New York, NY',
  linkedin: 'linkedin.com/in/johndoe',

  // Meta
  date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),

  // Employer Info
  hiringManager: 'Hiring Manager',
  companyName: 'Tech Innovations Inc.',
  companyAddress: '123 Innovation Drive\nSan Francisco, CA 94105',

  // Content
  opening: 'Dear Hiring Manager,',
  bodyParagraph1: 'I am writing to express my strong interest in the open position at Tech Innovations Inc. With over 5 years of professional experience in full-stack development and a proven track record of delivering scalable applications, I am confident in my ability to make a significant and immediate impact on your team.',
  bodyParagraph2: 'In my previous role, I successfully led the migration of a legacy monolithic application to a modern architecture, which improved overall system performance by 40% and reduced deployment times. My deep expertise aligns perfectly with the requirements outlined in your job description. Furthermore, I have consistently championed quality and automated testing, leading to a 30% reduction in production bugs.',
  bodyParagraph3: 'I am particularly drawn to Tech Innovations Inc.\'s commitment to leveraging cutting-edge technology to solve real-world problems. I thrive in collaborative, fast-paced environments and am eager to bring my acumen, skills, and passion for excellence to your organization.',
  closing: 'I would welcome the opportunity to further discuss how my background and skills will be of value to your team. Thank you for your time and consideration.',
  signOff: 'Sincerely,'
};

const InputField = ({ label, className = '', ...props }: any) => (
  <div className={className}>
    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">{label}</label>
    <input
      className="w-full px-4 py-3 bg-white/50 border border-slate-200/60 rounded-xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-300 text-slate-800 shadow-sm placeholder:text-slate-400 group-hover:border-slate-300"
      {...props}
    />
  </div>
);

const TextAreaField = ({ label, className = '', ...props }: any) => (
  <div className={className}>
    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">{label}</label>
    <textarea
      className="w-full px-4 py-3 bg-white/50 border border-slate-200/60 rounded-xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-300 text-slate-800 shadow-sm resize-y min-h-[120px] placeholder:text-slate-400 leading-relaxed group-hover:border-slate-300"
      {...props}
    />
  </div>
);

export default function App() {
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_COVER_LETTER;
    } catch {
      return DEFAULT_COVER_LETTER;
    }
  });

  const [saveStatus, setSaveStatus] = useState<'Saved' | 'Saving...'>('Saved');

  useEffect(() => {
    setSaveStatus('Saving...');
    const timer = setTimeout(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
      setSaveStatus('Saved');
    }, 800);

    return () => clearTimeout(timer);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handlePrint = () => {
    // Add a slight delay to ensure UI updates before print dialog opens
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 print:bg-white">
      {/* Print Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @media print {
          @page { size: A4; margin: 0; }
          body { 
            background: white; 
            margin: 0; 
            padding: 0; 
            -webkit-print-color-adjust: exact; 
            print-color-adjust: exact;
          }
          /* Enforce exact A4 single page sizing constraints on the root elements */
          html, body {
            width: 210mm;
            height: 297mm;
            overflow: hidden;
            box-sizing: border-box;
          }
        }
      `}} />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm print:hidden">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-blue-500/20 ring-1 ring-white/20 inset-ring">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight">Pro Cover Letter</h1>
            <div className="flex items-center text-xs font-semibold text-slate-500 mt-1">
              {saveStatus === 'Saving...' ? (
                <span className="flex items-center gap-1.5 text-amber-500">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                  Saving dynamically...
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Draft saved locally
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={handlePrint}
          className="group relative inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-xl shadow-slate-900/10 hover:shadow-slate-900/20 hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto overflow-hidden ring-1 ring-slate-800"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <Download className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
          <span>Export PDF</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden print:block print:overflow-visible print:m-0 print:p-0">

        {/* Left Pane: Editor */}
        <div className="w-full lg:w-[45%] lg:min-w-[500px] border-r border-slate-200/60 overflow-y-auto p-5 sm:p-10 bg-white scroll-smooth print:hidden">
          <div className="max-w-2xl mx-auto space-y-10 pb-12">
            {/* Intro */}
            <div className="mb-2">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Craft your narrative.</h2>
              <p className="text-slate-500 leading-relaxed text-sm sm:text-base font-medium">Fill in the details below. Our builder ensures your letter is perfectly structured for both humans and Applicant Tracking Systems (ATS).</p>
            </div>

            {/* Section: Personal Info */}
            <section className="bg-slate-50/50 p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow duration-300 group">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2.5 mb-6">
                <div className="p-2 bg-blue-100/50 rounded-lg text-blue-600"><User className="w-4 h-4" /></div>
                Personal Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
                <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
                <InputField label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} className="sm:col-span-2" />
                <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
                <InputField label="Location (City, State)" name="location" value={formData.location} onChange={handleChange} />
                <InputField label="LinkedIn or Portfolio" name="linkedin" value={formData.linkedin} onChange={handleChange} className="sm:col-span-2" />
              </div>
            </section>

            {/* Section: Employer Info */}
            <section className="bg-slate-50/50 p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow duration-300 group">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2.5 mb-6">
                <div className="p-2 bg-indigo-100/50 rounded-lg text-indigo-600"><Building className="w-4 h-4" /></div>
                Employer Details
              </h3>
              <div className="space-y-5">
                <InputField label="Date" name="date" value={formData.date} onChange={handleChange} />
                <InputField label="Hiring Manager's Name" name="hiringManager" value={formData.hiringManager} onChange={handleChange} placeholder="e.g., Jane Smith or Hiring Team" />
                <InputField label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} />
                <TextAreaField label="Company Address" name="companyAddress" value={formData.companyAddress} onChange={handleChange} rows={2} />
              </div>
            </section>

            {/* Section: Letter Content */}
            <section className="bg-slate-50/50 p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow duration-300 group">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2.5 mb-6">
                <div className="p-2 bg-violet-100/50 rounded-lg text-violet-600"><Briefcase className="w-4 h-4" /></div>
                The Pitch
              </h3>
              <div className="space-y-6">
                <InputField label="Salutation" name="opening" value={formData.opening} onChange={handleChange} />
                <TextAreaField label="Introduction (The Hook)" name="bodyParagraph1" value={formData.bodyParagraph1} onChange={handleChange} rows={4} />
                <TextAreaField label="Body (Skills & Achievements)" name="bodyParagraph2" value={formData.bodyParagraph2} onChange={handleChange} rows={6} />
                <TextAreaField label="Why Them? (Culture & Fit)" name="bodyParagraph3" value={formData.bodyParagraph3} onChange={handleChange} rows={4} />
                <TextAreaField label="Call to Action" name="closing" value={formData.closing} onChange={handleChange} rows={3} />
                <div className="pt-2">
                  <InputField label="Sign-off" name="signOff" value={formData.signOff} onChange={handleChange} />
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Right Pane: Preview */}
        <div className="w-full lg:w-[55%] bg-slate-100 lg:overflow-y-auto flex justify-center py-8 sm:py-16 px-4 sm:px-12 relative scroll-smooth bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] print:block print:w-[210mm] print:h-[297mm] print:bg-none print:py-0 print:px-0 print:overflow-hidden print:m-0">

          {/* Actual Printable Page Area */}
          <div
            id="print-area"
            className="bg-white shadow-2xl shadow-slate-300/60 w-full max-w-[850px] aspect-[1/1.414] p-10 sm:p-14 md:p-16 text-black relative group transition-all duration-500 ring-1 ring-slate-200 print:ring-0 print:shadow-none print:border-none print:w-[210mm] print:h-[297mm] print:max-w-none print:aspect-auto print:p-[20mm] print:m-0"
            style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}
          >
            {/* Subtle decorative top border for visual flair in preview, hidden in print */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-sm border-t-0 p-0 m-0 print:hidden"></div>

            {/* Header / Contact Info */}
            <header className="mb-10 text-center sm:text-left border-b-[1.5px] border-slate-900 pb-8">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 uppercase print:text-5xl" style={{ letterSpacing: '-0.02em' }}>
                {formData.firstName} {formData.lastName}
              </h1>
              <div className="text-[10pt] sm:text-[10.5pt] flex flex-wrap justify-center sm:justify-start gap-x-5 gap-y-2 text-slate-800 font-medium print:text-[11pt]">
                {formData.email && <span className="hover:text-blue-700 transition-colors print:text-black">{formData.email}</span>}
                {formData.phone && <span>{formData.phone}</span>}
                {formData.location && <span>{formData.location}</span>}
                {formData.linkedin && <span className="text-slate-600 print:text-black">{formData.linkedin}</span>}
              </div>
            </header>

            {/* Date */}
            <div className="mb-8 text-[11pt] font-semibold text-slate-800 print:text-[12pt]">
              {formData.date}
            </div>

            {/* Employer Contact Info */}
            <div className="mb-10 text-[11pt] leading-[1.6] text-slate-800 print:text-[12pt]">
              {formData.hiringManager && <div className="font-semibold">{formData.hiringManager}</div>}
              <div className="font-bold text-slate-900">{formData.companyName}</div>
              <div className="whitespace-pre-line text-slate-800 mt-1">{formData.companyAddress}</div>
            </div>

            {/* Letter Content */}
            <div className="text-[11pt] leading-[1.8] space-y-6 text-slate-800 print:text-[12pt] print:leading-[1.7]">
              <p className="font-bold text-slate-900 text-[11.5pt] print:text-[12.5pt]">{formData.opening}</p>

              {formData.bodyParagraph1 && <p className="text-justify">{formData.bodyParagraph1}</p>}
              {formData.bodyParagraph2 && <p className="text-justify">{formData.bodyParagraph2}</p>}
              {formData.bodyParagraph3 && <p className="text-justify">{formData.bodyParagraph3}</p>}

              {formData.closing && <p className="text-justify">{formData.closing}</p>}

              <div className="pt-8 print:pt-6">
                <p className="mb-8 font-medium">{formData.signOff}</p>
                <p className="font-extrabold text-slate-900 text-lg tracking-tight uppercase print:text-xl">
                  {formData.firstName} {formData.lastName}
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}