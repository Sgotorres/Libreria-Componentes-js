import React from 'react';
import './style.css';

export default function Stepper({ steps = [], activeStep = 0, onStepChange }) {
  return (
    <div className="st-wrapper">
      <div className="st-steps">
        {steps.map((step, i) => {
          const status = i < activeStep ? 'completed' : i === activeStep ? 'active' : 'pending';
          return (
            <React.Fragment key={i}>
              <div
                className={`st-step ${status}`}
                onClick={() => onStepChange?.(i)}
              >
                <div className="st-circle">
                  {status === 'completed' ? '✓' : i + 1}
                </div>
                <div className="st-label">
                  <span className="st-title">{step.label}</span>
                  {step.description && <span className="st-desc">{step.description}</span>}
                </div>
              </div>
              {i < steps.length - 1 && <div className={`st-line ${i < activeStep ? 'completed' : ''}`} />}
            </React.Fragment>
          );
        })}
      </div>

      {steps[activeStep]?.content && (
        <div className="st-content">
          {steps[activeStep].content}
        </div>
      )}
    </div>
  );
}
