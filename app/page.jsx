'use client'

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useAuth } from './providers/authProvider';

export default function Home() {
  const { user, loading } = useAuth();

  return (
    <>
      <Navbar currentUser={user} />
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-12">
        
        <section className='justify-center max-w-6xl center-items mx-auto'>

          {/* Hero Section */}
          <h1 className="text-4xl text-[var(--text-primary)] sm:text-5xl font-bold tracking-tight text-center">
            AI Questionnaire Platform
          </h1>
          <p className="text-lg text-[var(--white)] mt-2 text-center">
            Create, share, and analyze AI-powered questionnaires in minutes. 
            Let artificial intelligence do the heavy lifting while you focus on insights.
          </p>

          {/* Call to Action */}
          <div className="flex justify-center gap-4 mt-8">
            <a
              href="#get-started"
              className="px-6 py-3 rounded-2xl bg-[var(--button-primary)] text-white font-medium hover:bg-[var(--button-secondary)] transition"
            >
              Get Started
            </a>
            <a
              href="#learn-more"
              className="px-6 py-3 rounded-2xl border border-[var(--border-secondary)] text-[var(--white)] hover:text-[var(--text-primary)] hover:bg-[var(--white)] transition"
            >
              Learn More
            </a>
          </div>

          {/* Feature Highlight */}
          <section className="mt-12 grid sm:grid-cols-3 gap-8 text-gray-700">
            <div className="p-6 rounded-2xl shadow bg-[var(--block-secondary)] text-white">
              <h3 className="text-xl font-semibold">Smart Surveys</h3>
              <p className="mt-2 text-sm">
                Build dynamic questionnaires that adapt to user responses.
              </p>
            </div>

            <div className="p-6 rounded-2xl shadow bg-[var(--block-secondary)] text-white">
              <h3 className="text-xl font-semibold">Instant Insights</h3>
              <p className="mt-2 text-sm">
                AI analyzes responses and gives you actionable results instantly.
              </p>
            </div>
            <div className="p-6 rounded-2xl shadow bg-[var(--block-secondary)] text-white">
              <h3 className="text-xl font-semibold">Seamless Sharing</h3>
              <p className="mt-2 text-sm">
                Share questionnaires with a link and track responses in real time.
              </p>
            </div>
          </section>

        </section>



      </main>
      <Footer currentUser={user} />
    </>
  );
}
