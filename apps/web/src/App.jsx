import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import FixturesPage from './pages/FixturesPage.jsx';
import LeaguePage from './pages/LeaguePage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import SponsorsPage from './pages/SponsorsPage.jsx';
import TeamsPage from './pages/TeamsPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import PlayersPage from './pages/PlayersPage.jsx';
import StatsPage from './pages/StatsPage.jsx';
import WatchPage from './pages/WatchPage.jsx';
import YouthPage from './pages/YouthPage.jsx';
import ResultsPage from './pages/ResultsPage.jsx';
import NewsPage from './pages/NewsPage.jsx';
import CompetitionsPage from './pages/CompetitionsPage.jsx';
import { Toaster } from 'sonner';

// Scroll to top helper inside Router context
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[hsl(var(--background))] flex flex-col">
        <Helmet>
          <title>Chicago Super League | Where Champions Rise</title>
          <meta name="description" content="The premier competitive soccer league in Chicago. Bringing together diverse neighborhoods and fostering competitive excellence." />
        </Helmet>

        <Header />
        
        <main className="flex-grow pt-[34px] md:pt-0"> {/* Adjusted for top bar offset */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/fixtures" element={<FixturesPage />} />
            <Route path="/competitions" element={<CompetitionsPage />} />
            <Route path="/league/:leagueName" element={<LeaguePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/sponsors" element={<SponsorsPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/players" element={<PlayersPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/watch" element={<WatchPage />} />
            <Route path="/youth" element={<YouthPage />} />
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 pt-20">
                <h1 className="text-6xl text-[hsl(var(--black))] mb-4">404</h1>
                <p className="text-xl text-[hsl(var(--gray))] mb-8">The page you're looking for doesn't exist.</p>
                <a href="/" className="bg-[hsl(var(--primary))] text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-[hsl(var(--primary-dark))] transition-colors">
                  Back to Home
                </a>
              </div>
            } />
          </Routes>
        </main>

        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;