import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import AddProperty from "./pages/AddProperty";
import AddUnitSuite from "./pages/AddUnitSuite";
import UploadLease from "./pages/UploadLease";
import AnalyzingLease from "./pages/AnalyzingLease";
import AnalysisSuccess from "./pages/AnalysisSuccess";
import LeaseDetails from "./pages/LeaseDetails";
import Unit from "./pages/Unit";
import Dashboard from "./pages/Dashboard";
import TenantDashboard from "./components/TenantDashboard";
import QuickLeaseAnalysisCard from "./components/QuickLeaseAnalysisCard";
import QuickAnalysisInfo from "./components/QuickAnalysisInfo";
import AiLeaseAssistant from "./components/AiLeaseAssistant";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/add-unit-suite" element={<AddUnitSuite />} />
        <Route path="/upload-lease" element={<UploadLease />} />
        <Route path="/analyzing-lease" element={<AnalyzingLease />} />
        <Route path="/analysis-success" element={<AnalysisSuccess />} />
        <Route path="/lease-details" element={<LeaseDetails />} />
        <Route path="/units" element={<Unit />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tenant/:tenantName" element={<TenantDashboard />} />
        <Route path="/quick-lease-analysis"element={<QuickLeaseAnalysisCard />}/>
        <Route  path="/quick-analysis-info"  element={<QuickAnalysisInfo />}/>
        <Route path="/ai-lease-assistant" element={<AiLeaseAssistant />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
