'use client';

import { useState } from 'react';
import { ImageUpload, ImageFile } from './ImageUpload';

interface UrlField {
  id: number;
  value: string;
}

interface PlaceField {
  id: number;
  type: PlaceType;
  count: number;
}

const PLACE_TYPES = [
  'Space for campers or caravans',
  'Tent camping area',
  'Camping, caravanning or tent site',
  'Glamping tent',
  'Yurt',
  'House',
  'Tree house',
  'House on water',
  'Tiny House',
  'Agritourism & Guesthouse',
  'Hotel',
  'Camper/Campervan'
] as const;

type PlaceType = typeof PLACE_TYPES[number];

const MAX_URLS = 3;
const MAX_IMAGES = 5;

const getUrlPlaceholder = (index: number) => {
  switch (index) {
    case 0:
      return "e.g., Airbnb listing URL";
    case 1:
      return "e.g., Booking.com listing URL";
    case 2:
      return "e.g., VRBO listing URL";
    default:
      return "https://";
  }
};

const PropertyForm = () => {
  const [propertyName, setPropertyName] = useState('');
  const [placeFields, setPlaceFields] = useState<PlaceField[]>([
    { id: 1, type: PLACE_TYPES[0], count: 1 }
  ]);
  const [urlFields, setUrlFields] = useState<UrlField[]>([{ id: 1, value: '' }]);
  const [notes, setNotes] = useState('');
  const [images, setImages] = useState<ImageFile[]>([]);

  const handleAddPlaceField = () => {
    const newId = placeFields.length + 1;
    setPlaceFields([...placeFields, { id: newId, type: PLACE_TYPES[0], count: 1 }]);
  };

  const handlePlaceTypeChange = (id: number, type: PlaceType) => {
    setPlaceFields(placeFields.map(field =>
      field.id === id ? { ...field, type } : field
    ));
  };

  const handlePlaceCountChange = (id: number, count: number) => {
    setPlaceFields(placeFields.map(field =>
      field.id === id ? { ...field, count: Math.max(1, count) } : field
    ));
  };

  const handleDeletePlace = (id: number) => {
    if (placeFields.length === 1) return;
    const updatedFields = placeFields
      .filter(field => field.id !== id)
      .map((field, index) => ({
        ...field,
        id: index + 1
      }));
    setPlaceFields(updatedFields);
  };

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
      places: placeFields,
      urls: urlFields,
      notes,
      images: images.map(img => img.file)
    });
    // Handle form submission here
  };

  return (
    <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden w-full max-w-3xl mx-auto p-8 transition-all duration-300 ease-in-out hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Property Name Field */}
        <div className="space-y-2">
          <label htmlFor="propertyName" className="block text-sm font-medium text-gray-600">
            Property Name
          </label>
          <input
            type="text"
            id="propertyName"
            value={propertyName}
            onChange={(e) => setPropertyName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors duration-200 text-[14px] text-gray-700 font-normal placeholder:text-gray-400 placeholder:text-sm placeholder:font-normal"
            placeholder="Villa Vanilla, Casa Blanca, etc."
            required
          />
        </div>

        {/* Place Fields */}
        <div className="space-y-4">
          {placeFields.map((field, index) => (
            <div key={field.id} className="space-y-2">
              <label htmlFor={`placeType-${field.id}`} className="block text-sm font-medium text-gray-600">
                Place Type #{field.id}
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <select
                    id={`placeType-${field.id}`}
                    value={field.type}
                    onChange={(e) => handlePlaceTypeChange(field.id, e.target.value as PlaceType)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors duration-200 text-[14px] text-gray-700 font-normal bg-white cursor-pointer appearance-none"
                    required
                  >
                    {PLACE_TYPES.map((type) => (
                      <option key={type} value={type} className="py-2">
                        {type}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                    <svg
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                <div className="w-32">
                  <input
                    type="number"
                    id={`placeCount-${field.id}`}
                    value={field.count}
                    onChange={(e) => handlePlaceCountChange(field.id, parseInt(e.target.value) || 1)}
                    min="1"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors duration-200 text-[14px] text-gray-700 font-normal"
                    required
                  />
                </div>
                {placeFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDeletePlace(field.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                    aria-label="Delete Place"
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

          {/* Add Place Text Link */}
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={handleAddPlaceField}
              className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors duration-200 cursor-pointer"
            >
              + Add Place
            </button>
          </div>
        </div>

        {/* URL Fields */}
        <div className="space-y-4">
          {urlFields.map((field, index) => (
            <div key={field.id} className="space-y-2">
              <label htmlFor={`url-${field.id}`} className="block text-sm font-medium text-gray-600">
                Property URL ({index + 1}/{MAX_URLS})
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  id={`url-${field.id}`}
                  value={field.value}
                  onChange={(e) => handleUrlChange(field.id, e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors duration-200 text-[14px] text-gray-700 font-normal placeholder:text-gray-400 placeholder:text-sm placeholder:font-normal"
                  placeholder={getUrlPlaceholder(index)}
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
              <p className="text-sm text-gray-500 font-normal">
                Maximum number of URLs ({MAX_URLS}) reached
              </p>
            )}
          </div>
        </div>

        {/* Notes Field */}
        <div className="space-y-2">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-600">
            Additional Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors duration-200 min-h-[100px] max-h-[400px] resize-y text-[14px] leading-relaxed text-gray-700 font-normal placeholder:text-gray-400 placeholder:text-sm placeholder:font-normal [&::-webkit-resizer]:h-4 [&::-webkit-resizer]:w-4 [&::-webkit-resizer]:rounded-bl-lg hover:resize-y"
            placeholder="Add any additional information about the property..."
            style={{ resize: 'vertical' }}
          />
        </div>

        {/* Image Upload Component */}
        <ImageUpload
          images={images}
          onImagesChange={setImages}
          maxImages={MAX_IMAGES}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full sm:w-auto sm:min-w-[160px] flex justify-center items-center py-2.5 px-6 border border-transparent rounded-xl text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-all duration-200 mt-8 mx-auto shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed gap-2 cursor-pointer"
        >
          Create Property
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default PropertyForm;
