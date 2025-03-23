import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ExhibitCard from '@/components/ExhibitCard.vue'

describe('ExhibitCard', () => {
  const mockExhibit = {
    id: 'test-1',
    name: '测试展品',
    description: '测试描述',
    thumbnail: '/test.jpg'
  }

  it('renders exhibit information correctly', () => {
    const wrapper = mount(ExhibitCard, {
      props: {
        exhibit: mockExhibit
      }
    })

    expect(wrapper.find('h3').text()).toBe(mockExhibit.name)
    expect(wrapper.find('p').text()).toBe(mockExhibit.description)
    expect(wrapper.find('img').attributes('src')).toBe(mockExhibit.thumbnail)
  })
}) 