// 'use client'

// import Link from "next/link";
// import { useRouter } from 'next/navigation';
// import { supabase } from "../lib/supabase";

// import { Toaster, toast } from "react-hot-toast";


// export default function NavBar({ currentUser }) {

//   const router = useRouter();

//   // Handler for navigating to the signup page
//   const handleGotoLogin = () => {
//     router.push('/auth/login');
//   };

//   const handleSignOut = async () => {
//     // await supabase.auth.signOut();

//     // Use toast.promise for a better UX with async operations
//     await toast.promise(
//       supabase.auth.signOut(),
//       {
//         loading: 'Signing out...',
//         success: (res) => {
//           if (res.error) throw res.error;
//           // After successful login, redirect to the dashboard
//           setTimeout(() => {
//             router.push('/auth/login');
//           }, 1000);
//           return 'Logged Out.';
//         },
//         error: (err) => {
//           // If login fails, display the error message
//           return err.message || 'Logout failed.';
//         },
//       }
//     );
//   };

//   return (
//     <>
    
    
//     <Toaster position="bottom-right" />
//     <nav className="w-full flex justify-between items-center py-4 px-6 bg-[var(--navbar-background)]">
//       {/* Logo */}
//       <Link href="/" className="text-2xl font-bold text-[var(--text-primary)]">
//         AI Questionnaire
//       </Link>

//       {/* Links */}
//       <div className="hidden sm:flex gap-6 text-gray-700">
//         <Link href="#features" 
//         className="text-[var(--white)] hover:text-[var(--navbar-link-hover)]"
//         >Features</Link>
//         <Link href="#pricing" 
//         className="text-[var(--white)] hover:text-[var(--navbar-link-hover)]"
//         >Pricing</Link>
//         <Link href="#contact" 
//         className="text-[var(--white)] hover:text-[var(--navbar-link-hover)]"
//         >Contact</Link>
//       </div>

//       {/* Auth Button */}
//       {currentUser ? (
//         <button
//           onClick={handleSignOut}
//           className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
//         >
//           Logout
//         </button>
//       ) : (
//         <button
//           onClick={handleGotoLogin}
//           className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
//         >
//           Login
//         </button>
//       )}
//     </nav>
//     </>
//   );
// }























'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import { Toaster, toast } from "react-hot-toast";
import { useEffect, useState } from "react";

export default function NavBar({ currentUser }) {
  const router = useRouter();
  const [profile, setProfile] = useState(null);

  // Fetch user profile to determine role
  useEffect(() => {
    const fetchProfile = async () => {
      if (currentUser) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", currentUser.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
        } else {
          setProfile(data);
        }
      } else {
        setProfile(null);
      }
    };

    fetchProfile();
  }, [currentUser]);

  const handleGotoLogin = () => {
    router.push("/auth/login");
  };

  const handleSignOut = async () => {
    await toast.promise(
      supabase.auth.signOut(),
      {
        loading: "Signing out...",
        success: (res) => {
          if (res.error) throw res.error;
          setTimeout(() => {
            router.push("/auth/login");
          }, 800);
          return "Logged Out.";
        },
        error: (err) => err.message || "Logout failed.",
      }
    );
  };

  // Detect user role
  const userType = profile?.user_type || "public";
  const isAdmin = profile?.is_admin || false;

  return (
    <>
      <Toaster position="bottom-right" />

      <nav className="w-full flex justify-between items-center py-4 px-6 bg-[var(--navbar-background)]">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-[var(--text-primary)]">
          AI Questionnaire
        </Link>

        {/* Dynamic Menus */}
        <div className="hidden sm:flex gap-6 text-[var(--white)]">

          {/* ---------------------- */}
          {/* 1. GENERAL PUBLIC MENU */}
          {/* ---------------------- */}
          {(userType === "public") && (
            <>
              <Link href="/#features" className="hover:text-[var(--navbar-link-hover)]">Features</Link>
              <Link href="/#pricing" className="hover:text-[var(--navbar-link-hover)]">Pricing</Link>
              <Link href="/#contact" className="hover:text-[var(--navbar-link-hover)]">Contact</Link>
            </>
          )}

          {/* ---------------------- */}
          {/* 2. LOGGED-IN USER MENU */}
          {/* ---------------------- */}
          {userType === "user" && (
            <>
              <Link href="/dashboard" className="hover:text-[var(--navbar-link-hover)]">Dashboard</Link>
              <Link href="/assessments" className="hover:text-[var(--navbar-link-hover)]">My Assessments</Link>
              <Link href="/profile" className="hover:text-[var(--navbar-link-hover)]">Profile</Link>
            </>
          )}

          {/* ---------------------------- */}
          {/* 3. COUNSELLOR USER MENU     */}
          {/* ---------------------------- */}
          {userType === "counsellor" && (
            <>
              <Link href="/dashboard" className="hover:text-[var(--navbar-link-hover)]">Dashboard</Link>
              <Link href="/counsellor/clients" className="hover:text-[var(--navbar-link-hover)]">Clients</Link>
              <Link href="/counsellor/assessments" className="hover:text-[var(--navbar-link-hover)]">
                Assessments Review
              </Link>
              <Link href="/profile" className="hover:text-[var(--navbar-link-hover)]">Profile</Link>
            </>
          )}

          {/* ------------------------ */}
          {/* 4. ADMIN USER MENU      */}
          {/* ------------------------ */}
          {userType === "admin" && isAdmin && (
            <>
              <Link href="/admin/dashboard" className="hover:text-[var(--navbar-link-hover)]">Dashboard</Link>
              <Link href="/admin/users" className="hover:text-[var(--navbar-link-hover)]">Manage Users</Link>
              <Link href="/admin/assessments" className="hover:text-[var(--navbar-link-hover)]">All Assessments</Link>
              <Link href="/admin/settings" className="hover:text-[var(--navbar-link-hover)]">Admin Settings</Link>
            </>
          )}
          </div>
          {/* Auth Button */}

        {currentUser ? (
          <button
            onClick={handleSignOut}
            className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleGotoLogin}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
          >
            Login
          </button>
        )}
      </nav>
    </>
  );
}