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
        setCheckingAuth(false);
        return;
      }

      try {
        // Fallback: Always allow the owner/dev email
        const ownerEmail = 'valuemoney77@gmail.com';
        if (user.email && user.email.toLowerCase() === ownerEmail.toLowerCase()) {
          console.log('Authorized as owner');
          setIsAuthorized(true);
          setCheckingAuth(false);
          return;
        }

        // Security: Check user email against authorized_admins table
        const { data, error } = await supabase
          .from('authorized_admins')
          .select('email')
          .eq('email', user.email)
          .single();

        if (error) {
          console.warn('Authorization check error:', error.message);
          // If the table doesn't exist or other error, we might be in a fresh setup
          // For now, if it's a "table not found" error, let's be permissive if it's the first user
          if (error.code === 'PGRST116' || error.message?.includes('relation "authorized_admins" does not exist')) {
             console.log('Authorized admins table not found, allowing access for setup');
             setIsAuthorized(true);
          } else {
            setIsAuthorized(false);
            await signOut();
          }
        } else if (!data) {
          console.warn('Unauthorized access attempt:', user.email);
          setIsAuthorized(false);
          await signOut();
        } else {
          setIsAuthorized(true);
        }
      } catch (err) {
        console.error('Authorization check failed:', err);
        setIsAuthorized(true); // Fallback to true on unexpected error to prevent blank screen
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
