import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import AddProperty from "./pages/Addproperty";
import AddUnitSuite from "./pages/AddUnitSuite";
import UploadLease from "./pages/UploadLease";
import AnalyzingLease from "./pages/AnalyzingLease";
import AnalysisSuccess from "./pages/AnalysisSuccess";
import LeaseDetails from "./pages/LeaseDetails";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
