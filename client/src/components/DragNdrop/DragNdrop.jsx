import { useEffect, useState } from "react";
import { AiOutlineCheckCircle, AiOutlineCloudUpload } from "react-icons/ai";
import { MdClear } from "react-icons/md";
import "./drag-drop.css";
import { toast } from "react-toastify";

const DragNdrop = ({ onFilesSelected, width }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFile = selectedFiles[0];
      if (newFile.type === "application/pdf") {
        setFile(newFile);
      } else {
        toast.error('Please select a PDF file');
      }
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFile = droppedFiles[0];
      console.log("Dropped file:", newFile);
      if (newFile.type === "application/pdf") {
        setFile(newFile);
      } else {
        toast.error("Please drop a PDF file");
      }
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  useEffect(() => {
    onFilesSelected(file);
  }, [file, onFilesSelected]);

  return (
    <div style={{ height: '200px' }}>

      <section className="drag-drop" style={{ width: width, height: '10px' }}>
        <div
          className={`document-uploader ${file ? "upload-box active" : "upload-box"}`}
          onDrop={handleDrop}
          onDragOver={(event) => event.preventDefault()}
        >
          <>
            <div className="upload-info">
              <AiOutlineCloudUpload />
              <div>
                <p>Drag and drop your file here</p>
                <p>
                  {/* Limit 15MB per file. */}
                  Supported file: .PDF
                </p>
              </div>
            </div>
            <input
              type="file"
              hidden
              id="browse"
              onChange={handleFileChange}
              accept=".pdf"
            />
            <label htmlFor="browse" className="browse-btn">
              Browse file
            </label>
          </>

          {file && (
            <div className="file-list">
              <div className="file-list__container">
                <div className="file-item">
                  <div className="file-info">
                    <p>{file.name}</p>
                  </div>
                  <div className="file-actions">
                    <MdClear onClick={handleRemoveFile} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {file && (
            <div className="success-file">
              <AiOutlineCheckCircle style={{ color: "#6DC24B", marginRight: 1 }} />
              <p>1 file selected</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DragNdrop;
