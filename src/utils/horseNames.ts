// Base horse structure
export interface HorseBase {
  name: string
  condition: string // keep as string for now; could convert to number later
  color: string
}

export const horseNames: HorseBase[] = [
  { name: 'Thunderbolt', condition: '80', color: 'black' },
  { name: 'Silverstar', condition: '75', color: 'gray' },
  { name: 'Blaze', condition: '90', color: 'chestnut' },
  { name: 'Midnight', condition: '85', color: 'navy' },
  { name: 'Storm', condition: '78', color: 'emerald' },
  { name: 'Shadow', condition: '82', color: 'charcoal' },
  { name: 'Comet', condition: '88', color: 'ivory' },
  { name: 'Lightning', condition: '80', color: 'gold' },
  { name: 'Majesty', condition: '92', color: 'crimson' },
  { name: 'Spirit', condition: '86', color: 'silver' },
  { name: 'Apollo', condition: '77', color: 'bronze' },
  { name: 'Sapphire', condition: '83', color: 'blue' },
  { name: 'Falcon', condition: '79', color: 'olive' },
  { name: 'Dancer', condition: '81', color: 'pearl' },
  { name: 'Ranger', condition: '76', color: 'forest' },
  { name: 'Rocket', condition: '89', color: 'platinum' },
  { name: 'Hunter', condition: '84', color: 'auburn' },
  { name: 'Prince', condition: '87', color: 'amber' },
  { name: 'Ace', condition: '80', color: 'teal' },
  { name: 'Zephyr', condition: '78', color: 'graphite' },
  { name: 'Echo', condition: '85', color: 'snow' },
  { name: 'Vortex', condition: '83', color: 'slate' },
  { name: 'Atlas', condition: '88', color: 'ruby' },
  { name: 'Nova', condition: '81', color: 'copper' },
  { name: 'Titan', condition: '86', color: 'onyx' },
  { name: 'Mystic', condition: '79', color: 'cream' },
  { name: 'Phoenix', condition: '90', color: 'maroon' },
  { name: 'Glory', condition: '84', color: 'topaz' },
  { name: 'Valor', condition: '77', color: 'jade' },
  { name: 'Onyx', condition: '82', color: 'indigo' },
  { name: 'Aurora', condition: '85', color: 'mint' },
  { name: 'Blizzard', condition: '80', color: 'frost' },
  { name: 'Cobalt', condition: '78', color: 'turquoise' },
  { name: 'Jasper', condition: '89', color: 'sand' },
  { name: 'Echo', condition: '83', color: 'rose' },
  { name: 'Frost', condition: '87', color: 'lilac' },
  { name: 'Gem', condition: '76', color: 'peach' },
  { name: 'Knight', condition: '91', color: 'steel' },
  { name: 'Luna', condition: '80', color: 'violet' },
  { name: 'Orion', condition: '85', color: 'magenta' },
  { name: 'Quartz', condition: '78', color: 'lemon' }
]

export function pickRandomHorses(count: number): HorseBase[] {
  const shuffled = [...horseNames].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, horseNames.length))
}