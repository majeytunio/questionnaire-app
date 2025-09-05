// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lcuovwsehoafnfbfjglb.supabase.co';
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjdW92d3NlaG9hZm5mYmZqZ2xiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0MjMzNTAsImV4cCI6MjA2OTk5OTM1MH0.e5FJwJqNPLDyLphL7tn5Jco3QL86y-k4gkWpEMNCYvU';

// export const supabase = createClient(supabaseUrl, supabaseKey);






import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://njbaxugtzignbosbkmzw.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qYmF4dWd0emlnbmJvc2JrbXp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0MTQzMTgsImV4cCI6MjA3MDk5MDMxOH0.uqOFshRn-ZfasbF_vOKaIQ8CHvT9zWuUB1csB85r_6g';

// ✅ FIX: Add auth options to persist session on client side
export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        redirectTo: 'http://localhost:8000/auth/callback'
    },
});
