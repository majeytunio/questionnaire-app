
'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuth } from '../../providers/authProvider';
import { supabase } from '../../lib/supabase';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [profiles, setProfiles] = useState(null);
  const [profile, setProfile] = useState(null);
  const [assessments, setAssessments] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login'); // redirect to your login page
    }
  }, [user, loading]);

  // Fetch profile and assessments
  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        setLoadingData(true);

        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) console.error('Profile fetch error:', profileError);
        else setProfile(profileData);


        // Fetch profile
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('*');

        if (profilesError) console.error('Profile fetch error:', profilesError);
        else setProfiles(profilesData);

        // console.log("Profiles Data:", profilesData);

        // // Fetch completed assessments
        // const { data: assessmentsData, error: assessmentsError } = await supabase
        //   .from('assessments')
        //   .select('*')
        //   .eq('user_id', user.id)
        //   .order('created_at', { ascending: false });

        const { data, error } = await supabase
            .from('assessments')
            .select('*')
            .eq('user_id', user.id);

            if (error) {
            console.error("Supabase Error:", error);
            } else {
            console.log("Assessments:", data);
            }
        const assessmentsData = data;
        const assessmentsError = error;

        if (assessmentsError) console.error('Assessments fetch error:', assessmentsError);
        else setAssessments(assessmentsData || []);

        setLoadingData(false);
      };

      fetchData();
    }
  }, [user]);

  if (loading || loadingData) {
    return <p className="text-center mt-10">Loading...</p>;
  }

return (
    <>
        <Navbar currentUser={user} />

        <main className="container mx-auto mt-5">
            {/* <h1 className="text-2xl font-bold mb-4">Welcome, {profile?.full_name || user.email}</h1> */}

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Users</h2>

                {/* Normalize profiles to an array in case the fetch returned a single object */}
                {(() => {
                    const users = Array.isArray(profiles) ? profiles : profiles ? [profiles] : [];
                    if (users.length === 0) {
                        return <p>No users found.</p>;
                    }

                    return (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {users.map(u => (
                                <div
                                    key={u.id}
                                    className="rounded-xl p-5 shadow-md border border-gray-200 bg-blue-400 dark:bg-[var(--block-secondary)] hover:shadow-lg transition-all duration-200"
                                >
                                    <h3 className="text-lg font-bold mb-2 text-green-200 dark:text-[var(--text-primary)]">
                                        {u.first_name || u.full_name || 'Unnamed User'}
                                    </h3>

                                    <div className="space-y-2 text-white dark:text-[var(--text-secondary)]">
                                        <p>
                                            <span className="font-semibold">Email:</span>{" "}
                                            {u.email || u.user_email || '—'}
                                        </p>

                                        <p>
                                            <span className="font-semibold">Full Name:</span>{" "}
                                            {(u.first_name || '') + (u.last_name ? ` ${u.last_name}` : '') || u.full_name || '—'}
                                        </p>

                                        <p>
                                            <span className="font-semibold">User Type:</span>{" "}
                                            {(u.user_type || 'user').toUpperCase()}
                                        </p>
                                    </div>

                                    <button
                                        className="mt-4 w-full py-2 rounded-lg bg-[var(--block-primary)] text-white font-semibold hover:opacity-90 transition"
                                        onClick={() => router.push(`/admin/users/${u.id}`)}
                                    >
                                        View Profile
                                    </button>
                                </div>
                            ))}
                        </div>
                    );
                })()}
            </section>

        </main>

        <Footer currentUser={user} />
    </>
);
}
