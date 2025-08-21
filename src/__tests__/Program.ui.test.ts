import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Programs from '../components/Programs.vue'

// Мок Table, щоб не залежати від його реалізації
const TableStub = {
  template: '<div class="table-stub"></div>',
  props: ['headers', 'items', 'noDataText'],
}

describe('Programs.vue', () => {
  it('renders header', () => {
    const wrapper = mount(Programs, {
      global: {
        stubs: { Table: TableStub },
        mocks: {
          $store: {
            state: { programs: { rounds: [], distances: [] } },
          },
        },
        provide: {
          store: {
            state: { programs: { rounds: [], distances: [] } },
          },
        },
      },
      computed: {
        rounds: () => [],
        distances: () => [],
      },
    })
    expect(wrapper.find('h1').text()).toBe('Programs')
  })

  it('renders rounds', () => {
    const rounds = [
      { round: 1, distance: 1200, horses: [{ name: 'Horse1' }], generatedAt: Date.now() },
      { round: 2, distance: 1400, horses: [{ name: 'Horse2' }], generatedAt: Date.now() },
    ]
    const wrapper = mount(Programs, {
      global: {
        stubs: { Table: TableStub },
      },
      computed: {
        rounds: () => rounds,
        distances: () => [1200, 1400],
      },
    })
    expect(wrapper.findAll('.program__round-title').length).toBe(2)
    expect(wrapper.text()).toContain('Round 1st Lap - 1200m')
    expect(wrapper.text()).toContain('Round 2st Lap - 1400m')
  })

  it('passes correct props to Table', () => {
    const rounds = [
      { round: 1, distance: 1200, horses: [{ name: 'Horse1' }], generatedAt: Date.now() },
    ]
    const wrapper = mount(Programs, {
      global: {
        stubs: { Table: TableStub },
      },
      computed: {
        rounds: () => rounds,
        distances: () => [1200],
      },
    })
    const table = wrapper.findComponent(TableStub)
    expect(table.exists()).toBe(true)
    expect(table.props('headers')).toEqual([
      { text: 'Position', value: 'position', width: '100px' },
      { text: 'Name', value: 'name' },
    ])
    expect(table.props('items')).toEqual([
      { position: 1, name: 'Horse1' },
    ])
    expect(table.props('noDataText')).toBe('No programs available')
  })
})