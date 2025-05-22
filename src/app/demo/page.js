'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import DemoHeader from '@/components/demo/DemoHeader';
import TemplateSelector from '@/components/demo/TemplateSelector';
import LivePreview from '@/components/demo/LivePreview';
import CustomizationPanel from '@/components/demo/CustomizationPanel';
import BackgroundEffect from '@/components/ui/BackgroundEffect';

export default function DemoPage() {
  const searchParams = useSearchParams();
  const [selectedTemplate, setSelectedTemplate] = useState('business');
  const [businessName, setBusinessName] = useState('Your Business');
  const [logoUrl, setLogoUrl] = useState('');
  const [customizations, setCustomizations] = useState({
    colors: {
      primary: '#0ea5e9',
      secondary: '#8b5cf6',
      accent: '#f97316',
    },
    fonts: {
      heading: 'Geist',
      body: 'Geist',
    },
    layout: 'centered',
  });
  const [viewMode, setViewMode] = useState('desktop');
  const [isLoading, setIsLoading] = useState(true);

  // Handle template selection from URL params
  useEffect(() => {
    const template = searchParams.get('template');
    if (template) {
      setSelectedTemplate(template);
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [searchParams]);

  // Handle customization changes
  const handleCustomizationChange = (type, key, value) => {
    setCustomizations(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [key]: value
      }
    }));
  };

  // Handle business name change
  const handleBusinessNameChange = (name) => {
    setBusinessName(name);
  };

  // Handle logo upload
  const handleLogoUpload = (url) => {
    setLogoUrl(url);
  };

  // Handle template change
  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId);
    // Simulate loading when changing templates
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // Handle view mode change (desktop/mobile)
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className="min-h-screen bg-dark-950 pt-16">
      <BackgroundEffect type="mesh" className="opacity-30" />

      <DemoHeader
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        businessName={businessName}
        onBusinessNameChange={handleBusinessNameChange}
        onLogoUpload={handleLogoUpload}
        logoUrl={logoUrl}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Template Selector (Left Sidebar) */}
          <div className="lg:col-span-3">
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onTemplateChange={handleTemplateChange}
            />
          </div>

          {/* Live Preview (Center) */}
          <div className="lg:col-span-6">
            <LivePreview
              template={selectedTemplate}
              businessName={businessName}
              logoUrl={logoUrl}
              customizations={customizations}
              viewMode={viewMode}
              isLoading={isLoading}
            />
          </div>

          {/* Customization Panel (Right Sidebar) */}
          <div className="lg:col-span-3">
            <CustomizationPanel
              customizations={customizations}
              onCustomizationChange={handleCustomizationChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
