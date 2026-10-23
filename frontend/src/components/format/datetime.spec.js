import { describe, it, expect } from 'vitest'
import { toDate, toDateString, toDateTimeLocalString } from './datetime.js'

describe('toDate', () => {
  it('returns null for blank values', () => {
    expect(toDate(null)).toBe(null)
    expect(toDate(undefined)).toBe(null)
    expect(toDate('')).toBe(null)
    expect(toDate('   ')).toBe(null)
  })

  it('returns a Date unchanged and converts numbers to a Date', () => {
    const source = new Date('2025-01-15T10:00:00Z')
    expect(toDate(source)).toBe(source)
    expect(toDate(source.getTime()).getTime()).toBe(source.getTime())
  })

  it('parses a bare calendar date as local midnight', () => {
    const date = toDate('2025-01-15')
    expect(date.getFullYear()).toBe(2025)
    expect(date.getMonth()).toBe(0)
    expect(date.getDate()).toBe(15)
    // Must equal the local-time constructor, not UTC midnight.
    expect(date.getTime()).toBe(new Date(2025, 0, 15).getTime())
  })

  it('parses a full ISO timestamp in its own timezone', () => {
    expect(toDate('2025-01-15T10:00:00Z').toISOString()).toBe('2025-01-15T10:00:00.000Z')
  })

  it('parses datetime-local input as local time', () => {
    const date = toDate('2025-01-15T10:30')
    expect(date.getFullYear()).toBe(2025)
    expect(date.getMonth()).toBe(0)
    expect(date.getDate()).toBe(15)
    expect(date.getHours()).toBe(10)
    expect(date.getMinutes()).toBe(30)
  })

  it('returns null for unparsable values', () => {
    expect(toDate('not a date')).toBe(null)
  })
})

describe('formatting', () => {
  it('formats a local calendar date', () => {
    expect(toDateString(new Date(2025, 0, 15))).toBe('2025-01-15')
  })

  it('formats datetime-local', () => {
    expect(toDateTimeLocalString(new Date(2025, 0, 15, 10, 5))).toBe('2025-01-15T10:05')
  })
})
