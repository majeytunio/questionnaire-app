// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import { supabase } from '../../../lib/supabase';
// import { useAuth } from '../../../providers/authProvider';

// export default function AssessmentDetailPage() {
//   const { id } = useParams();
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   const [assessment, setAssessment] = useState(null);
//   const [loadingData, setLoadingData] = useState(true);

//   // Redirect if NOT logged in
//   useEffect(() => {
//     if (!loading && !user) {
//       router.push('/login');
//     }
//   }, [loading, user]);

//   // Fetch assessment
//   useEffect(() => {
//     if (!id || !user) return;

//     const fetchAssessment = async () => {
//       setLoadingData(true);

//       const { data, error } = await supabase
//         .from('assessments')
//         .select('*')
//         .eq('id', id)
//         .single();

//       if (error) {
//         console.error('Assessment fetch error:', error);
//       } else {
//         setAssessment(data);
//       }

//       setLoadingData(false);
//     };

//     fetchAssessment();
//   }, [id, user]);

//   if (loading || loadingData) {
//     return <p className="text-center mt-10">Loading...</p>;
//   }

//   if (!assessment) {
//     return (
//       <div className="p-10 text-center">
//         <h2 className="text-xl font-bold">Assessment not found.</h2>
//         <button
//           onClick={() => router.push('/dashboard')}
//           className="mt-4 px-4 py-2 bg-[var(--block-primary)] text-white rounded-lg"
//         >
//           Back to Dashboard
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto mt-10">
//       <h1 className="text-3xl font-bold mb-5">Assessment Detail</h1>

//       <div className="bg-[var(--block-secondary)] shadow-md p-6 rounded-xl">
//         <p><strong>ID:</strong> {assessment.id}</p>
//         <p><strong>User:</strong> {assessment.user_id}</p>
//         <p><strong>Question Index:</strong> {assessment.question_index}</p>

//         {assessment.created_at && (
//           <p><strong>Date:</strong> {new Date(assessment.created_at).toLocaleString()}</p>
//         )}

//         {assessment.score && (
//           <p><strong>Score:</strong> {assessment.score}</p>
//         )}
//       </div>

//       <button
//         onClick={() => router.push('/dashboard')}
//         className="mt-6 px-5 py-2 bg-[var(--block-primary)] text-white rounded-lg"
//       >
//         Back to Dashboard
//       </button>
//     </div>
//   );
// }












// app/dashboard/assessment/[id]/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../providers/authProvider';

export default function AssessmentDetailPage() {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const router = useRouter();

  const [assessment, setAssessment] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  // redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [loading, user, router]);

  // fetch assessment
  useEffect(() => {
    if (!id || !user) return;

    const fetchAssessment = async () => {
      setLoadingData(true);
      const { data, error } = await supabase
        .from('assessments')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Assessment fetch error:', error);
      } else {
        setAssessment(data);
      }

      setLoadingData(false);
    };

    fetchAssessment();
  }, [id, user]);

  if (loading || loadingData) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!assessment) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold">Assessment not found.</h2>
        <button
          onClick={() => router.push('/dashboard')}
          className="mt-4 px-4 py-2 bg-[var(--block-primary)] text-white rounded-lg"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const { messages = [], responses = {}, updated_at, completed, user_id } = assessment;

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Assessment Detail</h1>
        <div>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 bg-[var(--block-primary)] text-white rounded-lg"
          >
            Back
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Summary Card */}
        <div className="col-span-1 bg-[var(--block-secondary)] p-5 rounded-xl shadow">
          {/* <p><strong>ID: </strong> {assessment.id}</p>
          <p><strong>User: </strong> {user_id}</p> */}
          <p><strong>Completed: </strong> 
          <span  className={completed === true ? 'text-[var(--success-color)]' : 'danger-color'}>
            {completed === true ? 'Yes' : 'Partial'}
          </span>
          </p>
          <p><strong>Updated At: </strong> {new Date(updated_at).toLocaleString()}</p>
          {assessment.score !== undefined && <p><strong>Score:</strong> {assessment.score}</p>}
          <p><strong>Language: </strong> {assessment.language || 'N/A'}</p>
          <div className="mt-4">
            <button
              className="w-full py-2 rounded-lg bg-[var(--block-primary)] text-white"
              onClick={() => {
                // open printable JSON for quick export
                const w = window.open();
                w.document.write(`<pre>${JSON.stringify(assessment, null, 2)}</pre>`);
                w.document.close();
              }}
            >
              View Raw JSON
            </button>
          </div>
        </div>

        {/* Messages / Chat */}
        <div className="col-span-1 lg:col-span-2">
          <div className="bg-[var(--block-secondary)] p-5 rounded-xl shadow mb-6">
            <h2 className="text-xl font-semibold mb-3">Chat Transcript</h2>
            <div className="space-y-3 max-h-[40vh] overflow-auto">
              {messages.length === 0 && <p className="text-[var(--text-secondary)]">No messages</p>}
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg ${m.sender === 'bot' ? 'bg-[var(--gray-dark)]' : 'bg-[var(--block-secondary)]'}`}
                >
                  <div className="text-xs text-[var(--text-secondary)] mb-1 uppercase">{m.sender}</div>
                  <div className="whitespace-pre-wrap">{m.text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Responses grouped by category */}
          <div className="bg-[var(--block-secondary)] p-5 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-3">Responses</h2>

            {Object.keys(responses).length === 0 && <p className="text-[var(--text-secondary)]">No structured responses</p>}

            <div className="space-y-4">
              {Object.entries(responses).map(([category, answers]) => (
                <div key={category} className="border rounded-lg p-4 bg-[var(--block-secondary)]">
                  <h3 className="font-bold mb-2 text-[var(--text-primary)]">{category}</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.entries(answers).map(([q, a]) => (
                      <div key={q} className="p-2 rounded-md bg-[var(--gray-dark)]">
                        <div className="text-sm font-semibold">{q}</div>
                        <div className="text-[var(--text-secondary)] mt-1">{a}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Optional extra: show full JSON at bottom */}
      <div className="mt-6 bg-[var(--block-secondary)] p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Full Record (JSON)</h3>
        <pre className="max-h-48 overflow-auto text-xs p-2 bg-[var(--block-secondary)] rounded">{JSON.stringify(assessment, null, 2)}</pre>
      </div>
    </div>
  );
}
