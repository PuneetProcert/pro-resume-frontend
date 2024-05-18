import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ResumeDashBoard from "./app/components/ResumeDashBoard";

function App() {
  return (
    <>
      <div className="112">
        <h1>Resume builder</h1>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<ResumeDashBoard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
