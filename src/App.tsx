import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DemoPage from './pages/DemoPage';
import OnboardingsPage from './pages/Onboardings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/onboard" element={<DemoPage />} />
      <Route path="/onboardings" element={<OnboardingsPage />} />
    </Routes>
  );
}

export default App;