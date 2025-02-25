import React from 'react';
import Navbar from '../../Common/Navbar';
import Footer from '../../Common/Footer';

const AdmissionFAQ = () => {
  const faqData = [
    // Existing questions
    {
      question: "What are the general admission requirements for the college?",
      answer: "Our general requirements include a minimum 3.0 GPA (on 4.0 scale), SAT score of 1200+/ACT 25+ (optional), two recommendation letters, and demonstrated extracurricular involvement. Specific programs may have additional prerequisites in STEM subjects."
    },
    {
      question: "What is the application deadline for admissions?",
      answer: "Regular Decision: January 15 | Early Action: November 1 | Transfer Students: March 1 | We offer rolling admissions for select programs until April 30, subject to availability."
    },
    {
      question: "How do I apply for financial aid and scholarships?",
      answer: "Complete the FAFSA (school code 002345) and CSS Profile by February 1. We offer merit scholarships (automatically considered with application), need-based grants, and departmental awards. Explore our Scholarship Portal for additional opportunities."
    },
    {
      question: "What documents are required for the application?",
      answer: "Required materials include: Official transcripts, 2 teacher recommendations, Common App essay, SAT/ACT scores (optional), activities resume, and program-specific supplements (portfolios, writing samples)."
    },
    {
      question: "Does the college require standardized test scores (SAT, ACT)?",
      answer: "We are test-optional for most programs. However, engineering and honors programs strongly recommend submitting scores (middle 50%: SAT 1350-1480, ACT 30-33). International students must provide English proficiency scores."
    },
    {
      question: "Can I apply to the college if I have a low GPA?",
      answer: "We consider applications holistically. For GPAs below 2.8, we recommend submitting additional context through your essay, strong recommendation letters, and highlighting upward grade trends. Conditional admission may be offered through our Pathway Program."
    },
    {
      question: "What are the chances of being accepted as an out-of-state student?",
      answer: "We maintain a 60:40 in-state to out-of-state ratio. Out-of-state applicants have comparable acceptance rates when demonstrating strong academic preparation. All applicants are evaluated using the same holistic review process."
    },
    {
      question: "Is there an interview process for admission?",
      answer: "Interviews are optional but recommended for competitive programs and scholarship candidates. You can schedule virtual or on-campus interviews through your applicant portal September-February."
    },
    {
      question: "How can I track the status of my application?",
      answer: "Use your applicant portal to: 1) Check document receipt status 2) Upload supplemental materials 3) View admission decision. Decisions are released electronically on March 31 for regular applicants."
    },
    {
      question: "What should I include in my personal statement or essay?",
      answer: "Focus on: Personal growth experiences, academic passions, and future goals. Successful essays demonstrate self-reflection, intellectual curiosity, and how you'll contribute to our community. Avoid generic topics - be specific and authentic.",
    },
    // Original questions continue below...
    // ... (keep all your previous faqData entries here)
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isDashboard={false} />
      
      {/* Main Content Area */}
      <div className="flex-grow pt-16 pb-20 bg-gradient-to-b from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Admission FAQs
              <span className="block mt-2 h-1 w-20 bg-blue-600 mx-auto"></span>
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Answers to Common Questions About Our Admission Process
            </p>
          </div>

          <div className="space-y-6">
            {faqData.map((item, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <span className="w-4 h-4 bg-blue-600 rounded-full mr-3"></span>
                    {item.question}
                  </h3>
                  <p className="mt-4 text-gray-600 pl-7 border-l-2 border-blue-100">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-600">
              Still have questions? Contact our admissions team at 
              <a 
                href="mailto:admissions@college.edu" 
                className="text-blue-600 hover:underline ml-2 transition-colors duration-200"
              >
                admissions@college.edu
              </a>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdmissionFAQ;