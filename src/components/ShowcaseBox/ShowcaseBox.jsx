import React, { useState } from 'react';
// Importamos el resaltador y un tema oscuro
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'; 
import './ShowcaseBox.css';

export default function ShowcaseBox({ title, description, codeString, children }) {
  const [activeTab, setActiveTab] = useState('preview');

  return (
    <div className="showcase-wrapper">
      {title && <h3 className="showcase-title">{title}</h3>}
      {description && <p className="showcase-description">{description}</p>}

      <div className="showcase-container">
        <div className="showcase-tabs">
          <button 
            className={`showcase-tab ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            Preview
          </button>
          <button 
            className={`showcase-tab ${activeTab === 'jsx' ? 'active' : ''}`}
            onClick={() => setActiveTab('jsx')}
          >
            JSX
          </button>
        </div>

        <div className="showcase-content">
          {activeTab === 'preview' ? (
            <div className="showcase-preview-area">
              {children}
            </div>
          ) : (
            /* Aquí aplicamos el resaltador de sintaxis */
            <div className="showcase-code-area" style={{ padding: 0 }}>
              <SyntaxHighlighter 
                language="jsx" 
                style={dracula} 
                customStyle={{ margin: 0, padding: '1.5rem', background: '#282a36', borderRadius: '0 0 12px 12px' }}
              >
                {codeString}
              </SyntaxHighlighter>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}