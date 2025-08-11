import { describe, it, expect } from 'vitest'
import { cn } from '../utils'

describe('cn util', () => {
  it('combina clases y elimina duplicadas', () => {
    expect(cn('p-2','text-sm','p-2')).toBe('p-2 text-sm')
  })
})
