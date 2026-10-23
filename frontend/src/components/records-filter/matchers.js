// Pure, isolated matching/sorting helpers used by RecordsFilter.
// Kept free of Vue/DOM so they can be unit-tested on their own.

import { toDate } from '../format/datetime.js'

const toText = (value) => {
  if (value == null) return ''
  if (Array.isArray(value)) return value.map((item) => String(item)).join(' ')
  return String(value)
}

const isEmpty = (value) => {
  if (typeof value === 'number') return false
  return value == null || /^\s*$/.test(String(value))
}

export function matchText(fieldValue, matchValue) {
  if (isEmpty(matchValue)) return true
  return toText(fieldValue).toLowerCase().includes(String(matchValue).toLowerCase())
}

export function matchNumericRange(fieldValue, matchValue) {
  const { from, to } = matchValue || {}
  const num = Number(fieldValue)
  let ok = true
  if (!isEmpty(from)) ok = ok && Number.isFinite(num) && num >= Number(from)
  if (!isEmpty(to)) ok = ok && Number.isFinite(num) && num <= Number(to)
  return ok
}

export function matchDatetimeRange(fieldValue, matchValue) {
  const { from, to } = matchValue || {}
  const time = toDate(fieldValue)
  const startDate = toDate(from)
  const endDate = toDate(to)
  let ok = true
  if (startDate != null) ok = ok && time != null && time.getTime() >= startDate.getTime()
  if (endDate != null) ok = ok && time != null && time.getTime() <= endDate.getTime()
  return ok
}

export function matchValue(fieldValue, matchValue, type = 'text') {
  if (type === 'number') return matchNumericRange(fieldValue, matchValue)
  if (type === 'date' || type === 'datetime') return matchDatetimeRange(fieldValue, matchValue)
  return matchText(fieldValue, matchValue)
}

export function compareValues(a, b, type = 'text', ascending = true) {
  const dir = ascending ? 1 : -1
  if (type === 'number') {
    const na = Number.isFinite(Number(a)) ? Number(a) : 0
    const nb = Number.isFinite(Number(b)) ? Number(b) : 0
    return (na - nb) * dir
  }
  if (type === 'date' || type === 'datetime') {
    const ta = toDate(a)
    const tb = toDate(b)
    const na = ta != null ? ta.getTime() : 0
    const nb = tb != null ? tb.getTime() : 0
    return (na - nb) * dir
  }
  return toText(a).localeCompare(toText(b)) * dir
}

export function matchesRecord(record, filters, columns) {
  return Object.keys(columns).every((key) =>
    matchValue(record[key], filters[key], columns[key]?.type || 'text')
  )
}
