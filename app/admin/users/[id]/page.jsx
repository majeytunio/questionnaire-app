// // app/admin/users/[id]/page.jsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { supabase } from '../../../lib/supabase';
// import { useAuth } from '../../../providers/authProvider';

// export default function UserDetailsPage() {
//   const { id } = useParams();
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   const [userDetails, setUserDetails] = useState(null);
//   const [loadingData, setLoadingData] = useState(true);

//   // redirect if not logged in
//   useEffect(() => {
//     if (!loading && !user) {
//       router.push('/auth/login');
//     }
//   }, [loading, user, router]);

//   // fetch assessment
//   useEffect(() => {
//     if (!id || !user) return;

//     const fetchUserDetails = async () => {
//       setLoadingData(true);
//       const { data, error } = await supabase
//         .from('profiles')
//         .select('*')
//         .eq('id', id)
//         .single();

//       if (error) {
//         console.error('User details fetch error:', error);
//       } else {
//         setUserDetails(data);
//       }

//       setLoadingData(false);
//     };

//     fetchUserDetails();
//   }, [id, user]);

//   if (loading || loadingData) {
//     return <p className="text-center mt-10">Loading...</p>;
//   }

//   if (!userDetails) {
//     return (
//       <div className="p-10 text-center">
//         <h2 className="text-xl font-bold">User not found.</h2>
//         <button
//           onClick={() => router.push('/dashboard')}
//           className="mt-4 px-4 py-2 bg-[var(--block-primary)] text-white rounded-lg"
//         >
//           Back to Dashboard
//         </button>
//       </div>
//     );
//   }

//   const { email, first_name, last_name, credits, verified, is_admin, user_type, created_at } = userDetails;

// const handleSave = async (e) => {
//     e && e.preventDefault && e.preventDefault();
//     try {
//         setLoadingData(true);
//         const updatePayload = {
//             email: userDetails.email,
//             first_name: userDetails.first_name,
//             last_name: userDetails.last_name,
//             credits: Number(userDetails.credits) || 0,
//             verified: !!userDetails.verified,
//             is_admin: !!userDetails.is_admin,
//             user_type: userDetails.user_type,
//         };

//         const { data, error } = await supabase
//             .from('profiles')
//             .update(updatePayload)
//             .eq('id', id)
//             .select()
//             .single();

//         if (error) {
//             console.error('Update error:', error);
//             alert('Failed to update user. See console for details.');
//         } else {
//             setUserDetails(data);
//             alert('User updated successfully.');
//         }
//     } finally {
//         setLoadingData(false);
//     }
// };

// return (
//     <div className="container mx-auto mt-10 px-4">
//         <div className="flex items-center justify-between mb-6">
//             <h1 className="text-3xl font-bold">User Detail / Edit</h1>
//             <div className="flex gap-2">
//                 <button
//                     onClick={() => router.push('/admin/users')}
//                     className="px-4 py-2 bg-[var(--block-secondary)] text-white rounded-lg"
//                     disabled={loadingData}
//                 >
//                     Back
//                 </button>
//             </div>
//         </div>

//         <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Form Column */}
//             <div className="col-span-1 bg-[var(--block-secondary)] p-6 rounded-xl shadow">
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium mb-1">First name</label>
//                     <input
//                         type="text"
//                         value={userDetails.first_name || ''}
//                         onChange={(e) => setUserDetails({ ...userDetails, first_name: e.target.value })}
//                         className="w-full px-3 py-2 rounded border"
//                         disabled={loadingData}
//                         required
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <label className="block text-sm font-medium mb-1">Last name</label>
//                     <input
//                         type="text"
//                         value={userDetails.last_name || ''}
//                         onChange={(e) => setUserDetails({ ...userDetails, last_name: e.target.value })}
//                         className="w-full px-3 py-2 rounded border"
//                         disabled={loadingData}
//                         required
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <label className="block text-sm font-medium mb-1">Email</label>
//                     <input
//                         type="email"
//                         value={userDetails.email || ''}
//                         onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
//                         className="w-full px-3 py-2 rounded border"
//                         disabled={loadingData}
//                         required
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <label className="block text-sm font-medium mb-1">Credits</label>
//                     <input
//                         type="number"
//                         value={userDetails.credits ?? 0}
//                         onChange={(e) =>
//                             setUserDetails({ ...userDetails, credits: e.target.value === '' ? '' : Number(e.target.value) })
//                         }
//                         className="w-full px-3 py-2 rounded border"
//                         disabled={loadingData}
//                         min={0}
//                     />
//                 </div>

//                 <div className="flex items-center gap-4 mb-4">
//                     <label className="flex items-center gap-2">
//                         <input
//                             type="checkbox"
//                             checked={!!userDetails.verified}
//                             onChange={(e) => setUserDetails({ ...userDetails, verified: e.target.checked })}
//                             disabled={loadingData}
//                         />
//                         <span className="text-sm">Verified</span>
//                     </label>

//                     <label className="flex items-center gap-2">
//                         <input
//                             type="checkbox"
//                             checked={!!userDetails.is_admin}
//                             onChange={(e) => setUserDetails({ ...userDetails, is_admin: e.target.checked })}
//                             disabled={loadingData}
//                         />
//                         <span className="text-sm">Admin</span>
//                     </label>
//                 </div>

//                 <div className="mb-4">
//                     <label className="block text-sm font-medium mb-1">User Type</label>
//                     <select
//                         value={userDetails.user_type || 'user'}
//                         onChange={(e) => setUserDetails({ ...userDetails, user_type: e.target.value })}
//                         className="w-full px-3 py-2 rounded border"
//                         disabled={loadingData}
//                     >
//                         <option value="user">User</option>
//                         <option value="admin">Admin</option>
//                         <option value="editor">Editor</option>
//                         <option value="guest">Guest</option>
//                     </select>
//                 </div>

//                 <div className="mb-4">
//                     <label className="block text-sm font-medium mb-1">Created At</label>
//                     <input
//                         type="text"
//                         value={created_at ? new Date(created_at).toLocaleString() : 'N/A'}
//                         readOnly
//                         className="w-full px-3 py-2 rounded border bg-gray-50"
//                     />
//                 </div>

//                 <div className="flex gap-3 mt-4">
//                     <button
//                         type="submit"
//                         className="px-4 py-2 bg-[var(--block-primary)] text-white rounded-lg"
//                         disabled={loadingData}
//                     >
//                         {loadingData ? 'Saving...' : 'Save'}
//                     </button>
//                     <button
//                         type="button"
//                         onClick={() => {
//                             // revert local changes by refetching current details
//                             setLoadingData(true);
//                             supabase
//                                 .from('profiles')
//                                 .select('*')
//                                 .eq('id', id)
//                                 .single()
//                                 .then(({ data, error }) => {
//                                     if (!error) setUserDetails(data);
//                                     else console.error('Refetch error:', error);
//                                 })
//                                 .finally(() => setLoadingData(false));
//                         }}
//                         className="px-4 py-2 bg-white border rounded-lg"
//                         disabled={loadingData}
//                     >
//                         Revert
//                     </button>
//                 </div>
//             </div>

//             {/* Right column: info + raw JSON */}
//             <div className="col-span-2 bg-[var(--block-secondary)] p-6 rounded-xl shadow">
//                 <h2 className="text-xl font-semibold mb-4">Additional Info</h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                     <div>
//                         <p className="text-sm text-gray-400">ID</p>
//                         <p className="font-medium break-all">{userDetails.id}</p>
//                     </div>

//                     <div>
//                         <p className="text-sm text-gray-400">Status</p>
//                         <p className={userDetails.verified ? 'text-[var(--success-color)]' : 'text-yellow-600'}>
//                             {userDetails.verified ? 'Verified' : 'Unverified'}
//                         </p>
//                     </div>

//                     <div>
//                         <p className="text-sm text-gray-400">Role</p>
//                         <p className="font-medium">{userDetails.is_admin ? 'Admin' : userDetails.user_type || 'User'}</p>
//                     </div>

//                     <div>
//                         <p className="text-sm text-gray-400">Credits</p>
//                         <p className="font-medium">{userDetails.credits ?? 0}</p>
//                     </div>
//                 </div>

//                 <div>
//                     <button
//                         type="button"
//                         className="px-4 py-2 bg-[var(--block-primary)] text-white rounded-lg"
//                         onClick={() => {
//                             const w = window.open();
//                             w.document.write(`<pre>${JSON.stringify(userDetails, null, 2)}</pre>`);
//                             w.document.close();
//                         }}
//                     >
//                         View Raw JSON
//                     </button>
//                 </div>
//             </div>
//         </form>
//     </div>
// );
// }


















'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../providers/authProvider';

export default function UserDetailsPage() {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const router = useRouter();

  const [userDetails, setUserDetails] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  // redirect if not logged in
  useEffect(() => {
    if (!loading && !user) router.push('/auth/login');
  }, [loading, user, router]);

  // fetch user details
  useEffect(() => {
    if (!id || !user) return;

    const fetchUserDetails = async () => {
      setLoadingData(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) console.error('User details fetch error:', error);
      else setUserDetails(data);

      setLoadingData(false);
    };

    fetchUserDetails();
  }, [id, user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoadingData(true);

    const updatePayload = {
      email: userDetails.email,
      first_name: userDetails.first_name,
      last_name: userDetails.last_name,
      credits: Number(userDetails.credits) || 0,
      verified: !!userDetails.verified,
      is_admin: !!userDetails.is_admin,
      user_type: userDetails.user_type,
    };

    const { data, error } = await supabase
      .from('profiles')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Update error:', error);
      alert('Failed to update user. Check console.');
    } else {
      setUserDetails(data);
      alert('User updated successfully.');
    }

    setLoadingData(false);
  };

  if (loading || loadingData)
    return <p className="text-center mt-10 text-[var(--text-primary)]">Loading...</p>;

  if (!userDetails)
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold text-[var(--danger-color)]">User not found.</h2>
        <button
          onClick={() => router.push('/dashboard')}
          className="mt-4 px-4 py-2 bg-[var(--block-primary)] text-white rounded-lg hover:opacity-90 transition"
        >
          Back to Dashboard
        </button>
      </div>
    );

  const {
    email,
    first_name,
    last_name,
    credits,
    verified,
    is_admin,
    user_type,
    created_at,
  } = userDetails;

  return (
    <div className="container mx-auto mt-10 px-4 mb-20">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">User Detail / Edit</h1>
        <button
          onClick={() => router.push('/admin/users')}
          className="px-4 py-2 bg-[var(--block-secondary)] text-white rounded-lg hover:opacity-90 transition"
        >
          Back to Users
        </button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Editable form */}
        <div className="col-span-2 bg-[var(--block-secondary)] p-6 rounded-xl shadow-lg space-y-4">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Edit Info</h2>

          <InputField
            label="First Name"
            value={first_name}
            onChange={(val) => setUserDetails({ ...userDetails, first_name: val })}
            disabled={loadingData}
          />
          <InputField
            label="Last Name"
            value={last_name}
            onChange={(val) => setUserDetails({ ...userDetails, last_name: val })}
            disabled={loadingData}
          />
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(val) => setUserDetails({ ...userDetails, email: val })}
            disabled={true}
            // disabled={loadingData}
          />
          <InputField
            label="Credits"
            type="number"
            value={credits ?? 0}
            onChange={(val) =>
              setUserDetails({ ...userDetails, credits: val === '' ? '' : Number(val) })
            }
            disabled={loadingData}
          />

          <div className="flex gap-4">
            <CheckboxField
              label="Verified"
              checked={verified}
              onChange={(val) => setUserDetails({ ...userDetails, verified: val })}
              disabled={loadingData}
            />
            <CheckboxField
              label="Admin"
              checked={is_admin}
              onChange={(val) => setUserDetails({ ...userDetails, is_admin: val })}
              disabled={loadingData}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">User Type</label>
            <select
                value={user_type || 'user'}
                onChange={(e) => setUserDetails({ ...userDetails, user_type: e.target.value })}
                className="w-full px-3 py-2 rounded border bg-[var(--block-secondary)] text-[var(--white)] focus:outline-none focus:ring-2 focus:ring-[var(--block-primary)]"
                disabled={loadingData}
                >
                <option value="user">User</option>
                <option value="counsellor">Counsellor</option>
                <option value="admin">Admin</option>
            </select>
          </div>

          <InputField
            label="Created At"
            value={created_at ? new Date(created_at).toLocaleString() : 'N/A'}
            readOnly
          />

          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-[var(--block-primary)] text-white rounded-lg hover:opacity-90 transition"
              disabled={loadingData}
            >
              {loadingData ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={() => {
                setLoadingData(true);
                supabase
                  .from('profiles')
                  .select('*')
                  .eq('id', id)
                  .single()
                  .then(({ data, error }) => {
                    if (!error) setUserDetails(data);
                  })
                  .finally(() => setLoadingData(false));
              }}
              className="px-4 py-2 border border-[var(--border-primary)] rounded-lg hover:bg-[var(--block-primary)] hover:text-white transition"
              disabled={loadingData}
            >
              Revert
            </button>
          </div>
        </div>

        {/* Right column: Info panel */}
        <div className="col-span-1 bg-[var(--block-secondary)] p-6 rounded-xl shadow-lg space-y-6">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">User Info</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoField label="ID" value={userDetails.id} />
            <InfoField label="Status" value={verified ? 'Verified' : 'Unverified'} status={verified} />
            <InfoField label="Role" value={is_admin ? 'Admin' : user_type || 'User'} />
            <InfoField label="Credits" value={credits ?? 0} />
            <InfoField label="Email" value={email} />
          </div>

          <button
            type="button"
            className="px-4 py-2 bg-[var(--block-primary)] text-white rounded-lg hover:opacity-90 transition"
            onClick={() => {
              const w = window.open();
              w.document.write(`<pre>${JSON.stringify(userDetails, null, 2)}</pre>`);
              w.document.close();
            }}
          >
            View Raw JSON
          </button>
        </div>
      </form>
    </div>
  );
}

// --- Helper Components for cleaner code ---
function InputField({ label, value, onChange, type = 'text', disabled = false, readOnly = false }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        className="w-full px-3 py-2 rounded border bg-[var(--background)] text-[var(--foreground)]"
        disabled={disabled}
        readOnly={readOnly}
      />
    </div>
  );
}

function CheckboxField({ label, checked, onChange, disabled }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange && onChange(e.target.checked)}
        disabled={disabled}
        className="accent-[var(--block-primary)]"
      />
      {label}
    </label>
  );
}

function InfoField({ label, value, status }) {
  const textColor = status === true ? 'text-[var(--success-color)]' : status === false ? 'text-yellow-600' : '';
  return (
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className={`font-medium break-all ${textColor}`}>{value}</p>
    </div>
  );
}
