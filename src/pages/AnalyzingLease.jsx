import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/analyzingLease.css";

const steps = [
  "Document uploaded",
  "Text extracted",
  "Extracting key dates...",
  "Identifying rent schedules...",
  "Finding CAM provisions...",
];

const AnalyzingLease = () => {
  const [progress, setProgress] = useState(34);
  const [activeStep, setActiveStep] = useState(2);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            navigate("/analysis-success");
          }, 800);
          return 100;
        }
        return prev + 1;
      });

      setActiveStep((prev) => {
        if (prev < steps.length - 1) return prev + 0.02;
        return prev;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="analyzing-page">
      <div className="analyzing-card">
        <h2>Analyzing your lease...</h2>
        <p className="subtitle-analyzinglease">
          Our AI is extracting key information from your document
        </p>

        <div className="progress-header">
          <span>Processing</span>
          <span className="progress-percent">{progress}%</span>
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="steps">
          {steps.map((step, index) => (
            <div className="step-row" key={index}>
              {index < activeStep ? (
                <span className="step-check">✓</span>
              ) : (
                <span className="step-loader" />
              )}
              <span className={`step-text ${index < activeStep ? "done" : ""}`}>
                {step}
              </span>
            </div>
          ))}
        </div>

        <p className="footer-text">This typically takes 2–3 minutes</p>
      </div>
    </div>
  );
};

export default AnalyzingLease;
