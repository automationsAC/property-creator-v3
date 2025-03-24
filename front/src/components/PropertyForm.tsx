'use client';

import { useState } from 'react';

interface UrlField {
  id: number;
  value: string;
}

const PropertyForm = () => {
  const [propertyName, setPropertyName] = useState('');
  const [urlFields, setUrlFields] = useState<UrlField[]>([{ id: 1, value: '' }]);
  const MAX_URLS = 5; // Assuming a default MAX_URLS value

  const handleAddUrlField = () => {
    const newId = urlFields.length + 1;
    setUrlFields([...urlFields, { id: newId, value: '' }]);
  };

  const handleUrlChange = (id: number, value: string) => {
    setUrlFields(urlFields.map(field =>
      field.id === id ? { ...field, value } : field
    ));
  };

  const handleDeleteUrl = (id: number) => {
    setUrlFields(urlFields.filter(field => field.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      propertyName,
      urls: urlFields
    });
    // Handle form submission here
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-3xl mx-auto p-8 transition-all duration-200 hover:shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Property Name Field */}
        <div className="space-y-2">
          <label htmlFor="propertyName" className="block text-base font-semibold text-gray-800">
            Property Name
          </label>
          <input
            type="text"
            id="propertyName"
            value={propertyName}
            onChange={(e) => setPropertyName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
            placeholder="Enter property name"
            required
          />
        </div>

        {/* URL Fields */}
        <div className="space-y-4">
          {urlFields.map((field) => (
            <div key={field.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor={`url-${field.id}`} className="block text-base font-semibold text-gray-800">
                  Property URL #{field.id}
                </label>
                {urlFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDeleteUrl(field.id)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                    aria-label="Delete URL"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
              <input
                type="url"
                id={`url-${field.id}`}
                value={field.value}
                onChange={(e) => handleUrlChange(field.id, e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="https://"
                required
              />
            </div>
          ))}
        </div>

        {/* Add URL Button */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleAddUrlField}
            disabled={urlFields.length >= MAX_URLS}
            className={`inline-flex items-center px-5 py-2.5 border border-gray-200 rounded-lg shadow-sm text-sm font-medium ${
              urlFields.length >= MAX_URLS
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200`}
          >
            <span className="mr-2 text-lg">+</span>
            Add URL
          </button>
          {urlFields.length >= MAX_URLS && (
            <p className="text-sm text-gray-500">
              Maximum number of URLs ({MAX_URLS}) reached
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full sm:w-auto sm:min-w-[200px] flex justify-center py-3 px-8 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 mt-8 mx-auto"
        >
          Create Property
        </button>
      </form>
    </div>
  );
};

export default PropertyForm;
