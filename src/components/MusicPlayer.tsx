import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';

export default function MusicPlayer() {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Using a long ambient track from a free CDN
  const ambientTrack = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; 

  useEffect(() => {
    if (audioRef.current) {
      if (!isMuted) {
        audioRef.current.play().catch(e => console.log("Audio play blocked", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMuted]);

  return (
    <div className="fixed top-6 right-6 z-[60]">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsMuted(!isMuted)}
        className="glass-panel p-3 hover:bg-white/20 transition-colors"
      >
        {isMuted ? <VolumeX size={20} className="text-white/40" /> : <Volume2 size={20} className="text-celestial-glow" />}
      </motion.button>
      <audio 
        ref={audioRef}
        src={ambientTrack}
        loop
      />
    </div>
  );
}
