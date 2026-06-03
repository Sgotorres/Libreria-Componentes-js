import React, { useState, useRef } from 'react';
import './style.css';

export default function FileUpload({ accept = '*', multiple = false, maxSize, onChange }) {
  const [files, setFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleFiles = (list) => {
    const newFiles = Array.from(list);
    if (maxSize) {
      const valid = newFiles.filter(f => f.size <= maxSize);
      if (valid.length !== newFiles.length) alert(`Algunos archivos superan el límite de ${formatSize(maxSize)}`);
      if (valid.length === 0) return;
      setFiles(multiple ? prev => [...prev, ...valid] : valid);
      if (onChange) onChange(multiple ? [...files, ...valid] : valid);
    } else {
      setFiles(multiple ? prev => [...prev, ...newFiles] : newFiles);
      if (onChange) onChange(multiple ? [...files, ...newFiles] : newFiles);
    }
  };

  const removeFile = (i) => {
    const next = files.filter((_, idx) => idx !== i);
    setFiles(next);
    if (onChange) onChange(next);
  };

  return (
    <div className="fu-wrapper">
      <div
        className={`fu-dropzone ${dragOver ? 'dragover' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          hidden
          onChange={(e) => { handleFiles(e.target.files); e.target.value = ''; }}
        />
        <div className="fu-icon">📁</div>
        <p className="fu-text">Arrastra archivos aquí o <span className="fu-link">selecciona</span></p>
        <span className="fu-hint">{accept !== '*' ? accept : 'Todos los formatos'}{multiple ? ' — multiselect' : ''}</span>
      </div>

      {files.length > 0 && (
        <div className="fu-files">
          {files.map((f, i) => (
            <div key={i} className="fu-file">
              {f.type.startsWith('image/')
                ? <img src={URL.createObjectURL(f)} alt="" className="fu-preview" onClick={() => setPreview(f)} />
                : <span className="fu-file-icon">📄</span>}
              <div className="fu-file-info">
                <span className="fu-file-name">{f.name}</span>
                <span className="fu-file-size">{formatSize(f.size)}</span>
              </div>
              <button className="fu-remove" onClick={() => removeFile(i)}>×</button>
            </div>
          ))}
        </div>
      )}

      {preview && (
        <div className="fu-overlay" onClick={() => setPreview(null)}>
          <div className="fu-modal" onClick={(e) => e.stopPropagation()}>
            <button className="fu-modal-close" onClick={() => setPreview(null)}>×</button>
            <img src={URL.createObjectURL(preview)} alt={preview.name} className="fu-modal-img" />
            <p className="fu-modal-name">{preview.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}
