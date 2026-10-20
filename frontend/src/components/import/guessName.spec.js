import { describe, it, expect } from 'vitest'
import { guessProjectName } from './guessName.js'

describe('guessProjectName', () => {
  it('uses the folder basename', () => {
    expect(guessProjectName('/Users/me/Pictures/Japan Trip 2024')).toBe('Japan Trip 2024')
  })

  it('handles a trailing slash', () => {
    expect(guessProjectName('/Users/me/Pictures/Japan Trip 2024/')).toBe('Japan Trip 2024')
  })

  it('replaces separators with spaces', () => {
    expect(guessProjectName('/photos/japan_trip_2024')).toBe('japan trip 2024')
    expect(guessProjectName('/photos/japan-trip-2024')).toBe('japan trip 2024')
  })

  it('handles windows paths', () => {
    expect(guessProjectName('C:\\Users\\me\\My Photos')).toBe('My Photos')
  })

  it('returns empty for blank, root, or non-string input', () => {
    expect(guessProjectName('')).toBe('')
    expect(guessProjectName('   ')).toBe('')
    expect(guessProjectName('/')).toBe('')
    expect(guessProjectName(null)).toBe('')
  })
})
