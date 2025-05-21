'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUpload, FaCheck, FaTimes } from 'react-icons/fa';

const BusinessInfoForm = ({ onSubmit, isLoading }) => {
  const [businessName, setBusinessName] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [domain, setDomain] = useState('');
  const [errors, setErrors] = useState({});

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogo(null);
    setLogoPreview(null);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }
    
    if (!businessDescription.trim()) {
      newErrors.businessDescription = 'Business description is required';
    } else if (businessDescription.length > 200) {
      newErrors.businessDescription = 'Description must be 200 characters or less';
    }
    
    if (domain && !/^[a-z0-9-]+$/.test(domain)) {
      newErrors.domain = 'Domain can only contain lowercase letters, numbers, and hyphens';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        name: businessName,
        description: businessDescription,
        logo: logoPreview,
        domain: domain ? `${domain}.instantweb.ai` : null,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-200"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Tell us about your business</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Business Name */}
          <div>
            <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
              Business Name *
            </label>
            <input
              type="text"
              id="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className={`w-full px-4 py-2 border ${
                errors.businessName ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
              placeholder="e.g. Acme Corporation"
            />
            {errors.businessName && (
              <p className="mt-1 text-sm text-red-600">{errors.businessName}</p>
            )}
          </div>
          
          {/* Business Description */}
          <div>
            <label htmlFor="businessDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Business Description *
            </label>
            <textarea
              id="businessDescription"
              value={businessDescription}
              onChange={(e) => setBusinessDescription(e.target.value)}
              rows="3"
              className={`w-full px-4 py-2 border ${
                errors.businessDescription ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
              placeholder="Briefly describe what your business does"
            ></textarea>
            <div className="flex justify-between mt-1">
              {errors.businessDescription ? (
                <p className="text-sm text-red-600">{errors.businessDescription}</p>
              ) : (
                <p className="text-sm text-gray-500">
                  {businessDescription.length}/200 characters
                </p>
              )}
            </div>
          </div>
          
          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Logo
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 border border-gray-300 rounded-md flex items-center justify-center overflow-hidden bg-gray-50">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No logo</span>
                )}
              </div>
              
              <div className="flex-1">
                {!logoPreview ? (
                  <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                    <FaUpload className="mr-2" />
                    Upload Logo
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleLogoChange}
                    />
                  </label>
                ) : (
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <FaTimes className="mr-2" />
                    Remove Logo
                  </button>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Recommended: Square image, 512x512px or larger
                </p>
              </div>
            </div>
          </div>
          
          {/* Domain Name */}
          <div>
            <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-1">
              Subdomain (Optional)
            </label>
            <div className="flex rounded-md shadow-sm">
              <input
                type="text"
                id="domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value.toLowerCase())}
                className={`flex-1 min-w-0 block w-full px-4 py-2 rounded-none rounded-l-md border ${
                  errors.domain ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-primary-500`}
                placeholder="yourbusiness"
              />
              <span className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 rounded-r-md">
                .instantweb.ai
              </span>
            </div>
            {errors.domain ? (
              <p className="mt-1 text-sm text-red-600">{errors.domain}</p>
            ) : (
              <p className="mt-1 text-xs text-gray-500">
                This will be the web address where your site is published
              </p>
            )}
          </div>
          
          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Website...
                </>
              ) : (
                <>
                  <FaCheck className="mr-2" />
                  Generate My Website
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default BusinessInfoForm;
