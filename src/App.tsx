/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ConfigWarning from './components/ConfigWarning';
import { isSupabaseConfigured } from './lib/supabase';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import RequestProposal from './pages/RequestProposal';
import ProposalForm from './pages/ProposalForm';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageProjects from './pages/admin/ManageProjects';
import ManageServices from './pages/admin/ManageServices';
import ManageTestimonials from './pages/admin/ManageTestimonials';
import ViewLeads from './pages/admin/ViewLeads';
import ViewQuotes from './pages/admin/ViewQuotes';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLayout from './components/admin/AdminLayout';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="gpu-accelerate">
      {children}
    </div>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="flex min-h-screen flex-col bg-white text-luxury-ink selection:bg-luxury-gold/20 selection:text-luxury-gold">
      {!isSupabaseConfigured && <ConfigWarning />}
      
      {/* Only show public navbar on non-admin pages */}
      {!isAdminPath && <Navbar />}

      <main className="flex-grow relative">
        <AnimatePresence mode="wait">
          <Routes location={location}>
            {/* Public Routes */}
            <Route path="/" element={
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Home />
              </motion.div>
            } />
            <Route path="/services" element={
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Services />
              </motion.div>
            } />
            <Route path="/services/:id" element={
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <ServiceDetail />
              </motion.div>
            } />
            <Route path="/projects" element={
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Projects />
              </motion.div>
            } />
            <Route path="/projects/:id" element={
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectDetail />
              </motion.div>
            } />
            <Route path="/about" element={
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <About />
              </motion.div>
            } />
            <Route path="/contact" element={
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Contact />
              </motion.div>
            } />
            <Route path="/request-proposal" element={
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <RequestProposal />
              </motion.div>
            } />
            <Route path="/proposal-form" element={
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProposalForm />
              </motion.div>
            } />
            <Route path="/privacy-policy" element={
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <PrivacyPolicy />
              </motion.div>
            } />
            <Route path="/terms-of-service" element={
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <TermsOfService />
              </motion.div>
            } />

            {/* Admin Login - No Layout */}
            <Route path="/admin/login" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Login />
              </motion.div>
            } />

            {/* Protected Admin Routes - Wrapped in AdminLayout */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/admin/projects" element={<ManageProjects />} />
                <Route path="/admin/services" element={<ManageServices />} />
                <Route path="/admin/testimonials" element={<ManageTestimonials />} />
                <Route path="/admin/leads" element={<ViewLeads />} />
                <Route path="/admin/quotes" element={<ViewQuotes />} />
              </Route>
            </Route>
          </Routes>
        </AnimatePresence>
      </main>

      {/* Only show public footer on non-admin pages */}
      {!isAdminPath && <Footer />}
      <Toaster position="top-right" theme="light" richColors />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
