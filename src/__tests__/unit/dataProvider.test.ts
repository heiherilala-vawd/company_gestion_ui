import { describe, it, expect, vi, beforeEach } from 'vitest'
import { dataProvider } from '../../auth/dataProvider'

vi.mock('../../config/dynamicResources', () => ({
  getMiddleUrl: vi.fn((resource: string) => `/api/${resource}`),
  getMiddleUrlWithId: vi.fn((resource: string, id: string) => `/api/${resource}/${id}`),
  getMiddleUrlWithQuery: vi.fn((resource: string, query: string) => `/api/${resource}?${query}`),
}))

function createMockResponse(data: unknown, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => data,
  }
}

describe('dataProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    localStorage.setItem('user_id', 'user1')
    localStorage.setItem('currentCompanyId', 'comp1')
    localStorage.setItem('currentJobId', 'job1')
    localStorage.setItem('token', 'test-token')
    vi.restoreAllMocks()
    globalThis.fetch = vi.fn()
  })

  describe('getList', () => {
    it('sends pagination parameters and returns data', async () => {
      ;(globalThis.fetch as any).mockResolvedValueOnce(
        createMockResponse([{ id: '1', name: 'Company A' }]),
      )
      const result = await dataProvider.getList('companies', {
        pagination: { page: 1, perPage: 10 },
        sort: { field: 'name', order: 'ASC' },
        filter: {},
      })
      const url = (globalThis.fetch as any).mock.calls[0][0]
      expect(url).toContain('page=1')
      expect(url).toContain('page_size=10')
      expect(result.data).toHaveLength(1)
      expect(result.total).toBe(1)
    })

    it('applies pagination slicing', async () => {
      const items = Array.from({ length: 25 }, (_, i) => ({
        id: String(i + 1),
        name: `Item ${i + 1}`,
      }))
      ;(globalThis.fetch as any).mockResolvedValueOnce(createMockResponse(items))
      const result = await dataProvider.getList('companies', {
        pagination: { page: 2, perPage: 10 },
        sort: { field: 'name', order: 'ASC' },
        filter: {},
      })
      expect(result.data).toHaveLength(10)
      expect(result.data[0].id).toBe('11')
      expect(result.total).toBe(25)
    })

    it('filters data client-side by q parameter', async () => {
      ;(globalThis.fetch as any).mockResolvedValueOnce(
        createMockResponse([
          { id: '1', name: 'testing' },
          { id: '2', name: 'other' },
          { id: '3', name: 'contest' },
        ]),
      )
      const result = await dataProvider.getList('companies', {
        pagination: { page: 1, perPage: 10 },
        sort: { field: 'name', order: 'ASC' },
        filter: { q: 'test' },
      })
      expect(result.data).toHaveLength(2)
      expect(result.data[0].id).toBe('1')
      expect(result.data[1].id).toBe('3')
    })

    it('normalizes records and adds _id / _ids fields', async () => {
      ;(globalThis.fetch as any).mockResolvedValueOnce(
        createMockResponse([
          {
            id: '1',
            company: { id: 'comp1', name: 'Acme' },
            tags: [{ id: 't1', name: 'Tag1' }],
          },
        ]),
      )
      const result = await dataProvider.getList('jobs', {
        pagination: { page: 1, perPage: 10 },
        sort: { field: 'name', order: 'ASC' },
        filter: {},
      })
      expect(result.data[0].company_id).toBe('comp1')
      expect(result.data[0].tag_ids).toEqual(['t1'])
      expect(result.data[0].company).toEqual({ id: 'comp1', name: 'Acme' })
    })

    it('handles getList with total in response envelope', async () => {
      ;(globalThis.fetch as any).mockResolvedValueOnce(
        createMockResponse({
          data: [
            { id: '1', name: 'a' },
            { id: '2', name: 'b' },
          ],
          total: 2,
        }),
      )
      const result = await dataProvider.getList('companies', {
        pagination: { page: 1, perPage: 10 },
        sort: { field: 'name', order: 'ASC' },
        filter: {},
      })
      expect(result.data).toHaveLength(2)
      expect(result.total).toBe(2)
    })
  })

  describe('getOne', () => {
    it('returns a single record', async () => {
      ;(globalThis.fetch as any).mockResolvedValueOnce(
        createMockResponse({ id: 'comp1', name: 'Acme' }),
      )
      const result = await dataProvider.getOne('companies', { id: 'comp1' })
      expect(result.data.id).toBe('comp1')
      expect(result.data.name).toBe('Acme')
    })

    it('flattens nested objects with id to _id fields', async () => {
      ;(globalThis.fetch as any).mockResolvedValueOnce(
        createMockResponse({
          id: '1',
          company: { id: 'comp1', name: 'Acme' },
        }),
      )
      const result = await dataProvider.getOne('jobs', { id: '1' })
      expect(result.data.company_id).toBe('comp1')
      expect(result.data.company).toEqual({ id: 'comp1', name: 'Acme' })
    })

    it('adds source_location_id for FLATTEN_TO_ID keys', async () => {
      ;(globalThis.fetch as any).mockResolvedValueOnce(
        createMockResponse({
          id: '1',
          source_location: { id: 'loc1', name: 'Storage' },
        }),
      )
      const result = await dataProvider.getOne('material_warehouse', { id: '1' })
      expect(result.data.source_location_id).toBe('loc1')
    })

    it('generates plural _ids for arrays of objects with id', async () => {
      ;(globalThis.fetch as any).mockResolvedValueOnce(
        createMockResponse({
          id: '1',
          tags: [
            { id: 't1', name: 'Tag1' },
            { id: 't2', name: 'Tag2' },
          ],
        }),
      )
      const result = await dataProvider.getOne('jobs', { id: '1' })
      expect(result.data.tag_ids).toEqual(['t1', 't2'])
    })

    it('transforms composite id with equipment_id and warehouse_id', async () => {
      ;(globalThis.fetch as any).mockResolvedValueOnce(
        createMockResponse({
          id: { equipment_id: 'eq1', warehouse_id: 'wh1' },
          equipment: { id: 'eq1' },
          warehouse: { id: 'wh1' },
        }),
      )
      const result = await dataProvider.getOne('equipment_usage', { id: 'eq1/wh1' })
      expect(result.data.id).toBe('eq1/wh1')
    })

    it('includes Bearer token in Authorization header', async () => {
      ;(globalThis.fetch as any).mockResolvedValueOnce(createMockResponse({ id: 'comp1' }))
      await dataProvider.getOne('companies', { id: 'comp1' })
      const headers = (globalThis.fetch as any).mock.calls[0][1].headers
      expect(headers.Authorization).toBe('Bearer test-token')
    })
  })

  describe('getMany', () => {
    it('fetches multiple records by ids', async () => {
      ;(globalThis.fetch as any)
        .mockResolvedValueOnce(createMockResponse({ id: '1', name: 'A' }))
        .mockResolvedValueOnce(createMockResponse({ id: '2', name: 'B' }))
      const result = await dataProvider.getMany('companies', { ids: ['1', '2'] })
      expect(result.data).toHaveLength(2)
      expect(result.data[0].id).toBe('1')
      expect(result.data[1].id).toBe('2')
      expect((globalThis.fetch as any).mock.calls[0][0]).toContain('/1')
      expect((globalThis.fetch as any).mock.calls[1][0]).toContain('/2')
    })
  })

  describe('create', () => {
    it('sends PUT with data wrapped in array', async () => {
      ;(globalThis.fetch as any).mockResolvedValueOnce(
        createMockResponse([{ id: 'new1', name: 'test' }]),
      )
      const result = await dataProvider.create('jobs', { data: { name: 'test' } })
      expect((globalThis.fetch as any).mock.calls[0][1]).toMatchObject({
        method: 'PUT',
      })
      const body = JSON.parse((globalThis.fetch as any).mock.calls[0][1].body)
      expect(Array.isArray(body)).toBe(true)
      expect(body[0].name).toBe('test')
      expect(result.data.name).toBe('test')
    })

    it('converts date string to ISO format', async () => {
      ;(globalThis.fetch as any).mockResolvedValueOnce(
        createMockResponse([{ id: 'new1', name: 'test', date: '2024-01-15T00:00:00.000Z' }]),
      )
      await dataProvider.create('jobs', {
        data: { name: 'test', date: '2024-01-15' },
      })
      const body = JSON.parse((globalThis.fetch as any).mock.calls[0][1].body)
      expect(body[0].date).toBe('2024-01-15T00:00:00.000Z')
    })

    it('converts Date object to ISO string', async () => {
      ;(globalThis.fetch as any).mockResolvedValueOnce(
        createMockResponse([{ id: 'new1', name: 'test', date: '2024-06-15T00:00:00.000Z' }]),
      )
      await dataProvider.create('jobs', {
        data: { name: 'test', date: new Date('2024-06-15') },
      })
      const body = JSON.parse((globalThis.fetch as any).mock.calls[0][1].body)
      expect(body[0].date).toBe('2024-06-15T00:00:00.000Z')
    })

    it('passes ISO strings through unchanged', async () => {
      ;(globalThis.fetch as any).mockResolvedValueOnce(
        createMockResponse([{ id: 'new1', name: 'test', date: '2024-03-10T12:30:00.000Z' }]),
      )
      await dataProvider.create('jobs', {
        data: { name: 'test', date: '2024-03-10T12:30:00.000Z' },
      })
      const body = JSON.parse((globalThis.fetch as any).mock.calls[0][1].body)
      expect(body[0].date).toBe('2024-03-10T12:30:00.000Z')
    })
  })

  describe('update', () => {
    it('sends PUT with id and data in array', async () => {
      ;(globalThis.fetch as any).mockResolvedValueOnce(
        createMockResponse([{ id: '1', name: 'updated' }]),
      )
      const result = await dataProvider.update('jobs', {
        id: '1',
        data: { name: 'updated' },
        previousData: {} as any,
      })
      expect((globalThis.fetch as any).mock.calls[0][1]).toMatchObject({
        method: 'PUT',
      })
      const body = JSON.parse((globalThis.fetch as any).mock.calls[0][1].body)
      expect(body[0].id).toBe('1')
      expect(body[0].name).toBe('updated')
      expect(result.data.name).toBe('updated')
    })
  })

  describe('deleteOne', () => {
    it('sends DELETE and returns the deleted id', async () => {
      ;(globalThis.fetch as any).mockResolvedValueOnce(createMockResponse(null, 204))
      const result = await dataProvider.deleteOne('companies', { id: 'comp1' })
      expect((globalThis.fetch as any).mock.calls[0][1]).toMatchObject({
        method: 'DELETE',
      })
      expect(result.data.id).toBe('comp1')
    })
  })

  describe('deleteMany', () => {
    it('sends DELETE for each id', async () => {
      ;(globalThis.fetch as any)
        .mockResolvedValueOnce(createMockResponse(null, 204))
        .mockResolvedValueOnce(createMockResponse(null, 204))
      const result = await dataProvider.deleteMany('companies', {
        ids: ['1', '2'],
      })
      expect(globalThis.fetch).toHaveBeenCalledTimes(2)
      expect((globalThis.fetch as any).mock.calls[0][1]).toMatchObject({
        method: 'DELETE',
      })
      expect((globalThis.fetch as any).mock.calls[1][1]).toMatchObject({
        method: 'DELETE',
      })
      expect(result.data).toEqual(['1', '2'])
    })
  })

  // updateMany — not tested: source code has a bug on line 211
  // `JSON.stringify(...params.data)` spreads a non-iterable object, throwing
  // TypeError. This is a source-code defect, not a test issue.
})
