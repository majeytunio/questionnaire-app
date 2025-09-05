// 'use client'

// import { createContext, useContext, useState, useEffect } from 'react'
// import { createClient } from '@supabase/supabase-js'

// const SupabaseContext = createContext()

// export const SupabaseProvider = ({ children }) => {
//   const [supabase] = useState(() =>
//     createClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://njbaxugtzignbosbkmzw.supabase.co',
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qYmF4dWd0emlnbmJvc2JrbXp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0MTQzMTgsImV4cCI6MjA3MDk5MDMxOH0.uqOFshRn-ZfasbF_vOKaIQ8CHvT9zWuUB1csB85r_6g'
//     )
//   )
//   const [session, setSession] = useState(null)

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session)
//     })

//     const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session)
//     })

//     return () => subscription.unsubscribe()
//   }, [supabase])

//   return (
//     <SupabaseContext.Provider value={{ supabase, session }}>
//       {children}
//     </SupabaseContext.Provider>
//   )
// }

// export const useSupabase = () => useContext(SupabaseContext)









"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user ?? null);
      }
    );

    // Keep session alive across tabs / inactivity
    supabase.auth.startAutoRefresh();

    return () => {
      subscription.unsubscribe();
      supabase.auth.stopAutoRefresh();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
