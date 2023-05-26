import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import MoviesList from '../MoviesList.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(MoviesList, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
