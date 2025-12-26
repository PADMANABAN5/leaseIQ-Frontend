import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const LEASE_ANALYSIS_STEPS = [
  { step: 0, endpoint: "/api/debug/cam-single" },
  { step: 1, endpoint: "/api/debug/info" },
  { step: 2, endpoint: "/api/debug/space" },
  { step: 3, endpoint: "/api/debug/charge-schedules" },
  { step: 4, endpoint: "/api/debug/misc" },
];

export const useLeaseAnalyzer = () => {
  const runLeaseAnalysis = async ({ formData, onStepChange }) => {
    for (const item of LEASE_ANALYSIS_STEPS) {
      onStepChange(item.step);

      // allow UI repaint
      await new Promise((res) => setTimeout(res, 300));

      await axios.post(`${BASE_URL}${item.endpoint}`, formData);
    }
  };

  return { runLeaseAnalysis };
};
