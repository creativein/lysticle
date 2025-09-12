import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LandingPage from './pages/LandingPage';
import DemoPage from './pages/DemoPage';
import OnboardingsPage from './pages/Onboardings';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import { AuthGuard } from './components/auth/AuthGuard';
import { CookieBanner } from './components/ui/CookieBanner';
import { setCookieConsent, hasValidConsent } from './services/cookieService';

function App() {
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    // Check if we need to show the cookie banner
    if (!hasValidConsent()) {
      setShowCookieBanner(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    setCookieConsent({
      analytics: true,
      marketing: true,
    });
    setShowCookieBanner(false);
  };

  const handleRejectCookies = () => {
    setCookieConsent({
      analytics: false,
      marketing: false,
    });
    setShowCookieBanner(false);
  };

  return (
    <>
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
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
      </Routes>
      {showCookieBanner && (
        <CookieBanner
          onAccept={handleAcceptCookies}
          onReject={handleRejectCookies}
        />
      )}
    </>
  );
}

export default App;