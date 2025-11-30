import React, { useState } from 'react';
import { Share2, Heart, ArrowDown } from 'lucide-react';
import FadeSection from './components/FadeSection';
import BreathingExercise from './components/BreathingExercise';
import DynamicFiller from './components/DynamicFiller';
import ScrollProgress from './components/ScrollProgress';
import UnclenchSection from './components/UnclenchSection';
import { PROMPTS } from './constants';

const App: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'You Will Be Fine',
          text: 'A little gentle reminder for you.',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard to share with a friend.");
    }
  };

  if (!hasStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-paper px-6 text-center transition-opacity duration-1000">
        <h1 className="font-serif text-5xl md:text-7xl text-stone-800 mb-16 leading-tight animate-fade-in">
          Did today feel a little<br /><span className="italic text-stone-500">rougher?</span>
        </h1>
        <div className="flex flex-col gap-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <button
            onClick={() => setHasStarted(true)}
            className="px-12 py-5 bg-stone-800 text-stone-50 rounded-full font-sans text-sm tracking-[0.2em] uppercase hover:bg-stone-700 hover:scale-105 transition-all duration-500 shadow-xl shadow-stone-200/50"
          >
            Yes, it did
          </button>
          <button
             onClick={() => setHasStarted(true)}
             className="text-stone-400 text-xs hover:text-stone-600 transition-colors tracking-widest uppercase border-b border-transparent hover:border-stone-300 pb-1"
          >
            No, just checking in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-paper overflow-x-hidden selection:bg-stone-200 selection:text-stone-900 pb-32 transition-opacity duration-1000 opacity-100">
      <ScrollProgress />
      
      <main className="max-w-4xl mx-auto px-6">
        
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center relative">
          <div className="flex flex-col items-center gap-4">
            <FadeSection>
              <h1 className="font-serif text-6xl md:text-9xl text-stone-800 text-center leading-tight">
                You will be
              </h1>
            </FadeSection>
            <FadeSection delay={400}>
               <span className="font-serif text-6xl md:text-9xl italic text-stone-400">fine.</span>
            </FadeSection>
          </div>
          
          <div className="absolute bottom-12 text-stone-300 animate-bounce duration-[3000ms]">
            <ArrowDown size={24} />
          </div>
        </section>

        {/* Narrative Flow */}
        <div className="flex flex-col">
          
          <section className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
            <FadeSection>
              <p className="font-serif text-4xl md:text-6xl text-stone-700 text-center leading-snug">
                The weight might feel
              </p>
            </FadeSection>
            <FadeSection delay={300}>
              <p className="font-serif text-4xl md:text-6xl text-stone-500 italic text-center leading-snug">
                heavy right now.
              </p>
            </FadeSection>
          </section>
          
          <section className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
            <FadeSection>
              <p className="font-serif text-4xl md:text-6xl text-stone-700 text-center leading-snug">
                 Like everything is asking
              </p>
            </FadeSection>
            <FadeSection delay={300}>
              <p className="font-serif text-4xl md:text-6xl text-stone-500 italic text-center leading-snug">
                 too much of you.
              </p>
            </FadeSection>
          </section>

          {/* Dynamic Prompts */}
          {PROMPTS.map((prompt, index) => {
            if (prompt === "Unclench your jaw.") {
              return <UnclenchSection key={index} />;
            }
            return (
              <section key={index} className="min-h-[50vh] flex items-center justify-center">
                <FadeSection>
                  <p className="font-serif text-3xl md:text-5xl text-stone-600 italic text-center">
                    {prompt}
                  </p>
                </FadeSection>
              </section>
            );
          })}
        </div>

        {/* Dynamic Action Filler */}
        <section className="min-h-[80vh] flex items-center justify-center">
          <FadeSection className="w-full">
            <DynamicFiller />
          </FadeSection>
        </section>

        {/* Breathing Exercise Break */}
        <section className="min-h-screen flex items-center justify-center py-20">
          <FadeSection className="w-full max-w-2xl">
            <div className="bg-white/40 border border-stone-100 rounded-3xl p-12 md:p-20 shadow-sm backdrop-blur-sm transition-transform hover:scale-[1.01] duration-1000">
               <h2 className="text-center font-sans text-xs uppercase tracking-[0.25em] text-stone-400 mb-12">
                 Let's reset together
               </h2>
               <BreathingExercise />
            </div>
          </FadeSection>
        </section>

        {/* Post-Breathing Reassurance */}
        <div className="flex flex-col">
          <section className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
            <FadeSection>
              <p className="font-serif text-4xl md:text-6xl text-stone-700 text-center leading-snug">
                The world can wait
              </p>
            </FadeSection>
            <FadeSection delay={300}>
              <p className="font-serif text-4xl md:text-6xl text-stone-400 italic text-center leading-snug">
                for a few minutes. 
              </p>
            </FadeSection>
          </section>

          <section className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
            <FadeSection>
              <p className="font-serif text-4xl md:text-6xl text-stone-700 text-center leading-snug">
                Your only job right now
              </p>
            </FadeSection>
            <FadeSection delay={300}>
              <p className="font-serif text-4xl md:text-6xl text-stone-700 text-center leading-snug">
                 is to just <span className="italic text-stone-400">be</span>.
              </p>
            </FadeSection>
          </section>
        </div>

        {/* Footer / CTA */}
        <FadeSection className="mt-32">
          <footer className="flex flex-col items-center gap-12">
            <button
              onClick={handleShare}
              className="group flex items-center gap-3 px-8 py-4 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-full transition-all duration-700 text-sm tracking-widest uppercase"
            >
              <Share2 size={16} className="text-stone-400 group-hover:scale-110 transition-transform duration-500" />
              Send to a friend
            </button>
            
            <div className="text-stone-300 text-xs flex items-center gap-2 font-sans tracking-widest opacity-60">
              Made with <Heart size={10} fill="currentColor" /> for rough days
            </div>
          </footer>
        </FadeSection>

      </main>
    </div>
  );
};

export default App;