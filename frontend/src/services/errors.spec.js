import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { reportError, clearErrors, useErrors } from './errors.js'

let consoleErrorSpy

beforeEach(() => {
  clearErrors()
  consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('reportError', () => {
  it('records an Error in the global error list', () => {
    const err = new Error('boom')
    reportError(err)
    expect(useErrors().value).toEqual([err])
  })

  it('accumulates multiple errors', () => {
    const a = new Error('first')
    const b = new Error('second')
    reportError(a)
    reportError(b)
    expect(useErrors().value).toEqual([a, b])
  })

  it('records non-Error values too — reportError never filters', () => {
    const values = ['cancel', undefined, null, { code: 'CANCELLED' }]
    values.forEach(reportError)
    expect(useErrors().value).toEqual(values)
  })

  it('logs an Error to the console with its stack trace', () => {
    const err = new Error('boom')
    reportError(err)
    expect(consoleErrorSpy).toHaveBeenCalledWith(err)
  })

  it('logs non-Error values to the console', () => {
    reportError('cancel')
    expect(consoleErrorSpy).toHaveBeenCalledWith('cancel')
  })
})

describe('clearErrors', () => {
  it('empties the global error list', () => {
    reportError(new Error('boom'))
    clearErrors()
    expect(useErrors().value).toEqual([])
  })
})

