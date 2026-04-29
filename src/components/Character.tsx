import { motion, AnimatePresence } from 'motion/react';
import { CharacterConfig } from '../types';

interface CharacterProps {
  config: CharacterConfig;
  isActive: boolean;
  key?: string;
}

export default function Character({ config, isActive }: CharacterProps) {
  const positions = {
    left: 'left-[15%]',
    center: 'left-1/2 -translate-x-1/2',
    right: 'right-[15%]'
  };

  return (
    <AnimatePresence>
      <motion.div
        key={config.id}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ 
          opacity: isActive ? 1 : 0.6, 
          y: isActive ? 0 : 20,
          scale: isActive ? 1 : 0.98,
          filter: isActive ? 'brightness(1)' : 'brightness(0.5) blur(2px)'
        }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ type: 'spring', damping: 25, stiffness: 120 }}
        className={`absolute bottom-0 w-[400px] h-[600px] pointer-events-none z-10 ${positions[config.position]}`}
      >
        <motion.div
          animate={isActive ? {
            y: [0, -8, 0],
            rotate: [0, 0.5, -0.5, 0],
          } : {}}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-full h-full"
        >
          <img
            src={config.image}
            alt={config.name}
            className={`w-full h-full object-contain transition-all duration-700 ${
              isActive 
                ? 'drop-shadow-[0_0_30px_rgba(124,58,237,0.6)] brightness-110' 
                : 'drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
            }`}
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Fallback for missing images
              (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/bottts/svg?seed=${config.id}&backgroundColor=b6e3f4`;
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
