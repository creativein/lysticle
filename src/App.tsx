import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DemoPage from './pages/DemoPage';
import OnboardingsPage from './pages/Onboardings';
import { AuthGuard } from './components/auth/AuthGuard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/onboard" element={<DemoPage />} />
      <Route 
        path="/onboardings" 
        element={
          <AuthGuard>
            <OnboardingsPage />
          </AuthGuard>
        } 
      />
    </Routes>
  );
}

export default App;