'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

const fontOptions = [
  { value: 'Geist', label: 'Geist' },
  { value: 'Arial', label: 'Arial' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Verdana', label: 'Verdana' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Playfair Display', label: 'Playfair' },
];

const layoutOptions = [
  { value: 'centered', label: 'Centered' },
  { value: 'sidebar', label: 'With Sidebar' },
  { value: 'fullwidth', label: 'Full Width' },
  { value: 'minimal', label: 'Minimal' },
];

const CustomizationPanel = ({ customizations, onCustomizationChange }) => {
  const [activeTab, setActiveTab] = useState('colors');

  const handleColorChange = (colorKey, value) => {
    onCustomizationChange('colors', colorKey, value);
  };

  const handleFontChange = (fontKey, value) => {
    onCustomizationChange('fonts', fontKey, value);
  };

  const handleLayoutChange = (value) => {
    onCustomizationChange('layout', null, value);
  };

  return (
    <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-4">
      <h2 className="text-xl font-bold mb-4">Customize</h2>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-800 mb-4">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'colors'
              ? 'text-primary-500 border-b-2 border-primary-500'
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('colors')}
        >
          Colors
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'fonts'
              ? 'text-primary-500 border-b-2 border-primary-500'
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('fonts')}
        >
          Fonts
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'layout'
              ? 'text-primary-500 border-b-2 border-primary-500'
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('layout')}
        >
          Layout
        </button>
      </div>
      
      {/* Colors Tab */}
      {activeTab === 'colors' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Primary Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={customizations.colors.primary}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
              />
              <input
                type="text"
                value={customizations.colors.primary}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                className="bg-dark-800 border border-gray-700 rounded px-3 py-1.5 text-white text-sm focus:outline-none focus:border-primary-500 w-full"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Secondary Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={customizations.colors.secondary}
                onChange={(e) => handleColorChange('secondary', e.target.value)}
                className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
              />
              <input
                type="text"
                value={customizations.colors.secondary}
                onChange={(e) => handleColorChange('secondary', e.target.value)}
                className="bg-dark-800 border border-gray-700 rounded px-3 py-1.5 text-white text-sm focus:outline-none focus:border-primary-500 w-full"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Accent Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={customizations.colors.accent}
                onChange={(e) => handleColorChange('accent', e.target.value)}
                className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
              />
              <input
                type="text"
                value={customizations.colors.accent}
                onChange={(e) => handleColorChange('accent', e.target.value)}
                className="bg-dark-800 border border-gray-700 rounded px-3 py-1.5 text-white text-sm focus:outline-none focus:border-primary-500 w-full"
              />
            </div>
          </div>
          
          <div className="pt-4">
            <h3 className="text-sm font-medium text-gray-300 mb-3">Color Presets</h3>
            <div className="grid grid-cols-4 gap-2">
              {[
                { primary: '#0ea5e9', secondary: '#8b5cf6', accent: '#f97316' },
                { primary: '#10b981', secondary: '#6366f1', accent: '#f43f5e' },
                { primary: '#f59e0b', secondary: '#ec4899', accent: '#3b82f6' },
                { primary: '#ef4444', secondary: '#14b8a6', accent: '#8b5cf6' },
                { primary: '#6366f1', secondary: '#f97316', accent: '#10b981' },
                { primary: '#8b5cf6', secondary: '#ef4444', accent: '#0ea5e9' },
                { primary: '#14b8a6', secondary: '#f59e0b', accent: '#6366f1' },
                { primary: '#f43f5e', secondary: '#0ea5e9', accent: '#f59e0b' },
              ].map((preset, index) => (
                <button
                  key={index}
                  className="w-full aspect-square rounded-md overflow-hidden border border-gray-700 hover:border-white transition-colors"
                  onClick={() => {
                    handleColorChange('primary', preset.primary);
                    handleColorChange('secondary', preset.secondary);
                    handleColorChange('accent', preset.accent);
                  }}
                >
                  <div className="h-1/3" style={{ backgroundColor: preset.primary }}></div>
                  <div className="h-1/3" style={{ backgroundColor: preset.secondary }}></div>
                  <div className="h-1/3" style={{ backgroundColor: preset.accent }}></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Fonts Tab */}
      {activeTab === 'fonts' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Heading Font
            </label>
            <select
              value={customizations.fonts.heading}
              onChange={(e) => handleFontChange('heading', e.target.value)}
              className="bg-dark-800 border border-gray-700 rounded px-3 py-2 text-white w-full focus:outline-none focus:border-primary-500"
            >
              {fontOptions.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Body Font
            </label>
            <select
              value={customizations.fonts.body}
              onChange={(e) => handleFontChange('body', e.target.value)}
              className="bg-dark-800 border border-gray-700 rounded px-3 py-2 text-white w-full focus:outline-none focus:border-primary-500"
            >
              {fontOptions.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="pt-4">
            <h3 className="text-sm font-medium text-gray-300 mb-3">Font Combinations</h3>
            <div className="space-y-2">
              {[
                { heading: 'Geist', body: 'Geist', name: 'Modern Clean' },
                { heading: 'Montserrat', body: 'Georgia', name: 'Professional' },
                { heading: 'Playfair Display', body: 'Roboto', name: 'Elegant' },
                { heading: 'Roboto', body: 'Arial', name: 'Classic' },
              ].map((combo, index) => (
                <button
                  key={index}
                  className="w-full text-left px-3 py-2 rounded bg-dark-800 hover:bg-dark-700 transition-colors"
                  onClick={() => {
                    handleFontChange('heading', combo.heading);
                    handleFontChange('body', combo.body);
                  }}
                >
                  <span className="text-sm font-medium text-white">{combo.name}</span>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Heading: {combo.heading}</span>
                    <span>Body: {combo.body}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Layout Tab */}
      {activeTab === 'layout' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Layout Style
            </label>
            <div className="grid grid-cols-2 gap-3">
              {layoutOptions.map((layout) => (
                <button
                  key={layout.value}
                  className={`p-3 rounded-lg border ${
                    customizations.layout === layout.value
                      ? 'border-primary-500 bg-primary-500/10'
                      : 'border-gray-700 bg-dark-800 hover:border-gray-600'
                  } transition-colors`}
                  onClick={() => handleLayoutChange(layout.value)}
                >
                  <div className="aspect-video bg-gray-700 rounded mb-2 overflow-hidden">
                    {/* Layout preview icon/image would go here */}
                    <div className={`w-full h-full flex items-center justify-center ${
                      layout.value === 'centered' ? 'bg-gray-600' :
                      layout.value === 'sidebar' ? 'flex flex-row' :
                      layout.value === 'fullwidth' ? 'bg-gray-600' :
                      'bg-gray-700'
                    }`}>
                      {layout.value === 'sidebar' && (
                        <>
                          <div className="w-1/4 h-full bg-gray-500"></div>
                          <div className="w-3/4 h-full bg-gray-600"></div>
                        </>
                      )}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-white">{layout.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="mt-8 space-y-3">
        <Button fullWidth>
          Save Changes
        </Button>
        <Button variant="outline" fullWidth>
          Reset to Default
        </Button>
      </div>
    </div>
  );
};

export default CustomizationPanel;
