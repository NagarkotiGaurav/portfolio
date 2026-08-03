import { afterEach, describe, expect, it, vi } from 'vitest'
import { ContactSubmissionError, submitContactInquiry } from './contactService'

const validForm = {
  message: 'We need a payments platform rebuild for peak TPS.',
  problems: 'Latency under load',
  industry: 'Fintech',
  timeline: 'q1',
  budget: '250k',
  company: 'Acme Corp',
  name: 'Ada Lovelace',
  email: 'ada@acme.test',
  phone: '',
  preferredContact: 'email',
  _gotcha: '',
}

describe('submitContactInquiry', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('throws on validation failure without calling fetch', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    await expect(submitContactInquiry(validForm, 'not-valid')).rejects.toBeInstanceOf(
      ContactSubmissionError,
    )
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('posts JSON to the contact endpoint on success', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: { get: () => 'application/json' },
      json: async () => ({ success: true }),
    })
    vi.stubGlobal('fetch', fetchMock)

    const result = await submitContactInquiry(validForm, 'message')
    expect(result.ok).toBe(true)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, options] = fetchMock.mock.calls[0]
    expect(String(url)).toMatch(/formsubmit\.co\/ajax|formspree|http/)
    expect(options.method).toBe('POST')
    const body = JSON.parse(options.body)
    expect(body.email).toBe('ada@acme.test')
    expect(body.intent).toBe('message')
    expect(body.message).toMatch(/payments platform/)
  })

  it('maps network failures to ContactSubmissionError', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new TypeError('Failed to fetch')),
    )
    await expect(submitContactInquiry(validForm, 'schedule_call')).rejects.toMatchObject({
      name: 'ContactSubmissionError',
      message: expect.stringMatching(/Unable to reach/i),
    })
  })

  it('maps non-OK responses to ContactSubmissionError', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 502,
        headers: { get: () => 'application/json' },
        json: async () => ({ message: 'Upstream unavailable' }),
      }),
    )
    await expect(submitContactInquiry(validForm, 'message')).rejects.toMatchObject({
      name: 'ContactSubmissionError',
      status: 502,
      message: 'Upstream unavailable',
    })
  })
})
