import { MdUpload } from "react-icons/md";
import CustomButton from "./CustomButton";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

export const UploadFile = () => {
  const { setValue, watch } = useFormContext();
  
  const logoUri = watch("configuration.logo_uri");
  const [file, setFile] = useState<File | null>(
    logoUri ? new File([], logoUri) : null
  );
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      setFile(selectedFile);
      setValue("configuration.logo_uri", selectedFile.name);
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`flex flex-col px-[10vw] py-[10vh] mt-4 border-2 border-dashed rounded-md justify-center items-center cursor-pointer transition-colors ${
        isDragOver
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-gray-400"
      }`}
      onClick={handleFileSelect}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <input
        ref={fileInputRef}
        type="file"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setValue("configuration.logo_uri", selectedFile.name);
          }
        }}
        className="hidden"
      />

      <MdUpload
        color="white"
        className="h-10 w-10 p-1 bg-gray-300 rounded-full mb-4"
      />

      <CustomButton variant="primary" className="mt-4 text-sm">
        SÉLECTIONNER UN FICHIER
      </CustomButton>

      {file && (
        <span className="mt-2 text-sm text-gray-600">
          Fichier sélectionné: {file.name}
        </span>
      )}
    </div>
  );
};
