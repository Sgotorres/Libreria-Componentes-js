import React from 'react';
import './style.css';

export default function SwitchToggle({ checked, onChange, label, disabled }) {
  return (
    <label className={`sw-wrapper ${disabled ? 'disabled' : ''}`}>
      <div className={`sw-track ${checked ? 'on' : ''}`}>
        <div className={`sw-thumb ${checked ? 'on' : ''}`} />
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          hidden
        />
      </div>
      {label && <span className="sw-label">{label}</span>}
    </label>
  );
}
