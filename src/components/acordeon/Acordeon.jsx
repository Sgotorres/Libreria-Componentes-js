import { useState } from 'react';
import './style.css';

function Item({ item, depth = 0 }) {
  const [abierto, setAbierto] = useState(false);
  const tieneSubs = item.subcategorias?.length > 0;

  return (
    <div className={`acordeon-fila ${abierto ? 'abierto' : ''}`}>
      <div className="fila-header" onClick={() => setAbierto(!abierto)}>
        <span className="fila-titulo">{item.titulo}</span>
        {(tieneSubs || item.contenido) && (
          <span className="fila-icono">{abierto ? '−' : '+'}</span>
        )}
      </div>
      {abierto && (
        <div className="fila-body">
          {item.contenido && <p className="fila-texto">{item.contenido}</p>}
          {tieneSubs && (
            <div className="acordeon-filas">
              {item.subcategorias.map((sub, i) => (
                <Item key={i} item={sub} depth={depth + 1} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Acordeon({ items = [] }) {
  return (
    <div className="acordeon-filas">
      {items.map((item, i) => (
        <Item key={item.id ?? i} item={item} depth={0} />
      ))}
    </div>
  );
}
