import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, Scroll, User, Zap, X } from 'lucide-react';
import { GameState } from '../types';

interface HUDProps {
  gameState: GameState;
}

export default function HUD({ gameState }: HUDProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'status' | 'archive' | 'inventory'>('status');

  return (
    <>
      <div className="fixed top-6 left-6 z-[60] flex items-center gap-4">
        <button 
          onClick={() => setIsOpen(true)}
          className="glass-panel p-3 hover:bg-white/20 transition-colors group"
        >
          <LayoutGrid size={20} className="text-star-white group-hover:scale-110 transition-transform" />
        </button>
        
        <div className="flex gap-2">
          {Object.entries(gameState.stats).map(([key, val]) => (
            <div key={key} className="glass-panel px-3 py-1 flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest bg-black/40">
              <span className="text-white/50">{key}</span>
              <span className="text-celestial-glow">{val}</span>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-5xl h-[80vh] glass-panel flex overflow-hidden border-white/5 shadow-2xl"
            >
              <div className="w-64 border-r border-white/10 bg-white/5 flex flex-col p-6">
                <h2 className="font-serif italic text-2xl mb-8 text-glow">Aetheria</h2>
                
                <nav className="flex flex-col gap-2">
                  {[
                    { id: 'status', label: 'Celestial State', icon: User },
                    { id: 'archive', label: 'Memory Archive', icon: Scroll },
                    { id: 'inventory', label: 'Relics', icon: Zap },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-3 p-4 rounded-xl text-sm transition-all ${
                        activeTab === tab.id 
                          ? 'bg-celestial-glow text-white shadow-[0_0_20px_rgba(124,58,237,0.4)]' 
                          : 'hover:bg-white/5 text-white/60'
                      }`}
                    >
                      <tab.icon size={18} />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </nav>

                <div className="mt-auto">
                   <button 
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center justify-center gap-2 p-4 text-white/40 hover:text-white transition-colors"
                   >
                     <X size={18} /> Close
                   </button>
                </div>
              </div>

              <div className="flex-1 p-12 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {activeTab === 'status' && (
                    <motion.div
                      key="status"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h3 className="text-3xl font-serif mb-8 italic">Astral Projection</h3>
                      <div className="grid grid-cols-2 gap-6">
                        {Object.entries(gameState.stats).map(([k, v]) => (
                          <div key={k} className="p-6 bg-white/5 rounded-2xl border border-white/10">
                            <div className="text-xs uppercase tracking-widest text-white/40 mb-2">{k}</div>
                            <div className="flex items-center gap-4">
                              <div className="h-2 flex-1 bg-black/40 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${v}%` }}
                                  className="h-full bg-celestial-glow"
                                />
                              </div>
                              <span className="font-mono text-xl">{v}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'archive' && (
                    <motion.div
                        key="archive"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                      <h3 className="text-3xl font-serif mb-8 italic">Echoes of the Past</h3>
                      <div className="space-y-4">
                        {gameState.history.length === 0 ? (
                          <div className="text-white/30 italic">No echoes collected yet...</div>
                        ) : (
                          gameState.history.map((h, i) => (
                            <div key={i} className="p-4 border-l-2 border-celestial-glow bg-white/5 text-sm italic">
                              "{h}"
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                  
                  {activeTab === 'inventory' && (
                    <motion.div
                        key="inventory"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                      <h3 className="text-3xl font-serif mb-8 italic">Astral Relics</h3>
                      <div className="grid grid-cols-4 gap-4">
                        {gameState.inventory.length === 0 ? (
                           <div className="col-span-4 text-white/30 italic">Your pockets are filled with stardust, but no relics...</div>
                        ) : (
                          gameState.inventory.map((item, i) => (
                            <div key={i} className="aspect-square glass-panel flex flex-col items-center justify-center text-xs gap-3">
                              <Zap className="text-celestial-glow" />
                              {item}
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
