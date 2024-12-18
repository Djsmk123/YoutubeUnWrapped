import React, { useCallback, useState } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onDataProcess: (dataChunk: any[]) => void; // Called for each chunk of parsed data
}

export function FileUpload({ onDataProcess }: FileUploadProps) {
  const [loading, setLoading] = useState(false);

  const CHUNK_SIZE = 1000000; // Process 1000 items per chunk

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !files[0]) return;
  

    const file = files[0];

    if (!file.name.endsWith('.json')) {
      alert('Invalid file type: Please upload a JSON file.');
      return;
    }

    setLoading(true);

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        if (!text) {
          throw new Error('File is empty or unreadable.');
        }

        // Parse the JSON file content
        const jsonArray = JSON.parse(text);
        if (!Array.isArray(jsonArray)) {
          throw new Error('Invalid JSON format: Expected an array at the top level.');
        }

        // Process the array in chunks
        const totalChunks = Math.ceil(jsonArray.length / CHUNK_SIZE);
        for (let i = 0; i < totalChunks; i++) {
          const chunk = jsonArray.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
          onDataProcess(chunk); // Pass each chunk to the parent component
        }

        alert(`Successfully processed ${jsonArray.length} records.`);
      } catch (error: any) {
        console.error('Error parsing JSON:', error);
        alert(`Error processing the file: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    reader.readAsText(file);

    // Reset the input value to allow selecting the same file again
    event.target.value = '';
  }, [onDataProcess]);

  return (
    <div className="text-center">
      <label className="block w-full max-w-xl mx-auto" tabIndex={0}>
        <div className="mt-8 flex flex-col items-center justify-center px-6 py-12 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors cursor-pointer">
          {loading ? (
            <svg
              className="animate-spin h-12 w-12 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-label="Loading"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <Upload className="h-12 w-12 text-gray-400" />
          )}
          <div className="mt-4">
            <span className="font-medium text-indigo-600">Upload your JSON file</span>
            <p className="text-sm text-gray-500 mt-1">Drag and drop or click to select your file</p>
          </div>
        </div>
        <input
          type="file"
          className="hidden"
          accept=".json"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}
