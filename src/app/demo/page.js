'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ThreeScene from '@/components/demo/ThreeScene';
import BusinessInfoForm from '@/components/demo/BusinessInfoForm';
import TemplatePreview from '@/components/demo/TemplatePreview';
import { FaArrowLeft, FaArrowRight, FaDownload, FaGlobe, FaCode } from 'react-icons/fa';

export default function DemoPage() {
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [businessInfo, setBusinessInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  
  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
  };
  
  const handleBusinessInfoSubmit = (info) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setBusinessInfo(info);
      setIsLoading(false);
      setStep(3);
    }, 2000);
  };
  
  const handlePublish = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsPublished(true);
    }, 2000);
  };
  
  const handleDownload = () => {
    // In a real app, this would trigger a download of the static site files
    alert('In the full version, this would download your website as static HTML files.');
  };
  
  const handleViewCode = () => {
    // In a real app, this would show the generated code
    alert('In the full version, this would show you the generated code for your website.');
  };
  
  const steps = [
    { number: 1, title: 'Choose Template' },
    { number: 2, title: 'Enter Business Info' },
    { number: 3, title: 'Preview & Publish' },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
            Create Your Website
          </h1>
          <p className="text-xl text-gray-600 text-center mb-8">
            Follow these simple steps to generate your website in seconds
          </p>
          
          {/* Steps indicator */}
          <div className="flex justify-between items-center mb-12 relative">
            {/* Progress bar */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-primary-500 -translate-y-1/2 z-0 transition-all duration-500"
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
            
            {/* Step circles */}
            {steps.map((s) => (
              <div 
                key={s.number}
                className={`relative z-10 flex flex-col items-center ${
                  s.number < step ? 'cursor-pointer' : ''
                }`}
                onClick={() => s.number < step && setStep(s.number)}
              >
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                    s.number <= step ? 'bg-primary-500' : 'bg-gray-300'
                  }`}
                >
                  {s.number < step ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    s.number
                  )}
                </div>
                <span 
                  className={`mt-2 text-sm font-medium ${
                    s.number <= step ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {s.title}
                </span>
              </div>
            ))}
          </div>
          
          {/* Step content */}
          <div className="mb-8">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-center">Select a template for your website</h2>
                <p className="text-gray-600 mb-8 text-center">
                  Click on a template to select it. You can customize it in the next steps.
                </p>
                
                <ThreeScene onSelectTemplate={handleSelectTemplate} />
                
                <div className="mt-8 text-center">
                  {selectedTemplate ? (
                    <button
                      onClick={() => setStep(2)}
                      className="btn btn-primary inline-flex items-center"
                    >
                      Continue with Template {selectedTemplate.id}
                      <FaArrowRight className="ml-2" />
                    </button>
                  ) : (
                    <p className="text-gray-600">Click on a template to continue</p>
                  )}
                </div>
              </motion.div>
            )}
            
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <button
                    onClick={() => setStep(1)}
                    className="inline-flex items-center text-gray-600 hover:text-gray-900"
                  >
                    <FaArrowLeft className="mr-2" />
                    Back to Templates
                  </button>
                  <div className="text-gray-600">
                    Template {selectedTemplate?.id}
                  </div>
                </div>
                
                <BusinessInfoForm 
                  onSubmit={handleBusinessInfoSubmit}
                  isLoading={isLoading}
                />
              </motion.div>
            )}
            
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <button
                    onClick={() => setStep(2)}
                    className="inline-flex items-center text-gray-600 hover:text-gray-900"
                  >
                    <FaArrowLeft className="mr-2" />
                    Back to Business Info
                  </button>
                  <div className="text-gray-600">
                    Preview & Publish
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-200 mb-8">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Website Preview</h2>
                  
                  <TemplatePreview 
                    selectedTemplate={selectedTemplate}
                    businessInfo={businessInfo}
                  />
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">Ready to publish?</h3>
                        <p className="text-gray-600">
                          Your website is ready to go live at{' '}
                          <span className="font-medium text-primary-600">
                            {businessInfo?.domain || `${businessInfo?.name?.toLowerCase().replace(/\s+/g, '')}.instantweb.ai`}
                          </span>
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={handleDownload}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <FaDownload className="mr-2" />
                          Download
                        </button>
                        <button
                          onClick={handleViewCode}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <FaCode className="mr-2" />
                          View Code
                        </button>
                        <button
                          onClick={handlePublish}
                          disabled={isLoading || isPublished}
                          className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 ${
                            (isLoading || isPublished) ? 'opacity-70 cursor-not-allowed' : ''
                          }`}
                        >
                          {isLoading ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Publishing...
                            </>
                          ) : isPublished ? (
                            <>
                              <FaGlobe className="mr-2" />
                              Published!
                            </>
                          ) : (
                            <>
                              <FaGlobe className="mr-2" />
                              Publish Website
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    
                    {isPublished && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md"
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-green-800">
                              Website Published Successfully!
                            </h3>
                            <div className="mt-2 text-sm text-green-700">
                              <p>
                                Your website is now live at{' '}
                                <a 
                                  href="#" 
                                  className="font-medium underline"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {businessInfo?.domain || `${businessInfo?.name?.toLowerCase().replace(/\s+/g, '')}.instantweb.ai`}
                                </a>
                              </p>
                              <p className="mt-1">
                                You can now share this link with others or continue to customize your website.
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">What's Next?</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold mb-2">Customize Content</h3>
                      <p className="text-gray-600">
                        Edit your website content through our simple admin panel.
                      </p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold mb-2">Connect Domain</h3>
                      <p className="text-gray-600">
                        Use your own domain or purchase one through us.
                      </p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold mb-2">Upgrade Features</h3>
                      <p className="text-gray-600">
                        Add forms, analytics, and other advanced features.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <a
                      href="/"
                      className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700"
                    >
                      Explore Pricing Plans
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
