import React, { useState } from 'react';
import './style.css';

const PremiumTabs = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <>
      <div className="background-decor">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
      </div>

      <div className="layout-container">
        
        {/* NAVEGADOR TIPO PASTILLA */}
        <div className="pill-nav-container">
          <button 
            className={`pill-tab ${activeTab === 'tab1' ? 'active' : ''}`} 
            onClick={() => setActiveTab('tab1')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="7"/>
              <path d="M12 6v4"/>
            </svg>
            <span className="tab-text">Kanata VX9</span>
          </button>

          <button 
            className={`pill-tab ${activeTab === 'tab2' ? 'active' : ''}`} 
            onClick={() => setActiveTab('tab2')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="6" width="20" height="12" rx="2" ry="2"/>
              <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8"/>
            </svg>
            <span className="tab-text">Redragon Kumara</span>
          </button>

          <button 
            className={`pill-tab ${activeTab === 'tab3' ? 'active' : ''}`} 
            onClick={() => setActiveTab('tab3')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="7"/>
              <path d="M12 6v4"/>
            </svg>
            <span className="tab-text">Logitech G Pro</span>
          </button>

          <button 
            className={`pill-tab ${activeTab === 'tab4' ? 'active' : ''}`} 
            onClick={() => setActiveTab('tab4')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="7"/>
              <path d="M12 6v4"/>
            </svg>
            <span className="tab-text">Attack Shark x11</span>
          </button>
        </div>

        {/* CONTENEDOR DE PESTAÑAS */}
        <div className="premium-tabs-container">
          <div className="tab-content-body">
            
            <div className={`content-panel ${activeTab === 'tab1' ? 'active' : ''}`}>
              <div className="panel-layout">
                <div className="image-wrapper"><img src="https://i.pinimg.com/736x/54/8c/61/548c61f03c6e520480c4f09540ca566b.jpg" alt="Fantech Kanata VX9" className="product-image" /></div>
                <div className="text-wrapper">
                  <span className="category-tag">Ratón Gaming</span>
                  <h3>Kanata VX9</h3>
                  <p>Precisión letal con sensor óptico de 10,000 DPI. Su diseño ergonómico y ultra-ligero te permite dominar cualquier partida sin fatiga.</p>
                  <button className="action-button">Configurar RGB</button>
                </div>
              </div>
            </div>

            <div className={`content-panel ${activeTab === 'tab2' ? 'active' : ''}`}>
              <div className="panel-layout">
                <div className="image-wrapper"><img src="https://i.pinimg.com/736x/4f/6b/05/4f6b050a585991a54b86322ec50687a8.jpg" alt="Teclado Redragon" className="product-image" /></div>
                <div className="text-wrapper">
                  <span className="category-tag">Teclado Mecánico</span>
                  <h3>Kumara</h3>
                  <p>Construcción robusta en aluminio y switches Outemu Blue táctiles. Retroiluminación inmersiva para setup avanzados.</p>
                  <button className="action-button">Mapear Teclas</button>
                </div>
              </div>
            </div>

            <div className={`content-panel ${activeTab === 'tab3' ? 'active' : ''}`}>
              <div className="panel-layout">
                <div className="image-wrapper"><img src="https://i.pinimg.com/1200x/04/0f/c8/040fc83fa5650844865e8a20fc7e6d62.jpg" alt="Logitech G Pro" className="product-image" /></div>
                <div className="text-wrapper">
                  <span className="category-tag">Ratón Inalámbrico</span>
                  <h3>Logitech G Pro</h3>
                  <p>La elección de los profesionales de eSports. Sensor Hero 25K y tecnología Lightspeed para una conexión sin latencia.</p>
                  <button className="action-button">Ver Perfiles Pro</button>
                </div>
              </div>
            </div>

            <div className={`content-panel ${activeTab === 'tab4' ? 'active' : ''}`}>
              <div className="panel-layout">
                <div className="image-wrapper"><img src="https://i.pinimg.com/1200x/fb/7c/c7/fb7cc7fc373ea61d891edfc74282b950.jpg" alt="Attack Shark x11" className="product-image" /></div>
                <div className="text-wrapper">
                  <span className="category-tag">Edición Especial</span>
                  <h3>Attack Shark x11</h3>
                  <p>Tamaño compacto para máximo espacio. Sensor premium en tonos oscuros con switches hiper-rápidos.</p>
                  <button className="action-button">Personalizar</button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  );
};

export default PremiumTabs;
