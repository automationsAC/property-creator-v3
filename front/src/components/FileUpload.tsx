import { useCallback, useState } from 'react';

export interface ImageFile {
  id: number;
  file: File;
  preview: string;
}

interface FileUploadProps {
  images: ImageFile[];
  onImagesChange: (images: ImageFile[]) => void;
  maxImages?: number;
}

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ACCEPTED_DOCUMENT_TYPES = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
const ACCEPTED_TYPES = [...ACCEPTED_IMAGE_TYPES, ...ACCEPTED_DOCUMENT_TYPES];

export const FileUpload: React.FC<FileUploadProps> = ({
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
    const validFiles = files.filter(file =>
      ACCEPTED_TYPES.includes(file.type)
    );

    const remainingSlots = maxImages - images.length;
    const filesToAdd = validFiles.slice(0, remainingSlots);

    const newImages: ImageFile[] = filesToAdd.map((file, index) => ({
      id: Date.now() + index,
      file,
      preview: ACCEPTED_IMAGE_TYPES.includes(file.type)
        ? URL.createObjectURL(file)
        : '' // No preview for documents
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
          accept={ACCEPTED_TYPES.join(',')}
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
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="text-sm text-gray-500">
            Drag and drop or click to upload files
          </p>
          <div className="text-xs text-gray-400 mt-1 space-y-0.5">
            <p>Images: JPEG, PNG, WEBP • Documents: PDF, TXT, DOC, DOCX</p>
            <p>Maximum {maxImages} files</p>
          </div>
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
              <div className="flex items-center gap-2">
                {ACCEPTED_IMAGE_TYPES.includes(image.file.type) ? (
                  <svg
                    className="w-4 h-4 text-gray-400"
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
                ) : (
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                )}
                <span className="text-sm text-gray-700 truncate">
                  {image.file.name}
                </span>
              </div>
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
