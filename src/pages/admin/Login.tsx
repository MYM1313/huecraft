import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';
import { ShieldCheck, Loader2, Paintbrush, Lock } from 'lucide-react';

const Login = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    document.title = 'Admin Access | Huecraft';
    // If user is already logged in, redirect to admin dashboard
    if (user && !loading) {
      navigate('/admin');
    }
  }, [user, loading, navigate]);

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/admin`
        }
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || 'Authentication failed');
      setGoogleLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#0A0F1E] px-4 overflow-hidden selection:bg-luxury-gold/30">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-luxury-blue-mid/20 blur-[120px] animate-pulse-soft" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-luxury-gold/5 blur-[120px] animate-pulse-soft" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo Section */}
        <div className="mb-12 text-center">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-luxury-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img 
              src="https://ik.imagekit.io/jabzmiuta/Gemini_Generated_Image_6tlhjt6tlhjt6tlh-removebg-preview.png" 
              alt="Huecraft Logo" 
              className="relative z-10 h-16 w-16 object-contain"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-serif text-4xl font-light tracking-[0.1em] text-white mb-3"
          >
            ADMIN <span className="italic text-luxury-gold">ACCESS</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-[10px] font-bold tracking-[0.5em] text-luxury-gray uppercase"
          >
            Secure management portal
          </motion.p>
        </div>

        {/* Login Card */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-3xl p-8 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] sm:p-12">
          {/* Top highlight */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <div className="space-y-10">
            <div className="text-center space-y-2">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-luxury-gold border border-white/10 mb-2">
                <Lock className="h-5 w-5" />
              </div>
              <p className="text-[11px] font-medium text-white/60 tracking-wide">
                Please authenticate to continue
              </p>
            </div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="group relative w-full overflow-hidden rounded-2xl bg-white text-luxury-ink py-5 text-[11px] font-bold uppercase tracking-[0.3em] transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-[0.98] disabled:opacity-50"
            >
              <div className="relative z-10 flex items-center justify-center gap-4">
                {googleLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-luxury-gold" />
                ) : (
                  <>
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </>
                )}
              </div>
              {/* Subtle 3D Depth Effect */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-black/10" />
            </button>

            {/* Trust Line */}
            <div className="flex flex-col items-center gap-4 pt-4">
              <div className="flex items-center gap-2 text-white/30">
                <ShieldCheck className="h-3 w-3" />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Secure & encrypted access</span>
              </div>
              <div className="h-[1px] w-12 bg-white/10" />
            </div>
          </div>
        </div>

        {/* Footer Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 text-center"
        >
          <span className="text-[8px] font-bold tracking-[0.5em] uppercase text-white/20">Huecraft © 2026</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
