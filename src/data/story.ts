import { Scene } from '../types';

export const INITIAL_STATS = {
  Harmony: 50,
  Chaos: 0,
  Insight: 10,
  Sin: 0,
};

export const STORY_DATA: Record<string, Scene> = {
  intro: {
    id: 'intro',
    background: 'https://picsum.photos/seed/nebula/1920/1080',
    characters: [
      { id: 'aris', name: 'Dr. Aris', image: '/aris.png', position: 'center' }
    ],
    dialogue: [
      "The reactor hums with a frequency I've never heard before.",
      "They called me mad for chasing the Ethereal Core. But look at it now.",
      "It doesn't just produce energy... it produces possibilities."
    ],
    choices: [
      { id: 'stabilize', text: 'Apply stabilization field', nextSceneId: 'stable_path', impact: { stat: 'Harmony', value: 10 } },
      { id: 'push', text: 'Push the energy beyond the limit', nextSceneId: 'chaos_path', impact: { stat: 'Chaos', value: 20 } }
    ]
  },
  stable_path: {
    id: 'stable_path',
    background: 'https://picsum.photos/seed/lab/1920/1080',
    characters: [
      { id: 'aris', name: 'Dr. Aris', image: '/aris.png', position: 'left' },
      { id: 'lyra', name: 'Lyra', image: 'https://api.dicebear.com/7.x/bottts/svg?seed=lyra', position: 'right' }
    ],
    dialogue: [
      "The hum subsides into a warm, golden glow.",
      "Suddenly, a rift opens. A figure steps through, her body made of pure starlight.",
      "'Human... you play with currents you do not understand,' Lyra whispers."
    ],
    choices: [
      { id: 'apologize', text: "'I was only seeking progress.'", nextSceneId: 'negotiation_path', impact: { stat: 'Insight', value: 5 } },
      { id: 'defend', text: "'And who are you to judge my discovery?'", nextSceneId: 'confrontation_path', impact: { stat: 'Sin', value: 10 } }
    ]
  },
  chaos_path: {
    id: 'chaos_path',
    background: 'https://picsum.photos/seed/destruction/1920/1080',
    characters: [
      { id: 'aris', name: 'Dr. Aris', image: '/aris.png', position: 'center' }
    ],
    dialogue: [
      "The walls scream as the aether tears through the laboratory.",
      "I feel... lighter. As if my very atoms are being rewritten.",
      "This is not energy! This is the Descent!"
    ],
    choices: [
      { id: 'embrace', text: 'Embrace the transformation', nextSceneId: 'sinner_path', impact: { stat: 'Sin', value: 30 } },
      { id: 'resist', text: 'Try to shut it down', nextSceneId: 'minigame_shutdown' }
    ]
  },
  minigame_shutdown: {
    id: 'minigame_shutdown',
    background: 'https://picsum.photos/seed/glitch/1920/1080',
    characters: [],
    isMiniGame: true,
    dialogue: ["Manual shutdown required. Realign the emergency conduits!"],
    choices: [
      { id: 'done', text: 'Conduits sealed', nextSceneId: 'stable_path' }
    ]
  },
  sinner_path: {
     id: 'sinner_path',
     background: 'https://picsum.photos/seed/void/1920/1080',
     characters: [{ id: 'sinner_aris', name: 'Ascended Aris', image: 'https://api.dicebear.com/7.x/bottts/svg?seed=chaos_aris', position: 'center' }],
     dialogue: ["'The world below seems so small now,' Aris laughs, his voice echoing in the void.", "You have become what they feared. A Sinner of the First Core."],
     choices: [{ id: 'restart', text: 'Replay the Cycle', nextSceneId: 'intro' }]
  },
  negotiation_path: {
    id: 'negotiation_path',
    background: 'https://picsum.photos/seed/sanctum/1920/1080',
    characters: [{ id: 'lyra', name: 'Lyra', image: 'https://api.dicebear.com/7.x/bottts/svg?seed=lyra', position: 'center' }],
    dialogue: ["Lyra takes your hand. The laboratory dissolves into a shimmering garden.", "'Progress is a double-edged blade, Aris. Let us find the middle way.'"],
    choices: [{ id: 'restart', text: 'End of Chapter 1 - Replay', nextSceneId: 'intro' }]
  }
};

