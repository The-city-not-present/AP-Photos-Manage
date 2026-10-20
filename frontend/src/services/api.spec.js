import { describe, it, expect, vi, afterEach } from 'vitest'
import { listProjects, createProject, deleteProject, scanFolder } from './api.js'

afterEach(() => {
  vi.unstubAllGlobals()
})

function stubFetch(body, ok = true, status = 200) {
  const fetchMock = vi.fn().mockResolvedValue({
    ok,
    status,
    json: () => Promise.resolve(body),
  })
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

describe('listProjects', () => {
  it('fetches the projects list', async () => {
    const data = [{ id: '1', name: 'Trip' }]
    const fetchMock = stubFetch(data)

    await expect(listProjects()).resolves.toEqual(data)
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/projects',
      expect.objectContaining({ method: 'GET' })
    )
  })
})

describe('createProject', () => {
  it('POSTs the payload', async () => {
    const data = { id: '1', name: 'Trip' }
    const fetchMock = stubFetch(data)

    await expect(createProject({ name: 'Trip', folder: '/photos' })).resolves.toEqual(data)
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/projects',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ name: 'Trip', folder: '/photos' }),
      })
    )
  })
})

describe('deleteProject', () => {
  it('DELETEs the project and returns null for a 204', async () => {
    const fetchMock = stubFetch(null, true, 204)

    await expect(deleteProject('abc')).resolves.toBeNull()
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/projects/abc',
      expect.objectContaining({ method: 'DELETE' })
    )
  })
})

describe('scanFolder', () => {
  it('POSTs the path', async () => {
    const data = [{ name: 'a.jpg' }]
    const fetchMock = stubFetch(data)

    await expect(scanFolder('/photos')).resolves.toEqual(data)
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/folders/scan',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ path: '/photos' }),
      })
    )
  })
})

describe('request errors', () => {
  it('throws the backend detail message', async () => {
    stubFetch({ detail: 'name is required' }, false, 422)

    await expect(createProject({ name: '', folder: '/photos' })).rejects.toThrow(
      'name is required'
    )
  })
})

