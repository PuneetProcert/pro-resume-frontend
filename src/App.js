import { Navigate, Route, Routes } from "react-router-dom";
import PostLoginWrapper from "./app/containers/PostLoginWrapper";
import ResumeDashBoard from "./app/features/dashboard/ResumeDashBoard";

function App() {
  return (
    <>
      <div className="App" data-testid="appTest">
        <Routes>
          {/**Pre login routes */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/**Post login routes */}
          <Route element={<PostLoginWrapper />}>
            <Route path="/dashboard" element={<ResumeDashBoard />} />
            {/* <Route path="access-denied" element={<AccessDenied />} /> */}

            {/* <Route path="*" element={<NotFound />} /> */}
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
