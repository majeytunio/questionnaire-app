
'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuth } from '../../providers/authProvider';
import { supabase } from '../../lib/supabase';

export default function Assessments() {
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
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Assessments</h2>

                {(!assessments || assessments.length === 0) ? (
                    <p>No assessments found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {assessments.map(a => {
                            const owner = Array.isArray(profiles)
                                ? profiles.find(p => p.id === a.user_id)
                                : profiles && profiles.id === a.user_id ? profiles : null;

                            return (
                                <div
                                    key={a.id}
                                    className="rounded-xl p-5 shadow-md border border-gray-200 bg-[var(--block-secondary)] hover:shadow-lg transition-all duration-200"
                                >
                                    <h3 className="text-lg font-bold mb-2 text-[var(--text-primary)]">
                                        {a.title || `Assessment ${a.id}`}
                                    </h3>

                                    <div className="space-y-2 text-[var(--text-secondary)]">
                                        <p>
                                            <span className="font-semibold">Owner:</span>{" "}
                                            {owner ? (owner.first_name || owner.full_name || owner.email) : (a.user_id || "—")}
                                        </p>

                                        <p>
                                            <span className="font-semibold">Question Index:</span>{" "}
                                            {typeof a.question_index !== "undefined" && a.question_index !== null ? a.question_index : "—"}
                                        </p>

                                        <p>
                                            <span className="font-semibold">Language:</span>{" "}
                                            {typeof a.language !== "undefined" && a.language !== null ? a.language : "—"}
                                        </p>

                                        <p>
                                            <span className="font-semibold">Status:</span>{" "}
                                            {typeof a.completed === "boolean" ? (a.completed ? "Completed" : "Incomplete") : "—"}
                                        </p>

                                        <p>
                                            <span className="font-semibold">Updated At:</span>{" "}
                                            {a.updated_at ? new Date(a.updated_at).toLocaleString() : "—"}
                                        </p>
                                    </div>

                                    <div className="mt-4 flex gap-2">
                                        <button
                                            className="flex-1 py-2 rounded-lg bg-[var(--block-primary)] text-white font-semibold hover:opacity-90 transition"
                                            onClick={() => router.push(`/admin/assessments/${a.id}`)}
                                        >
                                            View
                                        </button>

                                        <button
                                            className="py-2 px-3 rounded-lg border border-gray-300 bg-white text-[var(--text-primary)] hover:bg-gray-50 transition"
                                            onClick={() => {
                                                // simple client-side delete prompt — adjust to your deletion logic
                                                if (confirm("Delete this assessment? This cannot be undone.")) {
                                                    (async () => {
                                                        const { error } = await supabase
                                                            .from('assessments')
                                                            .delete()
                                                            .eq('id', a.id);
                                                        if (error) {
                                                            alert("Delete failed: " + error.message);
                                                        } else {
                                                            setAssessments(prev => prev.filter(x => x.id !== a.id));
                                                        }
                                                    })();
                                                }
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </main>

        <Footer currentUser={user} />
    </>
);
}