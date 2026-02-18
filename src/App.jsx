import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const TopicPage = lazy(() => import('./pages/TopicPage'));
const ConceptsPage = lazy(() => import('./pages/ConceptsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

const Loading = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: 'white' }}>
    <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', borderTop: '2px solid #3b82f6', borderBottom: '2px solid #3b82f6', animation: 'spin 1s linear infinite' }}></div>
    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
  </div>
);

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f1f5f9', position: 'relative' }}>
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', filter: 'blur(100px)' }} />
          <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', borderRadius: '50%', background: 'rgba(168, 85, 247, 0.1)', filter: 'blur(100px)' }} />
        </div>

        <Header />

        <main style={{ position: 'relative', zIndex: 10, minHeight: '100vh' }}>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/topic/:topicId" element={<TopicPage />} />
              <Route path="/concepts" element={<ConceptsPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
