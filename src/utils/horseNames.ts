// Base horse structure
export interface HorseBase {
  name: string
  condition: string // keep as string for now; could convert to number later
  color: string
}

export const horseNames: HorseBase[] = [
  {
    name: 'Thunderbolt',
    condition: '80',
    color: 'black'
  },
  {
    name: 'Silverstar',
    condition: '75',
    color: 'gray'
  },
  {
    name: 'Blaze',
    condition: '90',
    color: 'chestnut'
  },
  {
    name: 'Midnight',
    condition: '85',
    color: 'black'
  },
  {
    name: 'Storm',
    condition: '78',
    color: 'bay'
  },
  {
    name: 'Shadow',
    condition: '82',
    color: 'dark brown'
  },
  {
    name: 'Comet',
    condition: '88',
    color: 'white'
  },
  {
    name: 'Lightning',
    condition: '80',
    color: 'palomino'
  },
  {
    name: 'Majesty',
    condition: '92',
    color: 'bay'
  },
  {
    name: 'Spirit',
    condition: '86',
    color: 'gray'
  },
  {
    name: 'Apollo',
    condition: '77',
    color: 'chestnut'
  },
  {
    name: 'Sapphire',
    condition: '83',
    color: 'black'
  },
  {
    name: 'Falcon',
    condition: '79',
    color: 'bay'
  },
  {
    name: 'Dancer',
    condition: '81',
    color: 'white'
  },
  {
    name: 'Ranger',
    condition: '76',
    color: 'dark brown'
  },
  {
    name: 'Rocket',
    condition: '89',
    color: 'gray'
  },
  {
    name: 'Hunter',
    condition: '84',
    color: 'chestnut'
  },
  {
    name: 'Prince',
    condition: '87',
    color: 'palomino'
  },
  {
    name: 'Ace',
    condition: '80',
    color: 'bay'
  },
  {
    name: 'Zephyr',
    condition: '78',
    color: 'black'
  },
  {
    name: 'Echo',
    condition: '85',
    color: 'white'
  },
  {
    name: 'Vortex',
    condition: '83',
    color: 'gray'
  },
  {
    name: 'Atlas',
    condition: '88',
    color: 'bay'
  },
  {
    name: 'Nova',
    condition: '81',
    color: 'chestnut'
  },
  {
    name: 'Titan',
    condition: '86',
    color: 'black'
  },
  {
    name: 'Mystic',
    condition: '79',
    color: 'white'
  },
  {
    name: 'Phoenix',
    condition: '90',
    color: 'dark brown'
  },
  {
    name: 'Glory',
    condition: '84',
    color: 'palomino'
  },
  {
    name: 'Valor',
    condition: '77',
    color: 'gray'
  },
  {
    name: 'Onyx',
    condition: '82',
    color: 'black'
  },
  {
    name: 'Aurora',
    condition: '85',
    color: 'bay'
  },
  {
    name: 'Blizzard',
    condition: '80',
    color: 'white'
  },
  {
    name: 'Cobalt',
    condition: '78',
    color: 'chestnut'
  },
  {
    name: 'Jasper',
    condition: '89',
    color: 'gray'
  },
  {
    name: 'Echo',
    condition: '83',
    color: 'dark brown'
  },
  {
    name: 'Frost',
    condition: '87',
    color: 'palomino'
  },
  {
    name: 'Gem',
    condition: '76',
    color: 'bay'
  },
  {
    name: 'Knight',
    condition: '91',
    color: 'black'
  },
  {
    name: 'Luna',
    condition: '80',
    color: 'white'
  },
  {
    name: 'Orion',
    condition: '85',
    color: 'chestnut'
  },
  {
    name: 'Quartz',
    condition: '78',
    color: 'gray'
  }
]

export function pickRandomHorses(count: number): HorseBase[] {
  const shuffled = [...horseNames].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, horseNames.length))
}