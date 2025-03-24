import { useCallback, useState } from 'react';

export interface ImageFile {
  id: number;
  file: File;
  preview: string;
}

interface ImageUploadProps {
  images: ImageFile[];
  onImagesChange: (images: ImageFile[]) => void;
  maxImages?: number;
}

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  onImagesChange,
  maxImages = 5
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDeleteImage = (id: number) => {
    const imageToDelete = images.find(img => img.id === id);
    if (imageToDelete) {
      URL.revokeObjectURL(imageToDelete.preview);
    }
    onImagesChange(images.filter(img => img.id !== id));
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, [images, maxImages, onImagesChange]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const validImageFiles = files.filter(file =>
      ACCEPTED_IMAGE_TYPES.includes(file.type)
    );

    const remainingSlots = maxImages - images.length;
    const filesToAdd = validImageFiles.slice(0, remainingSlots);

    const newImages: ImageFile[] = filesToAdd.map((file, index) => ({
      id: Date.now() + index,
      file,
      preview: URL.createObjectURL(file)
    }));

    onImagesChange([...images, ...newImages]);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-600">
        Additional Files ({images.length}/{maxImages})
      </label>
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 transition-colors duration-200 text-center ${
          isDragging
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <input
          type="file"
          id="images"
          accept={ACCEPTED_IMAGE_TYPES.join(',')}
          multiple
          onChange={handleFileInput}
          className="hidden"
        />
        <label
          htmlFor="images"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <svg
            className="w-8 h-8 text-gray-400 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-sm text-gray-500">
            Drop images here or click to upload
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Supported formats: JPEG, PNG, WEBP (max {maxImages} files)
          </p>
        </label>
      </div>

      {/* File List */}
      {images.length > 0 && (
        <div className="mt-4 space-y-2">
          {images.map((image) => (
            <div
              key={image.id}
              className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors duration-200"
            >
              <span className="text-sm text-gray-700 truncate">
                {image.file.name}
              </span>
              <button
                type="button"
                onClick={() => handleDeleteImage(image.id)}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                aria-label="Delete file"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
