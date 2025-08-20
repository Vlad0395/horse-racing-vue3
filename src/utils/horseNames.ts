// Base horse structure
export interface HorseBase {
  id: number
  name: string
  condition: string // keep as string for now; could convert to number later
  color: {
    name: string
    hex: string
  }
}

export const horseNames: HorseBase[] = [
  { id: 1, name: 'Thunderbolt', condition: '80', color: { name: 'black', hex: '#000000' } },
  { id: 2, name: 'Silverstar', condition: '75', color: { name: 'gray', hex: '#808080' } },
  { id: 3, name: 'Blaze', condition: '90', color: { name: 'chestnut', hex: '#954535' } },
  { id: 4, name: 'Midnight', condition: '85', color: { name: 'navy', hex: '#001F3F' } },
  { id: 5, name: 'Storm', condition: '78', color: { name: 'emerald', hex: '#50C878' } },
  { id: 6, name: 'Shadow', condition: '82', color: { name: 'charcoal', hex: '#36454F' } },
  { id: 7, name: 'Comet', condition: '88', color: { name: 'ivory', hex: '#FFFFF0' } },
  { id: 8, name: 'Lightning', condition: '80', color: { name: 'gold', hex: '#FFD700' } },
  { id: 9, name: 'Majesty', condition: '92', color: { name: 'crimson', hex: '#DC143C' } },
  { id: 10, name: 'Spirit', condition: '86', color: { name: 'silver', hex: '#C0C0C0' } },
  { id: 11, name: 'Apollo', condition: '77', color: { name: 'bronze', hex: '#CD7F32' } },
  { id: 12, name: 'Sapphire', condition: '83', color: { name: 'blue', hex: '#0000FF' } },
  { id: 13, name: 'Falcon', condition: '79', color: { name: 'olive', hex: '#808000' } },
  { id: 14, name: 'Dancer', condition: '81', color: { name: 'pearl', hex: '#EAE0C8' } },
  { id: 15, name: 'Ranger', condition: '76', color: { name: 'forest', hex: '#228B22' } },
  { id: 16, name: 'Rocket', condition: '89', color: { name: 'platinum', hex: '#E5E4E2' } },
  { id: 17, name: 'Hunter', condition: '84', color: { name: 'auburn', hex: '#A52A2A' } },
  { id: 18, name: 'Prince', condition: '87', color: { name: 'amber', hex: '#FFBF00' } },
  { id: 19, name: 'Ace', condition: '80', color: { name: 'teal', hex: '#008080' } },
  { id: 20, name: 'Zephyr', condition: '78', color: { name: 'graphite', hex: '#383838' } },
  { id: 21, name: 'Echo', condition: '85', color: { name: 'snow', hex: '#FFFAFA' } },
  { id: 22, name: 'Vortex', condition: '83', color: { name: 'slate', hex: '#708090' } },
  { id: 23, name: 'Atlas', condition: '88', color: { name: 'ruby', hex: '#E0115F' } },
  { id: 24, name: 'Nova', condition: '81', color: { name: 'copper', hex: '#B87333' } },
  { id: 25, name: 'Titan', condition: '86', color: { name: 'onyx', hex: '#353839' } },
  { id: 26, name: 'Mystic', condition: '79', color: { name: 'cream', hex: '#FFFDD0' } },
  { id: 27, name: 'Phoenix', condition: '90', color: { name: 'maroon', hex: '#800000' } },
  { id: 28, name: 'Glory', condition: '84', color: { name: 'topaz', hex: '#FFC87C' } },
  { id: 29, name: 'Valor', condition: '77', color: { name: 'jade', hex: '#00A86B' } },
  { id: 30, name: 'Onyx', condition: '82', color: { name: 'indigo', hex: '#4B0082' } },
  { id: 31, name: 'Aurora', condition: '85', color: { name: 'mint', hex: '#98FF98' } },
  { id: 32, name: 'Blizzard', condition: '80', color: { name: 'frost', hex: '#E5F9F6' } },
  { id: 33, name: 'Cobalt', condition: '78', color: { name: 'turquoise', hex: '#40E0D0' } },
  { id: 34, name: 'Jasper', condition: '89', color: { name: 'sand', hex: '#C2B280' } },
  { id: 35, name: 'Echo', condition: '83', color: { name: 'rose', hex: '#FF007F' } },
  { id: 36, name: 'Frost', condition: '87', color: { name: 'lilac', hex: '#C8A2C8' } },
  { id: 37, name: 'Gem', condition: '76', color: { name: 'peach', hex: '#FFDAB9' } },
  { id: 38, name: 'Knight', condition: '91', color: { name: 'steel', hex: '#4682B4' } },
  { id: 39, name: 'Luna', condition: '80', color: { name: 'violet', hex: '#8F00FF' } },
  { id: 40, name: 'Orion', condition: '85', color: { name: 'magenta', hex: '#FF00FF' } },
  { id: 41, name: 'Quartz', condition: '78', color: { name: 'lemon', hex: '#FFF700' } },
]

export function pickRandomHorses(count: number): HorseBase[] {
  const shuffled = [...horseNames].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, horseNames.length))
}
