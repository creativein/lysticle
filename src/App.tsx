import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DemoPage from './pages/DemoPage';
import { utmService } from './services/utmService';

function App() {
  const location = useLocation();
  
  // Initialize UTM tracking whenever the URL changes
  useEffect(() => {
    utmService.initUTMTracking();
  }, [location.search]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/onboard" element={<DemoPage />} />
    </Routes>
  );
}

export default App;