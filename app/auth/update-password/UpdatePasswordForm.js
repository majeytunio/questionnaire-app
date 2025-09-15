'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import { Toaster, toast } from 'react-hot-toast';

export default function UpdatePasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Check if we're in a password reset flow
    const checkRecovery = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error || !data.session) {
        toast.error('Invalid or expired reset link');
        setTimeout(() => router.push('/auth/login'), 2000);
        return;
      }
      
      setIsLoading(false);
    };

    checkRecovery();
  }, [router]);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setIsUpdating(true);

    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Password updated successfully!');
      setTimeout(() => router.push('/auth/login'), 2000);
    }

    setIsUpdating(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--black)] px-4">
      <Toaster position="top-right" />
      <form onSubmit={handleUpdatePassword} className="w-full max-w-md bg-[var(--gray-dark)] p-8 rounded-xl shadow-md border border-[var(--gold)]">
        <h2 className="text-2xl font-bold mb-6 text-[var(--gold)] text-center">Update Password</h2>
        
        <div className="mb-5">
          <label className="block mb-1 text-sm font-medium text-[var(--gold)]">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-[var(--gold)] rounded-md bg-[var(--black)] text-[var(--gold)]"
            required
            minLength={6}
          />
        </div>

        <div className="mb-5">
          <label className="block mb-1 text-sm font-medium text-[var(--gold)]">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-[var(--gold)] rounded-md bg-[var(--black)] text-[var(--gold)]"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="w-full py-2 bg-[var(--gold)] text-[var(--black)] font-semibold rounded-md"
        >
          {isUpdating ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
}