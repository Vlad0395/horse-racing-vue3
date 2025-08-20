// Base horse structure
export interface HorseBase {
  name: string
  condition: string // keep as string for now; could convert to number later
  color: {
    name: string
    hex: string
  }
}

export const horseNames: HorseBase[] = [
  { name: 'Thunderbolt', condition: '80', color: { name: 'black', hex: '#000000' } },
  { name: 'Silverstar', condition: '75', color: { name: 'gray', hex: '#808080' } },
  { name: 'Blaze', condition: '90', color: { name: 'chestnut', hex: '#954535' } },
  { name: 'Midnight', condition: '85', color: { name: 'navy', hex: '#001F3F' } },
  { name: 'Storm', condition: '78', color: { name: 'emerald', hex: '#50C878' } },
  { name: 'Shadow', condition: '82', color: { name: 'charcoal', hex: '#36454F' } },
  { name: 'Comet', condition: '88', color: { name: 'ivory', hex: '#FFFFF0' } },
  { name: 'Lightning', condition: '80', color: { name: 'gold', hex: '#FFD700' } },
  { name: 'Majesty', condition: '92', color: { name: 'crimson', hex: '#DC143C' } },
  { name: 'Spirit', condition: '86', color: { name: 'silver', hex: '#C0C0C0' } },
  { name: 'Apollo', condition: '77', color: { name: 'bronze', hex: '#CD7F32' } },
  { name: 'Sapphire', condition: '83', color: { name: 'blue', hex: '#0000FF' } },
  { name: 'Falcon', condition: '79', color: { name: 'olive', hex: '#808000' } },
  { name: 'Dancer', condition: '81', color: { name: 'pearl', hex: '#EAE0C8' } },
  { name: 'Ranger', condition: '76', color: { name: 'forest', hex: '#228B22' } },
  { name: 'Rocket', condition: '89', color: { name: 'platinum', hex: '#E5E4E2' } },
  { name: 'Hunter', condition: '84', color: { name: 'auburn', hex: '#A52A2A' } },
  { name: 'Prince', condition: '87', color: { name: 'amber', hex: '#FFBF00' } },
  { name: 'Ace', condition: '80', color: { name: 'teal', hex: '#008080' } },
  { name: 'Zephyr', condition: '78', color: { name: 'graphite', hex: '#383838' } },
  { name: 'Echo', condition: '85', color: { name: 'snow', hex: '#FFFAFA' } },
  { name: 'Vortex', condition: '83', color: { name: 'slate', hex: '#708090' } },
  { name: 'Atlas', condition: '88', color: { name: 'ruby', hex: '#E0115F' } },
  { name: 'Nova', condition: '81', color: { name: 'copper', hex: '#B87333' } },
  { name: 'Titan', condition: '86', color: { name: 'onyx', hex: '#353839' } },
  { name: 'Mystic', condition: '79', color: { name: 'cream', hex: '#FFFDD0' } },
  { name: 'Phoenix', condition: '90', color: { name: 'maroon', hex: '#800000' } },
  { name: 'Glory', condition: '84', color: { name: 'topaz', hex: '#FFC87C' } },
  { name: 'Valor', condition: '77', color: { name: 'jade', hex: '#00A86B' } },
  { name: 'Onyx', condition: '82', color: { name: 'indigo', hex: '#4B0082' } },
  { name: 'Aurora', condition: '85', color: { name: 'mint', hex: '#98FF98' } },
  { name: 'Blizzard', condition: '80', color: { name: 'frost', hex: '#E5F9F6' } },
  { name: 'Cobalt', condition: '78', color: { name: 'turquoise', hex: '#40E0D0' } },
  { name: 'Jasper', condition: '89', color: { name: 'sand', hex: '#C2B280' } },
  { name: 'Echo', condition: '83', color: { name: 'rose', hex: '#FF007F' } },
  { name: 'Frost', condition: '87', color: { name: 'lilac', hex: '#C8A2C8' } },
  { name: 'Gem', condition: '76', color: { name: 'peach', hex: '#FFDAB9' } },
  { name: 'Knight', condition: '91', color: { name: 'steel', hex: '#4682B4' } },
  { name: 'Luna', condition: '80', color: { name: 'violet', hex: '#8F00FF' } },
  { name: 'Orion', condition: '85', color: { name: 'magenta', hex: '#FF00FF' } },
  { name: 'Quartz', condition: '78', color: { name: 'lemon', hex: '#FFF700' } },
]

export function pickRandomHorses(count: number): HorseBase[] {
  const shuffled = [...horseNames].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, horseNames.length))
}
