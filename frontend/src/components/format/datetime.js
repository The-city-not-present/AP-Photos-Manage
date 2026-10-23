// Shared date/time conversion helpers.
//
// One source of truth for the only tricky part of frontend date handling:
// turning an incoming value into a native `Date` object. `new Date(value)` alone
// is ambiguous — a bare "YYYY-MM-DD" parses as UTC midnight, while a
// "YYYY-MM-DDTHH:mm" (from `<input type="datetime-local">`) parses as *local*
// time. That inconsistency is what causes off-by-one-day range matches around
// timezone boundaries, so it is centralized here instead of being re-derived in
// each component.
//
// Rules (see `.clinerules/06-dates-and-time.md`):
// - dates/timestamps inside the app are native `Date` objects;
// - a bare calendar date ("YYYY-MM-DD") is a *local* date;
// - anything with a time and no offset is *local* time;
// - full ISO timestamps ("...Z" / "...+02:00") keep their own timezone.

const DATE_ONLY_RE = /^\d{4}-\d{2}-\d{2}$/

const pad = (n) => String(n).padStart(2, '0')

// Normalize any input (Date | number | string) into a `Date`, or null when the
// value is blank or unparsable.
export function toDate(value) {
  if (value == null || value === '') return null
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value
  }
  if (typeof value === 'number') {
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? null : date
  }
  const str = String(value).trim()
  if (!str) return null
  if (DATE_ONLY_RE.test(str)) {
    const [year, month, day] = str.split('-').map(Number)
    return new Date(year, month - 1, day)
  }
  const date = new Date(str)
  return Number.isNaN(date.getTime()) ? null : date
}

// Format a Date as a local calendar date for `<input type="date">`.
export function toDateString(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

// Format a Date as local date+time for `<input type="datetime-local">`.
export function toDateTimeLocalString(date) {
  return `${toDateString(date)}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}
