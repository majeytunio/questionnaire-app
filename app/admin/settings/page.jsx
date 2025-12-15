// 'use client'

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Navbar from '../../components/Navbar';
// import Footer from '../../components/Footer';
// import { useAuth } from '../../providers/authProvider';
// import { supabase } from '../../lib/supabase';

// export default function AdminSettings() {
//   const { user, loading } = useAuth();
//   const router = useRouter();
//   const [profile, setProfile] = useState(null);
//   const [assessments, setAssessments] = useState([]);
//   const [loadingData, setLoadingData] = useState(true);

//   // Redirect if not logged in
//   useEffect(() => {
//     if (!loading && !user) {
//       router.push('/auth/login'); // redirect to your login page
//     }
//   }, [user, loading]);

//   // Fetch profile and assessments
//   useEffect(() => {
//     if (user) {
//       const fetchData = async () => {
//         setLoadingData(true);

//         // Fetch profile
//         const { data: profileData, error: profileError } = await supabase
//           .from('profiles')
//           .select('*')
//           .eq('id', user.id)
//           .single();

//         if (profileError) console.error('Profile fetch error:', profileError);
//         else setProfile(profileData);

//         // // Fetch completed assessments
//         // const { data: assessmentsData, error: assessmentsError } = await supabase
//         //   .from('assessments')
//         //   .select('*')
//         //   .eq('user_id', user.id)
//         //   .order('created_at', { ascending: false });

//         const { data, error } = await supabase
//             .from('assessments')
//             .select('*')
//             .eq('user_id', user.id);

//             if (error) {
//             console.error("Supabase Error:", error);
//             } else {
//             console.log("Assessments:", data);
//             }
//         const assessmentsData = data;
//         const assessmentsError = error;

//         if (assessmentsError) console.error('Assessments fetch error:', assessmentsError);
//         else setAssessments(assessmentsData || []);

//         setLoadingData(false);
//       };

//       fetchData();
//     }
//   }, [user]);

//   if (loading || loadingData) {
//     return <p className="text-center mt-10">Loading...</p>;
//   }

//   return (
//     <>
//       <Navbar currentUser={user} />

//       <main className="container mx-auto mt-10">
//         <h1 className="text-2xl font-bold mb-4">Welcome, {profile?.full_name || user.email}</h1>

//         <section className="mb-8">
//           <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
//           {profile ? (
//             <div className="bg-[var(--block-secondary)] shadow-md p-4 rounded">
//               <p><strong>Email:</strong> {user.email}</p>
//               <p><strong>Full Name:</strong> {profile.first_name} {profile.last_name}</p>
//               <p><strong>User Type:</strong> {profile.user_type.toUpperCase() || 'USER'}</p>
//             </div>
//           ) : (
//             <p>No profile information available.</p>
//           )}
//         </section>

//         <section>
//         <h2 className="text-xl font-semibold mb-4">Completed Assessments</h2>

//         {assessments.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

//             {assessments.map(a => (
//                 <div
//                 key={a.id}
//                 className="rounded-xl p-5 shadow-md border border-gray-200 bg-[var(--block-secondary)] hover:shadow-lg transition-all duration-200"
//                 >
//                 <h3 className="text-lg font-bold mb-2 text-[var(--text-primary)]">
//                     Assessment #{a.question_index}
//                 </h3>

//                 <div className="space-y-2 text-[var(--text-secondary)]">
//                     <p>
//                     <span className="font-semibold">Status:</span>{" "}
//                     <span className="text-green-600 font-medium">Completed</span>
//                     </p>

//                     {a.created_at && (
//                     <p>
//                         <span className="font-semibold">Completed On:</span>{" "}
//                         {new Date(a.created_at).toLocaleDateString()}
//                     </p>
//                     )}

//                     {a.score && (
//                     <p>
//                         <span className="font-semibold">Score:</span>{" "}
//                         <span className="text-blue-600 font-bold">{a.score}</span>
//                     </p>
//                     )}
//                 </div>

//                 <button
//                     className="mt-4 w-full py-2 rounded-lg bg-[var(--block-primary)] text-white font-semibold hover:opacity-90 transition"
//                     onClick={() => router.push(`dashboard/assessments/${a.id}`)}
//                 >
//                     View Details
//                 </button>
//                 </div>
//             ))}

//             </div>
//         ) : (
//             <p>You haven't completed any assessments yet.</p>
//         )}
//         </section>

//       </main>

//       <Footer currentUser={user} />
//     </>
//   );
// }
















'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuth } from '../../providers/authProvider';
import { supabase } from '../../lib/supabase';

export default function AdminSettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState(null);
  const [users, setUsers] = useState([]);
  const [newPassword, setNewPassword] = useState('');
  const [loadingData, setLoadingData] = useState(true);

  /* -------------------- AUTH & ROLE GUARD -------------------- */
  useEffect(() => {
    if (!loading && !user) router.push('/auth/login');
  }, [user, loading]);

  useEffect(() => {
    if (!user) return;

    const init = async () => {
      setLoadingData(true);

      // Fetch admin profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!profileData || profileData.user_type !== 'admin') {
        router.push('/dashboard');
        return;
      }

      setProfile(profileData);

      // Fetch all users (Admin only)
      const { data: usersData } = await supabase
        .from('profiles')
        .select('id, email, first_name, last_name, user_type, created_at')
        .order('created_at', { ascending: false });

      setUsers(usersData || []);
      setLoadingData(false);
    };

    init();
  }, [user]);

  /* -------------------- ACTIONS -------------------- */

  const updatePassword = async () => {
    if (!newPassword || newPassword.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) alert(error.message);
    else {
      alert('Password updated successfully');
      setNewPassword('');
    }
  };

  const updateUserRole = async (userId, role) => {
    const { error } = await supabase
      .from('profiles')
      .update({ user_type: role })
      .eq('id', userId);

    if (!error) {
      setUsers(prev =>
        prev.map(u => (u.id === userId ? { ...u, user_type: role } : u))
      );
    }
  };

  if (loading || loadingData) return <p className="mt-10 text-center">Loading...</p>;

  /* -------------------- UI -------------------- */
  return (
    <>
      <Navbar currentUser={user} />

      <main className="container mx-auto mt-10 space-y-10">
        <h1 className="text-3xl font-bold">Admin Settings</h1>

        {/* Admin Account */}
        <section className="bg-[var(--block-secondary)] p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Admin Account</h2>
          <p className="text-sm text-gray-400 mb-3">Logged in as {user.email}</p>

          <div className="flex gap-3 max-w-md">
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="New password"
              className="w-full px-3 py-2 rounded bg-black/30"
            />
            <button
              onClick={updatePassword}
              className="px-4 py-2 rounded bg-red-600 text-white font-semibold"
            >
              Update
            </button>
          </div>
        </section>

        {/* User Management */}
        <section className="bg-[var(--block-secondary)] p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left border-b border-gray-700">
                <tr>
                  <th className="py-2">Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-b border-gray-800">
                    <td className="py-2">{u.first_name} {u.last_name}</td>
                    <td>{u.email}</td>
                    <td className="uppercase font-semibold">{u.user_type}</td>
                    <td className="text-right space-x-2">
                      {['user', 'counsellor', 'admin'].map(r => (
                        <button
                          key={r}
                          disabled={u.user_type === r}
                          onClick={() => updateUserRole(u.id, r)}
                          className={`px-3 py-1 rounded text-xs font-semibold ${
                            u.user_type === r
                              ? 'bg-gray-700 cursor-not-allowed'
                              : 'bg-[var(--block-primary)] hover:opacity-80'
                          }`}
                        >
                          {r.toUpperCase()}
                        </button>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Optional Admin Controls */}
        {/* <section className="bg-[var(--block-secondary)] p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">Other Admin Controls</h2>
          <ul className="list-disc ml-5 text-sm text-gray-400 space-y-1">
            <li>Force logout user sessions</li>
            <li>Disable / soft-delete users</li>
            <li>Audit logs (role changes, logins)</li>
            <li>Feature flags & access control</li>
            <li>Assessment moderation</li>
          </ul>
        </section> */}

        {/* HELLO DEAR */}
      </main>

      <Footer currentUser={user} />
    </>
  );
}
