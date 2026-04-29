import { Scene } from '../types';

export const INITIAL_STATS = {
  Affection: 0,
  Ruthless: 0,
  Gentle: 0,
};

export const STORY_DATA: Record<string, Scene> = {
  // Mapping the Narrator/Aris intro section
  intro: {
    id: 'intro',
    background: 'bg.jpeg',
    characters: [
      { id: 'aris', name: 'Dr. Aris', image: 'aris.png', position: 'right' }
    ],
    dialogue: [
      "The gala at the Spine was, as always, suffocating. Located at the dead center of Aethel, the neutral capital was a place where people who did not fight in the frontlines showed off their massive amount of wealth and aether stones.",
      "While the Great Leaders were locked away in the High Chamber, their courts and high nobility were left to mingle in the ballroom below.",
      "It was a sea of dangerous beauty. To the left, the Seraphim nobility stood like statues of living pearl... to the right, the Demon aristocrats lounged in velvet chairs.",
      "A cathedral of excess, with an excessive amount of obsidian marble and floating Aether-crystals. The air smelled of expensive potions, bloody slaves, and floral perfumes.",
      "Dr. Aris Thorne stood in a corner, his expression that of a gentle scholar—the picture of the academic look.",
      "No one looked into his eyes long enough to see the abyss behind the glasses."
    ],
    choices: [
      { id: 'think_scorpion', text: "Think about your biggest achievement: Experiment No. 1 (Scorpion)", nextSceneId: 'exp_scorpion' },
      { id: 'think_acrux', text: "Think about your failure: Experiment No. 2 (Acrux)", nextSceneId: 'exp_acrux' },
      { id: 'think_elara', text: "The Woman Who Owns My Soul: Admire Elara from afar", nextSceneId: 'admire_elara' }
    ]
  },

  exp_scorpion: {
    id: 'exp_scorpion',
    background: 'bg.jpg.jpeg',
    characters: [{ id: 'aris', name: 'Aris', image: 'scorpion.png', position: 'right' }],
    dialogue: [
      "(Experiment No. 1: The Scorpion. Lord Haelen's daughter, fused with a Scorpion Beast Dredge. She doesn't even remember her father sitting three tables away.)"
    ],
    choices: [
      { id: 'ruth', text: "“Grief is a variable we ignore.”", nextSceneId: 'main_hall', impact: { stat: 'Ruthless', value: 1 } },
      { id: 'gent', text: "“A heavy price for progress.”", nextSceneId: 'main_hall', impact: { stat: 'Gentle', value: 1 } }
    ]
  },

  exp_acrux: {
    id: 'exp_acrux',
    background: 'angel.jpg.jpeg',
    characters: [{ id: 'aris', name: 'Aris', image: 'arisangry.png', position: 'right' }],
    dialogue: [
      "(Experiment No. 2: Acrux. I managed to bridge the gap between divine Seraphim DNA and Dredge filth. A creature of black-streaked wings and blackened eyes.)"
    ],
    choices: [
      { id: 'ruth', text: "“He is my ultimate weapon.”", nextSceneId: 'main_hall', impact: { stat: 'Ruthless', value: 1 } },
      { id: 'gent', text: "“He is a new lifeform.”", nextSceneId: 'main_hall', impact: { stat: 'Gentle', value: 1 } }
    ]
  },

  admire_elara: {
    id: 'admire_elara',
    background: 'bg.jpg.jpeg',
    characters: [
      { id: 'elara', name: 'Elara', image: 'elara.png', position: 'left' },
      { id: 'aris', name: 'Aris', image: 'aris.png', position: 'right' }
    ],
    dialogue: ["(My other half. To the world she is a flower; to me, she is the reason I am building this new world.)"],
    choices: [
      { id: 'warm', text: "Look with warmth", nextSceneId: 'main_hall', impact: { stat: 'Affection', value: 5 } },
      { id: 'frown', text: "Look with a frown", nextSceneId: 'main_hall', impact: { stat: 'Affection', value: -5 } },
      { id: 'love', text: "Look with love", nextSceneId: 'main_hall', impact: { stat: 'Affection', value: 10 } }
    ]
  },

  main_hall: {
    id: 'main_hall',
    background: 'bg.jpeg',
    characters: [
      { id: 'elara', name: 'Elara', image: 'elarasmirk.png', position: 'left' }
    ],
    isMiniGame: true,
    dialogue: ["Beside him, Lady Elara von Thorne finally approaches. It is time to stabilize the encounter."],
    choices: [
      { id: 'finish_minigame', text: 'Engage', nextSceneId: 'final_dialogue' }
    ]
  },

  final_dialogue: {
    id: 'final_dialogue',
    background: 'bg.jpeg',
    characters: [{ id: 'elara', name: 'Elara', image: 'elarasmirk.png', position: 'left' }],
    dialogue: ["Then let us leave this place behind. I am tired of the perfume of the living dead. I want more blood. More power."],
    choices: [{ id: 'restart', text: 'Replay the Cycle', nextSceneId: 'intro' }]
  }
};
