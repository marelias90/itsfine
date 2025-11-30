import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { generateComfortingNote } from '../services/geminiService';

const PersonalNote: React.FC = () => {
  const [feeling, setFeeling] = useState('');
  const [note, setNote] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    const generatedNote = await generateComfortingNote(feeling);
    setNote(generatedNote);
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-20 p-8 border border-stone-200 bg-white shadow-sm rounded-sm">
      <h3 className="font-serif text-2xl text-stone-800 mb-6 text-center italic">
        A note for you
      </h3>
      
      {!note ? (
        <div className="space-y-4">
           <label className="block text-stone-500 text-sm font-sans mb-2 text-center">
             How are you feeling right now? (Optional)
           </label>
           <input
             type="text"
             value={feeling}
             onChange={(e) => setFeeling(e.target.value)}
             placeholder="e.g., overwhelmed, tired, anxious..."
             className="w-full bg-stone-50 border-b border-stone-300 p-3 text-center text-stone-700 focus:outline-none focus:border-stone-500 font-serif placeholder:text-stone-300 transition-colors"
           />
           <button
             onClick={handleGenerate}
             disabled={isLoading}
             className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-stone-800 text-stone-50 rounded hover:bg-stone-700 transition-all disabled:opacity-50 text-sm tracking-wide uppercase"
           >
             {isLoading ? (
               <Sparkles size={16} className="animate-pulse" />
             ) : (
               <>
                 Receive Message <Send size={14} />
               </>
             )}
           </button>
        </div>
      ) : (
        <div className="animate-fade-in text-center space-y-6">
          <p className="font-serif text-xl leading-relaxed text-stone-700">
            "{note}"
          </p>
          <button
            onClick={() => { setNote(null); setFeeling(''); }}
            className="text-stone-400 hover:text-stone-600 text-xs uppercase tracking-widest border-b border-transparent hover:border-stone-400 transition-all pb-1"
          >
            Ask for another
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonalNote;
