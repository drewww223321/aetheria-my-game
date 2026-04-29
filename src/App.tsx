/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GameState, Choice, Scene, StatType } from './types';
import { STORY_DATA, INITIAL_STATS } from './data/story';
import StoryBox from './components/StoryBox';
import Character from './components/Character';
import HUD from './components/HUD';
import CelestialMinigame from './components/CelestialMinigame';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentSceneId: 'intro',
    stats: INITIAL_STATS,
    inventory: [],
    history: []
  });

  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [isDialogueFinished, setIsDialogueFinished] = useState(false);

  const currentScene: Scene = STORY_DATA[gameState.currentSceneId] || STORY_DATA['intro'];

  const handleNextDialogue = useCallback(() => {
    if (currentDialogueIndex < currentScene.dialogue.length - 1) {
      setCurrentDialogueIndex(prev => prev + 1);
    } else {
      setIsDialogueFinished(true);
    }
  }, [currentDialogueIndex, currentScene]);

  const handleChoice = useCallback((choice: Choice) => {
    setGameState(prev => {
      const newStats = { ...prev.stats };
      const newHistory = [...prev.history];
      
      if (choice.impact) {
        newStats[choice.impact.stat] = (newStats[choice.impact.stat] || 0) + choice.impact.value;
      }
      
      // Record major choices in history
      newHistory.push(`${currentScene.dialogue[0].substring(0, 30)}... → ${choice.text}`);

      return {
        ...prev,
        currentSceneId: choice.nextSceneId,
        stats: newStats,
        history: newHistory.slice(-20) // Keep last 20 history items
      };
    });
    
    // Reset dialogue for next scene
    setCurrentDialogueIndex(0);
    setIsDialogueFinished(false);
  }, [currentScene]);

  const handleMiniGameComplete = () => {
    if (currentScene.choices.length > 0) {
      handleChoice(currentScene.choices[0]);
    }
  };

  // Background parallax or animation could go here
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-celestial-dark selection:bg-celestial-glow/30">
      {/* Background Layer */}
      <AnimatePresence mode="wait">
        <motion.div
           key={currentScene.background}
           initial={{ scale: 1.1, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           exit={{ scale: 1.05, opacity: 0 }}
           transition={{ duration: 1.5 }}
           className="absolute inset-0 z-0"
        >
          <img 
            src={currentScene.background} 
            alt="Environment" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
               (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${currentScene.id}/1920/1080?blur=2`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-celestial-dark/20 to-celestial-dark/60" />
        </motion.div>
      </AnimatePresence>

      {/* Floating Particles / Atmosphere */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="atmosphere w-full h-full" />
      </div>

      {/* Character Layer */}
      <div className="relative h-full flex items-end justify-center px-20 pb-40">
        {currentScene.characters.map((char) => (
          <Character 
            key={char.id} 
            config={char} 
            isActive={!isDialogueFinished} 
          />
        ))}
      </div>

      {/* UI Overlay */}
      <HUD gameState={gameState} />
      <MusicPlayer />

      {/* MiniGame Layer */}
      {currentScene.isMiniGame && (
        <CelestialMinigame onComplete={handleMiniGameComplete} />
      )}

      {/* Interaction Layer */}
      {!currentScene.isMiniGame && (
        <StoryBox 
          dialogue={currentScene.dialogue[currentDialogueIndex]}
          currentName={currentScene.speakerName || currentScene.characters[0]?.name}
          choices={currentScene.choices}
          isFinished={isDialogueFinished}
          onNext={handleNextDialogue}
          onChoice={handleChoice}
        />
      )}

      {/* Ambient Visuals */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/5 overflow-hidden">
        <motion.div 
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="h-full w-1/3 bg-gradient-to-r from-transparent via-celestial-glow to-transparent"
        />
      </div>
    </main>
  );
}

