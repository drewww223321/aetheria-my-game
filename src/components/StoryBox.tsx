import { motion, AnimatePresence } from 'motion/react';
import { Choice } from '../types';

interface StoryBoxProps {
  dialogue: string;
  choices: Choice[];
  onChoice: (choice: Choice) => void;
  isFinished: boolean;
  onNext: () => void;
  currentName?: string;
}

export default function StoryBox({ dialogue, choices, onChoice, isFinished, onNext, currentName }: StoryBoxProps) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={dialogue}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="glass-panel p-8 min-h-[160px] relative cursor-pointer"
          onClick={() => !isFinished && onNext()}
        >
          {currentName && (
            <div className="absolute -top-6 left-6 px-6 py-2 glass-panel !rounded-full text-sm font-bold text-celestial-glow uppercase tracking-widest border-purple-500/50">
              {currentName}
            </div>
          )}
          
          <div className="text-xl font-serif leading-relaxed text-white/90">
            {dialogue}
          </div>

          {!isFinished && (
            <motion.div 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-4 right-6 text-xs uppercase tracking-tighter opacity-50"
            >
              Click to continue...
            </motion.div>
          )}

          {isFinished && choices.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 flex flex-col gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              {choices.map((choice, i) => (
                <motion.button
                  key={choice.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => onChoice(choice)}
                  className="w-full text-left p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-celestial-glow/20 hover:border-celestial-glow/50 transition-all group flex items-center justify-between"
                >
                  <span className="font-sans text-sm font-medium tracking-wide">{choice.text}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-celestial-glow">✦</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
