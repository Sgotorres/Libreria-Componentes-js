import React, { useState } from 'react';
import './style.css'; // Mantenemos tus estilos originales

// En lugar de 'observedAttributes', en React usamos "Props"
export default function InputText({ 
    ancho = '100%', 
    largo = '45px', 
    min = 0, 
    max = Infinity, 
    tipo = 'todo', 
    placeholder = 'Escriba aquí...',
    onValorCambiado // Esto reemplaza tu CustomEvent('valor-cambiado')
}) {
    // En lugar de guardar variables en 'this', en React usamos Estados
    const [valor, setValor] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [esValido, setEsValido] = useState(true);

    // Esta función se ejecuta cada vez que el usuario escribe algo
    const manejarCambio = (e) => {
        let nuevoValor = e.target.value;

        // 1. Filtrado en tiempo real (Igual a tu _attachEvents)
        if (tipo === 'numeros') nuevoValor = nuevoValor.replace(/[^0-9]/g, '');
        if (tipo === 'letras') nuevoValor = nuevoValor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
        if (tipo === 'sin-especiales') nuevoValor = nuevoValor.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]/g, '');

        // 2. Límite máximo de longitud
        if (max !== Infinity && nuevoValor.length > max) {
            nuevoValor = nuevoValor.slice(0, max);
        }

        // Actualizamos el estado del input
        setValor(nuevoValor);
        
        // Ejecutamos la validación
        validar(nuevoValor);
    };

    // Esta es exactamente tu función _validate()
    const validar = (texto) => {
        let valido = true;
        let mensaje = '';

        if (texto.length > 0) {
            if (texto.length < min) { 
                mensaje = `Se requieren al menos ${min} caracteres.`; 
                valido = false; 
            } else {
                if (tipo === 'numeros' && !/^[0-9]+$/.test(texto)) { 
                    mensaje = 'Error: Solo se admiten números.'; 
                    valido = false; 
                } 
                else if (tipo === 'letras' && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(texto)) { 
                    mensaje = 'Error: Solo se admiten letras.'; 
                    valido = false; 
                } 
                else if (tipo === 'sin-especiales' && !/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/.test(texto)) { 
                    mensaje = 'Error: No se admiten caracteres especiales.'; 
                    valido = false; 
                }
            }
        }

        // Actualizamos los estados visuales (_updateUI)
        setEsValido(valido);
        setErrorMsg(mensaje);

        // Disparamos el evento al padre (Equivalente a this.dispatchEvent)
        if (onValorCambiado) {
            onValorCambiado({ valor: texto, valido: valido });
        }
    };

    // Este es tu render() y tu _updateUI() combinados de forma automática
    return (
        <div className="input-wrapper" style={{ width: ancho, display: 'block' }}>
            <input 
                type="text" 
                placeholder={placeholder} 
                value={valor}
                onChange={manejarCambio}
                style={{ height: largo }}
                className={!esValido ? 'invalid' : ''}
            />
            {/* Si el mensaje de error no está vacío y es inválido, mostramos la clase visible */}
            <div className={`error-msg ${!esValido ? 'visible' : ''}`}>
                {errorMsg}
            </div>
        </div>
    );
}