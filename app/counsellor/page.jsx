// 'use client'

// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import { useAuth } from '../providers/authProvider';

// export default function Dashboard() {
//   const { user, loading } = useAuth();

//   return (
//     <>
//       <Navbar currentUser={user} />


      
//       <Footer currentUser={user} />
//     </>
//   );
// }











'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../providers/authProvider';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
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

        // // Fetch completed assessments
        // const { data: assessmentsData, error: assessmentsError } = await supabase
        //   .from('assessments')
        //   .select('*')
        //   .eq('user_id', user.id)
        //   .order('created_at', { ascending: false });

        const { data, error } = await supabase
            .from('assessments')
            .select('*');
            // .eq('user_id', user.id);

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

      <main className="container mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Welcome, {profile?.full_name || user.email}</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
          {profile ? (
            <div className="dark:bg-[var(--block-secondary)] bg-blue-400 shadow-md p-4 rounded text-white">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Full Name:</strong> {profile.first_name} {profile.last_name}</p>
              <p><strong>User Type:</strong> {profile.user_type.toUpperCase() || 'USER'}</p>
            </div>
          ) : (
            <p>No profile information available.</p>
          )}
        </section>

        <section>
        <h2 className="text-xl font-semibold mb-4">Completed Assessments</h2>

        {assessments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {assessments.map(a => (
                <div
                key={a.id}
                className="rounded-xl p-5 shadow-md border border-gray-200 bg-blue-400 dark:bg-[var(--block-secondary)] hover:shadow-lg transition-all duration-200"
                >
                <h3 className="text-lg font-bold mb-2 text-white dark:text-[var(--text-primary)]">
                    Assessment #{a.question_index}
                </h3>

                <div className="space-y-2 text-white dark:text-[var(--text-secondary)]">
                    <p>
                    <span className="font-semibold">Status:</span>{" "}
                    <span className="text-green-200 dark:text-green-600 font-medium">Completed</span>
                    </p>

                    {a.created_at && (
                    <p>
                        <span className="font-semibold">Completed On:</span>{" "}
                        {new Date(a.created_at).toLocaleDateString()}
                    </p>
                    )}

                    {a.score && (
                    <p>
                        <span className="font-semibold">Score:</span>{" "}
                        <span className="text-blue-600 font-bold">{a.score}</span>
                    </p>
                    )}
                </div>

                <button
                    className="mt-4 w-full py-2 rounded-lg bg-[var(--block-primary)] text-white font-semibold hover:opacity-90 transition"
                    onClick={() => router.push(`counsellor/assessments/${a.id}`)}
                >
                    View Details
                </button>
                </div>
            ))}

            </div>
        ) : (
            <p>You haven't completed any assessments yet.</p>
        )}
        </section>

      </main>

      <Footer currentUser={user} />
    </>
  );
}
