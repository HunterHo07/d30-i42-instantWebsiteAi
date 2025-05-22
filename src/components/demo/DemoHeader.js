'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';

const DemoHeader = ({
  viewMode,
  onViewModeChange,
  businessName,
  onBusinessNameChange,
  onLogoUpload,
  logoUrl
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(businessName);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    onBusinessNameChange(tempName);
    setIsEditing(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onLogoUpload(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <header className="bg-dark-900/80 backdrop-blur-md border-b border-gray-800 py-4 sticky top-16 z-40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Business Info */}
          <div className="flex items-center space-x-4">
            <div className="relative w-10 h-10 bg-dark-800 rounded-full overflow-hidden flex items-center justify-center border border-gray-700">
              {onLogoUpload ? (
                <label className="cursor-pointer w-full h-full flex items-center justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  {logoUrl ? (
                    <Image
                      src={logoUrl}
                      alt={`${businessName} logo`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  )}
                </label>
              ) : (
                <span className="text-xl font-bold text-primary-500">
                  {businessName.charAt(0)}
                </span>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleNameSubmit} className="flex items-center">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="bg-dark-800 border border-gray-700 rounded px-3 py-1 text-white focus:outline-none focus:border-primary-500"
                  autoFocus
                />
                <button
                  type="submit"
                  className="ml-2 text-primary-500 hover:text-primary-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
              </form>
            ) : (
              <div className="flex items-center">
                <h2 className="text-lg font-semibold text-white">{businessName}</h2>
                {onBusinessNameChange && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="ml-2 text-gray-400 hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Center: View Mode Toggle */}
          <div className="flex items-center bg-dark-800 rounded-lg p-1">
            <button
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'desktop'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => onViewModeChange('desktop')}
            >
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Desktop
              </span>
            </button>
            <button
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'mobile'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => onViewModeChange('mobile')}
            >
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                Mobile
              </span>
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              href="/"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Button>
            <Button
              size="sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              Save Template
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DemoHeader;
