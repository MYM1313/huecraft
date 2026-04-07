import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { ShieldAlert, Loader2, ArrowLeft } from 'lucide-react';

const ProtectedRoute: React.FC = () => {
  const { user, loading, signOut } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthorization = async () => {
      if (!user) {
        console.log('No user session found in ProtectedRoute');
        setCheckingAuth(false);
        return;
      }

      try {
        const userEmail = user.email || user.user_metadata?.email;
        console.log('Checking authorization for:', userEmail);
        
        if (!userEmail) {
          console.error('No email found in user object or metadata');
          setIsAuthorized(false);
          setCheckingAuth(false);
          return;
        }

        // Fallback: Always allow the owner/dev emails
        const ownerEmails = ['valuemoney77@gmail.com', 'huecraft77@gmail.com'];
        if (userEmail && ownerEmails.some(email => email.toLowerCase().trim() === userEmail.toLowerCase().trim())) {
          console.log('Authorized as owner (fallback)');
          setIsAuthorized(true);
          setCheckingAuth(false);
          return;
        }

        // Security: Check user email against authorized_admins table
        const { data, error } = await supabase
          .from('authorized_admins')
          .select('email')
          .eq('email', userEmail)
          .single();

        if (error) {
          console.warn('Authorization check error:', error.message, error.code);
          
          // PGRST116 means "no rows found" - if the table exists but user is not in it
          if (error.code === 'PGRST116') {
             console.warn('User not found in authorized_admins table');
             setIsAuthorized(false);
          } 
          // Check if table doesn't exist
          else if (error.message?.includes('relation "authorized_admins" does not exist')) {
             console.log('Authorized admins table not found, allowing access for initial setup');
             setIsAuthorized(true);
          } else {
            console.error('Unexpected authorization error:', error);
            setIsAuthorized(false);
          }
        } else if (!data) {
          console.warn('No authorization data returned for:', user.email);
          setIsAuthorized(false);
        } else {
          console.log('User authorized via database');
          setIsAuthorized(true);
        }
      } catch (err) {
        console.error('Unexpected error during authorization check:', err);
        // On unexpected error, we'll be restrictive but show the error in console
        setIsAuthorized(false);
      } finally {
        setCheckingAuth(false);
      }
    };

    if (!loading) {
      checkAuthorization();
    }
  }, [user, loading, signOut]);

  if (loading || checkingAuth) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0A0F1E]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-luxury-gold" />
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-luxury-gray">Verifying Credentials</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (isAuthorized === false) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#0A0F1E] px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm space-y-8"
        >
          <div className="flex justify-center">
            <div className="rounded-full bg-red-500/10 p-5 text-red-500 border border-red-500/20">
              <ShieldAlert className="h-10 w-10" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="font-serif text-3xl font-light text-white uppercase tracking-[0.2em]">Access Restricted</h1>
            <p className="text-sm text-luxury-gray font-medium">
              You are not authorized to access this panel.
            </p>
          </div>

          <button 
            onClick={() => navigate('/admin/login')}
            className="group flex items-center justify-center gap-3 mx-auto rounded-xl bg-white/5 border border-white/10 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-white hover:text-luxury-ink"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Login
          </button>
        </motion.div>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
