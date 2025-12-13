
import React, { useState, useRef } from 'react';
import { Share2, Heart } from 'lucide-react';
import FadeSection from './components/FadeSection';
import BreathingExercise from './components/BreathingExercise';
import DynamicFiller from './components/DynamicFiller';
import UnclenchSection from './components/UnclenchSection';
import ShoulderSection from './components/ShoulderSection';
import MomentSection from './components/MomentSection';
import DictionaryHero from './components/DictionaryHero';
import ScrollIndicator from './components/ScrollIndicator';
import TutorialScreen from './components/TutorialScreen';
import { PROMPTS } from './constants';

const App: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showCopied, setShowCopied] = useState(false);
  const [copied, setCopied] = useState(false);

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
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  // 1. Landing Screen
  if (!hasStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-paper px-6 text-center transition-opacity duration-1000">
        
        {/* Intro Context */}
        <div className="max-w-xl animate-fade-in mb-16 md:mb-20 space-y-6">
          <p className="font-serif text-sm md:text-base tracking-widest text-stone-400 uppercase">
            A gentle reminder
          </p>
          <p className="font-serif text-lg md:text-xl text-stone-500 leading-relaxed">
            This is a quiet space created for you.<br className="hidden md:block"/> 
            Take 3 minutes to pause, breathe, and reset.
          </p>
        </div>

        {/* Check-in Question */}
        <h1 className="font-serif text-4xl md:text-6xl text-stone-800 mb-12 leading-tight animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Did today feel a little<br /><span className="italic text-stone-500">heavy?</span>
        </h1>

        {/* Actions */}
        <div className="flex flex-col items-center gap-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          
          <button
            onClick={() => setHasStarted(true)}
            className="group relative px-16 py-4 rounded-full bg-transparent border border-stone-300 text-stone-600 transition-all duration-700 hover:border-stone-400 hover:bg-stone-50 hover:text-stone-800 hover:shadow-lg hover:shadow-stone-200/50"
          >
            <span className="font-serif text-2xl relative z-10">Yes</span>
          </button>

          <button
             onClick={() => setHasStarted(true)}
             className="text-stone-400 text-xs hover:text-stone-600 transition-all duration-500 tracking-widest uppercase border-b border-transparent hover:border-stone-300 pb-1"
          >
            No, just checking in
          </button>
        </div>
      </div>
    );
  }

  // 2. Tutorial Screen (Show after starting, before main app)
  if (hasStarted && !hasSeenTutorial) {
    return <TutorialScreen onComplete={() => setHasSeenTutorial(true)} />;
  }

  // 3. Main Application
  return (
    <div className="bg-paper text-stone-900 h-screen w-full overflow-hidden transition-opacity duration-1000 opacity-100">
      
      {/* Main Scroll Container with Snapping */}
      <main
        ref={scrollContainerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
        style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
      >
        
        {/* Dictionary Hero Section - Includes its own internal ScrollIndicator */}
        <DictionaryHero />

        {/* Narrative Flow */}
        <section className="h-screen w-full flex flex-col items-center justify-center gap-6 snap-center shrink-0 relative">
            <FadeSection>
              <p className="font-serif text-4xl md:text-6xl text-stone-700 text-center leading-snug">
                The weight might feel
              </p>
            </FadeSection>
            <FadeSection delay={400}>
              <p className="font-serif text-4xl md:text-6xl text-stone-500 italic text-center leading-snug">
                heavy right now
              </p>
            </FadeSection>
            <ScrollIndicator delay={2500} />
        </section>
          
        <section className="h-screen w-full flex flex-col items-center justify-center gap-6 snap-center shrink-0 relative">
            <FadeSection>
              <p className="font-serif text-4xl md:text-6xl text-stone-700 text-center leading-snug">
                 Like everything is asking
              </p>
            </FadeSection>
            <FadeSection delay={400}>
              <p className="font-serif text-4xl md:text-6xl text-stone-500 italic text-center leading-snug">
                 too much of you
              </p>
            </FadeSection>
            <ScrollIndicator delay={2500} />
        </section>

          {/* Dynamic Prompts */}
          {PROMPTS.map((prompt, index) => {
            if (prompt === "Take a moment") {
               return (
                 <div key={index} className="relative">
                   <MomentSection />
                   <ScrollIndicator delay={2500} />
                 </div>
               );
            }
            if (prompt === "Unclench your jaw") {
              return (
                <div key={index} className="relative">
                  <UnclenchSection />
                  <ScrollIndicator delay={2500} />
                </div>
              );
            }
            if (prompt === "Drop your shoulders") {
              return (
                <div key={index} className="relative">
                  <ShoulderSection />
                  <ScrollIndicator delay={2500} />
                </div>
              );
            }
            return (
              <section key={index} className="h-screen w-full flex items-center justify-center snap-center shrink-0 relative">
                <FadeSection>
                  <p className="font-serif text-3xl md:text-5xl text-stone-600 italic text-center">
                    {prompt}
                  </p>
                </FadeSection>
                <ScrollIndicator delay={2500} />
              </section>
            );
          })}

        {/* Dynamic Action Filler */}
        <section className="h-screen w-full flex items-center justify-center snap-center shrink-0 relative">
          <FadeSection className="w-full">
            <DynamicFiller />
          </FadeSection>
          <ScrollIndicator delay={6000} />
        </section>
        
        {/* Breathing Intro Section */}
        <section className="h-screen w-full flex flex-col items-center justify-center gap-8 px-6 snap-center shrink-0 text-center relative">
          <FadeSection>
             <p className="font-serif text-4xl md:text-6xl text-stone-700 leading-snug mb-4">
               Let's take a break <br/> and reset together
             </p>
          </FadeSection>
          
          <FadeSection delay={400}>
             <div className="flex flex-col items-center gap-4">
               <p className="font-serif text-xl md:text-2xl text-stone-500 max-w-xl leading-relaxed">
                 Next, we will do a breathing exercise
               </p>
               <div className="flex gap-3 text-stone-400 font-sans text-xs tracking-widest uppercase mt-4">
                 <span>4s In</span>
                 <span>•</span>
                 <span>4s Hold</span>
                 <span>•</span>
                 <span>4s Out</span>
                 <span>•</span>
                 <span>4s Hold</span>
               </div>
             </div>
          </FadeSection>
          <ScrollIndicator delay={2500} />
        </section>

        {/* Breathing Exercise Break */}
        <section className="h-screen w-full flex items-center justify-center py-20 snap-center shrink-0 relative">
          <FadeSection className="w-full max-w-2xl">
            <div className="mx-6">
               <BreathingExercise />
            </div>
          </FadeSection>
          <ScrollIndicator delay={30000} />
        </section>

        {/* Post-Breathing Reassurance */}
        <section className="h-screen w-full flex flex-col items-center justify-center gap-6 snap-center shrink-0 relative">
            <FadeSection>
              <p className="font-serif text-4xl md:text-6xl text-stone-700 text-center leading-snug">
                The world can wait
              </p>
            </FadeSection>
            <FadeSection delay={400}>
              <p className="font-serif text-4xl md:text-6xl text-stone-400 italic text-center leading-snug">
                for a few minutes
              </p>
            </FadeSection>
            <ScrollIndicator delay={2500} />
        </section>

        <section className="h-screen w-full flex flex-col items-center justify-center gap-6 snap-center shrink-0 relative">
            <FadeSection>
              <p className="font-serif text-4xl md:text-6xl text-stone-700 text-center leading-snug">
                You did it.
              </p>
            </FadeSection>
            <ScrollIndicator delay={2500} />
        </section>

        <section className="h-screen w-full flex flex-col items-center justify-center gap-6 snap-center shrink-0 relative">
            <FadeSection>
              <p className="font-serif text-4xl md:text-6xl text-stone-700 text-center leading-snug">
                Your only job right now
              </p>
            </FadeSection>
            <FadeSection delay={400}>
              <p className="font-serif text-4xl md:text-6xl text-stone-700 text-center leading-snug">
                 is to just <span className="italic text-stone-400">be</span>
              </p>
            </FadeSection>
        </section>

        {/* Closing / Next Steps */}
        <section className="h-screen w-full flex flex-col items-center justify-center snap-center shrink-0 px-6 relative">
          <FadeSection>
            <div className="max-w-2xl text-center space-y-12">
              
              {/* Main Heading */}
              <h2 className="font-serif text-4xl md:text-6xl text-stone-800 leading-tight mb-8">
                Come back whenever<br/>you need this
              </h2>
              
              {/* Content Section */}
              <div className="space-y-8 text-stone-600 font-serif text-lg md:text-xl leading-relaxed">
                
                {/* Bookmark Message */}
                <p>
                  Bookmark this page for rough days
                </p>
                
                {/* Sharing Message */}
                <div className="pt-4 pb-4 space-y-4">
                  <p className="text-stone-700">
                    Sometimes we can't find<br/>the right words to help someone
                  </p>
                  <p className="text-stone-500 italic">
                    When you can't find the words,<br/>send them this instead
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  
                  {/* Copy Link Button */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="px-6 py-3 rounded-full border border-stone-300 text-stone-600 font-serif text-base transition-all duration-700 hover:border-stone-400 hover:bg-stone-50"
                  >
                    {copied ? 'Link copied' : 'Copy link'}
                  </button>
                  
                  {/* Share Button */}
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: 'A gentle reminder',
                          text: 'For when you need a moment',
                          url: window.location.href
                        });
                      }
                    }}
                    className="px-6 py-3 rounded-full border border-stone-300 text-stone-600 font-serif text-base transition-all duration-700 hover:border-stone-400 hover:bg-stone-50"
                  >
                    Share
                  </button>
                </div>
              </div>

              {/* Start Over Link */}
              <div className="pt-4 border-t border-stone-200 mt-12">
                <button
                  onClick={() => {
                    setHasStarted(false);
                    setHasSeenTutorial(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-stone-400 text-sm hover:text-stone-600 transition-all duration-500 tracking-widest uppercase border-b border-transparent hover:border-stone-300 pb-1"
                >
                  Start over
                </button>
              </div>

              {/* Creator Credit */}
              <div className="pt-8 mt-4">
                <a
                  href="https://eliason.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-400 text-xs hover:text-stone-600 transition-all duration-500 font-serif italic"
                >
                  If the weight feels different tomorrow, I'm here to help — Martin
                </a>
              </div>

            </div>
          </FadeSection>
        </section>

      </main>
    </div>
  );
};

export default App;
