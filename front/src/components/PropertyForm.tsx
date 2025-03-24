'use client';

import { useState } from 'react';

interface UrlField {
  id: number;
  value: string;
}

const MAX_URLS = 3;

const PropertyForm = () => {
  const [propertyName, setPropertyName] = useState('');
  const [urlFields, setUrlFields] = useState<UrlField[]>([{ id: 1, value: '' }]);

  const handleAddUrlField = () => {
    if (urlFields.length >= MAX_URLS) return;
    const newId = urlFields.length + 1;
    setUrlFields([...urlFields, { id: newId, value: '' }]);
  };

  const handleUrlChange = (id: number, value: string) => {
    setUrlFields(urlFields.map(field =>
      field.id === id ? { ...field, value } : field
    ));
  };

  const handleDeleteUrl = (id: number) => {
    if (urlFields.length === 1) return;
    const updatedFields = urlFields
      .filter(field => field.id !== id)
      .map((field, index) => ({
        ...field,
        id: index + 1
      }));
    setUrlFields(updatedFields);
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
            className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200"
            placeholder="Villa Vanilla, Casa Blanca, etc."
            required
          />
        </div>

        {/* URL Fields */}
        <div className="space-y-4">
          {urlFields.map((field, index) => (
            <div key={field.id} className="space-y-2">
              <label htmlFor={`url-${field.id}`} className="block text-base font-semibold text-gray-800">
                Property URL ({index + 1}/{MAX_URLS})
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  id={`url-${field.id}`}
                  value={field.value}
                  onChange={(e) => handleUrlChange(field.id, e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200"
                  placeholder="https://airbnb.com/casa-blanca,  xyzetc."
                  required
                />
                {urlFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDeleteUrl(field.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                    aria-label="Delete URL"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Add URL Text Link */}
          <div className="flex items-center justify-between pt-1">
            {urlFields.length < MAX_URLS ? (
              <button
                type="button"
                onClick={handleAddUrlField}
                className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors duration-200 cursor-pointer"
              >
                + Add URL
              </button>
            ) : (
              <p className="text-sm text-gray-500">
                Maximum number of URLs ({MAX_URLS}) reached
              </p>
            )}
          </div>
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
