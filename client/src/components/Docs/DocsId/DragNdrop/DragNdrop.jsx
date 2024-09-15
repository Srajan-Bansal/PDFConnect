import './DragNdrop.css';
import { useEffect, useState } from "react";
import { AiOutlineCheckCircle, AiOutlineCloudUpload } from "react-icons/ai";
import { MdClear } from "react-icons/md";
import { showError } from "../../../Toast";

const DragNdrop = ({ onFilesSelected, width }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) validateFile(selectedFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) validateFile(droppedFile);
  };

  const validateFile = (file) => {
    if (file.type === "application/pdf") {
      setFile(file);
    } else {
      showError("Please select a PDF file");
    }
  };

  const handleRemoveFile = () => setFile(null);

  useEffect(() => {
    onFilesSelected(file);
  }, [file, onFilesSelected]);

  return (
    <div className="drag-drop" style={{ width }}>
      <div
        className={`document-uploader ${file ? "active" : ""}`}
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        <div className="upload-info">
          <AiOutlineCloudUpload />
          <p>Drag and drop your PDF here or</p>
          <label htmlFor="browse" className="browse-btn">
            Browse
          </label>
          <input
            type="file"
            id="browse"
            onChange={handleFileChange}
            accept=".pdf"
            hidden
          />
        </div>
        {file && (
          <div className="file-item">
            <p>{file.name}</p>
            <MdClear onClick={handleRemoveFile} aria-label="Remove file" />
          </div>
        )}
        {file && (
          <div className="success-file">
            <AiOutlineCheckCircle />
            <p>1 file selected</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DragNdrop;
