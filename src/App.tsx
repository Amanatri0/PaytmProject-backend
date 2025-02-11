import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { SendMoney } from "./pages/Sendmoney";
import { Dashboard } from "./pages/Dashboard";

import { Settings } from "./pages/Settings";
import { LandingPage } from "./pages/LandingPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sendmoney" element={<SendMoney />} />
          <Route path="/setting" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
