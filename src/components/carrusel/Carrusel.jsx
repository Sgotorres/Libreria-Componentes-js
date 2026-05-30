import { useState, useEffect } from 'react';
import './Carrusel.css';

export default function Carrusel({ imagenes, intervalo = 5000, mostrarBotones = true, altura = '400px' }) {
  const [actual, setActual] = useState(0);

  function anterior() {
    setActual(actual === 0 ? imagenes.length - 1 : actual - 1);
  }

  function siguiente() {
    setActual(actual === imagenes.length - 1 ? 0 : actual + 1);
  }

  useEffect(() => {
    if (intervalo <= 0) return;
    const id = setInterval(siguiente, intervalo);
    return () => clearInterval(id);
  }, [actual, intervalo]);

  if (!imagenes.length) return <p>No hay imágenes</p>;

  const img = imagenes[actual];

  return (
    <div className="carrusel" style={{ height: altura }}>
      <img src={img.src} alt={img.alt} />

      <div className="carrusel-texto">
        <h2>{img.titulo}</h2>
        {img.descripcion && <p>{img.descripcion}</p>}
        {img.link && <a href={img.link}>Ver más</a>}
      </div>

      {mostrarBotones && (
        <>
          <button className="btn izquierdo" onClick={anterior}>◀</button>
          <button className="btn derecho" onClick={siguiente}>▶</button>
        </>
      )}
    </div>
  );
}
