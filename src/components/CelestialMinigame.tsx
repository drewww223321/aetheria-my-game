import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

interface CelestialMinigameProps {
  onComplete: () => void;
}

export default function CelestialMinigame({ onComplete }: CelestialMinigameProps) {
  const [points, setPoints] = useState<{ id: number; x: number; y: number; connected: boolean }[]>([]);
  const [path, setPath] = useState<number[]>([]);
  const targetCount = 5;

  useEffect(() => {
    const newPoints = Array.from({ length: targetCount }).map((_, i) => ({
      id: i,
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60,
      connected: false
    }));
    setPoints(newPoints);
  }, []);

  const handlePointClick = (id: number) => {
    if (path.includes(id)) return;
    
    const newPath = [...path, id];
    setPath(newPath);
    
    if (newPath.length === targetCount) {
      setTimeout(onComplete, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center backdrop-blur-sm">
      <div className="relative w-[600px] h-[600px] glass-panel border-celestial-glow/30">
        <div className="absolute top-8 left-0 right-0 text-center">
            <h2 className="text-2xl font-serif text-glow">Celestial Alignment</h2>
            <p className="text-sm text-white/40 uppercase tracking-widest mt-2">Connect the stars to unlock the Echo</p>
        </div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {path.map((id, index) => {
            if (index === 0) return null;
            const start = points[path[index - 1]];
            const end = points[id];
            return (
              <motion.line
                key={`${id}-${index}`}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                x1={`${start.x}%`}
                y1={`${start.y}%`}
                x2={`${end.x}%`}
                y2={`${end.y}%`}
                stroke="white"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="opacity-50"
              />
            );
          })}
        </svg>

        {points.map((p) => (
          <motion.button
            key={p.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
            onClick={() => handlePointClick(p.id)}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 p-4 transition-all ${
              path.includes(p.id) ? 'text-celestial-glow drop-shadow-[0_0_15px_rgba(124,58,237,1)]' : 'text-white/30'
            }`}
          >
            <Star fill={path.includes(p.id) ? 'currentColor' : 'none'} />
          </motion.button>
        ))}

        {path.length === targetCount && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-celestial-glow/20 rounded-2xl pointer-events-none"
            >
                <div className="text-4xl font-serif italic text-glow">Link Established</div>
            </motion.div>
        )}
      </div>
    </div>
  );
}
