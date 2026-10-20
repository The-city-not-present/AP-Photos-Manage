// Thin HTTP client for the backend API. Errors are thrown here and reported by
// the calling component (see services/errors.js) so nothing is ever silent.

async function request(path, { method = 'GET', body, headers = {} } = {}) {
  const response = await fetch(path, {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    body,
  })

  if (!response.ok) {
    let detail
    try {
      const parsed = await response.json()
      detail = parsed.detail
    } catch {
      detail = null
    }
    throw new Error(detail || `Request failed with status ${response.status}`)
  }

  if (response.status === 204) return null
  return response.json()
}

export function listProjects() {
  return request('/api/projects')
}

export function createProject(payload) {
  return request('/api/projects', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function deleteProject(id) {
  return request(`/api/projects/${encodeURIComponent(id)}`, { method: 'DELETE' })
}

export function scanFolder(path) {
  return request('/api/folders/scan', {
    method: 'POST',
    body: JSON.stringify({ path }),
  })
}

