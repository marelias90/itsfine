
import React, { useState } from 'react';
import { Share2, Heart } from 'lucide-react';
import FadeSection from './components/FadeSection';
import BreathingExercise from './components/BreathingExercise';
import DynamicFiller from './components/DynamicFiller';
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
      // Fallback for desktop: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard to share with a friend.");
    }
  };

  if (!hasStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-paper px-4 text-center">
        <h1 className="font-serif text-4xl md:text-6xl text-stone-800 mb-12 leading-tight">
          Did today feel a little<br /><span className="italic text-stone-500">rougher?</span>
        </h1>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setHasStarted(true)}
            className="px-12 py-4 bg-stone-800 text-white rounded-full font-sans text-sm tracking-widest uppercase hover:bg-stone-700 transition-all transform hover:scale-105 shadow-lg shadow-stone-200"
          >
            Yes, it did
          </button>
          <button
             onClick={() => setHasStarted(true)}
             className="text-stone-400 text-sm hover:text-stone-600 transition-colors"
          >
            No, just checking in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper overflow-x-hidden selection:bg-stone-200 selection:text-stone-900">
      <main className="max-w-3xl mx-auto px-6 py-24 md:py-32 flex flex-col gap-32">
        
        {/* Intro */}
        <FadeSection>
          <h1 className="font-serif text-5xl md:text-7xl text-stone-800 text-center leading-tight">
            You will be <br/><span className="italic text-stone-500">fine.</span>
          </h1>
        </FadeSection>

        {/* Narrative Flow */}
        <FadeSection className="max-w-xl mx-auto text-center space-y-6">
          <p className="font-serif text-xl md:text-2xl text-stone-600 leading-relaxed">
            The weight might feel heavy right now.
          </p>
          <p className="font-serif text-xl md:text-2xl text-stone-600 leading-relaxed">
             Like everything is asking too much of you.
          </p>
        </FadeSection>

        {/* Dynamic Prompts */}
        <div className="space-y-32">
          {PROMPTS.map((prompt, index) => (
            <FadeSection key={index}>
              <div className="text-center">
                <p className="font-serif text-3xl md:text-4xl text-stone-700 italic">
                  {prompt}
                </p>
              </div>
            </FadeSection>
          ))}
        </div>

        {/* Dynamic Action Filler */}
        <FadeSection>
          <DynamicFiller />
        </FadeSection>

        {/* Breathing Exercise Break */}
        <FadeSection>
          <div className="bg-white/50 border border-stone-200 rounded-lg p-8 md:p-12 shadow-sm backdrop-blur-sm">
             <h2 className="text-center font-sans text-xs uppercase tracking-widest text-stone-400 mb-8">
               Let's reset together
             </h2>
             <BreathingExercise />
          </div>
        </FadeSection>

        {/* Post-Breathing Reassurance */}
        <FadeSection className="text-center space-y-6 max-w-xl mx-auto">
          <p className="font-serif text-xl md:text-2xl text-stone-600 leading-relaxed">
            The world can wait for a few minutes. 
          </p>
          <p className="font-serif text-xl md:text-2xl text-stone-600 leading-relaxed">
            Your only job right now is to just <i>be</i>.
          </p>
        </FadeSection>

        {/* Footer / CTA */}
        <footer className="pt-20 pb-12 flex flex-col items-center gap-8 border-t border-stone-200/50">
          <button
            onClick={handleShare}
            className="group flex items-center gap-2 px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-full transition-all text-sm tracking-wide"
          >
            <Share2 size={16} className="group-hover:scale-110 transition-transform" />
            Send to a friend who needs this
          </button>
          
          <div className="text-stone-300 text-xs flex items-center gap-1 mt-8">
            Made with <Heart size={10} fill="currentColor" /> for rough days
          </div>
        </footer>

      </main>
    </div>
  );
};

export default App;
