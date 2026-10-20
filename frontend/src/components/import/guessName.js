// Basic project-name guesser: derive a readable name from a folder path.

export function guessProjectName(folderPath) {
  if (typeof folderPath !== 'string') return ''

  const trimmed = folderPath.trim().replace(/[\\/]+$/, '')
  if (!trimmed) return ''

  const base = trimmed.split(/[\\/]/).pop() || ''
  return base.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim()
}
