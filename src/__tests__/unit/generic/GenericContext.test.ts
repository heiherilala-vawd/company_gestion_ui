import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { createGenericContext } from '../../../generic/GenericContext'

describe('GenericContext', () => {
  const testConfig = { storageKey: 'testKey', entityName: 'Test' }

  beforeEach(() => {
    localStorage.clear()
  })

  it('returns Provider, useEntity, and config', () => {
    const result = createGenericContext(testConfig)
    expect(result).toHaveProperty('Provider')
    expect(result).toHaveProperty('useEntity')
    expect(result).toHaveProperty('config')
  })

  it('config has correct storageKey and entityName', () => {
    const result = createGenericContext(testConfig)
    expect(result.config.storageKey).toBe('testKey')
    expect(result.config.entityName).toBe('Test')
  })

  it('Provider initializes currentId from localStorage when key exists', () => {
    localStorage.setItem('testKey', 'existing-id')
    const { Provider, useEntity } = createGenericContext(testConfig)
    const { result } = renderHook(() => useEntity(), { wrapper: Provider })
    expect(result.current.currentId).toBe('existing-id')
  })

  it('Provider initializes currentId as null when localStorage key missing', () => {
    const { Provider, useEntity } = createGenericContext(testConfig)
    const { result } = renderHook(() => useEntity(), { wrapper: Provider })
    expect(result.current.currentId).toBeNull()
  })

  it('selectEntity(id) updates currentId and sets localStorage', () => {
    const { Provider, useEntity } = createGenericContext(testConfig)
    const { result } = renderHook(() => useEntity(), { wrapper: Provider })

    act(() => {
      result.current.selectEntity('456')
    })

    expect(result.current.currentId).toBe('456')
    expect(localStorage.getItem('testKey')).toBe('456')
  })

  it('selectEntity(null) updates currentId to null and removes localStorage', () => {
    localStorage.setItem('testKey', 'existing')
    const { Provider, useEntity } = createGenericContext(testConfig)
    const { result } = renderHook(() => useEntity(), { wrapper: Provider })

    act(() => {
      result.current.selectEntity(null)
    })

    expect(result.current.currentId).toBeNull()
    expect(localStorage.getItem('testKey')).toBeNull()
  })

  it('clearEntity() sets null and removes from localStorage', () => {
    localStorage.setItem('testKey', 'existing')
    const { Provider, useEntity } = createGenericContext(testConfig)
    const { result } = renderHook(() => useEntity(), { wrapper: Provider })

    act(() => {
      result.current.clearEntity()
    })

    expect(result.current.currentId).toBeNull()
    expect(localStorage.getItem('testKey')).toBeNull()
  })

  it('useEntity() outside of Provider throws Error with entityName in message', () => {
    const { useEntity } = createGenericContext(testConfig)

    expect(() => {
      renderHook(() => useEntity())
    }).toThrow('useEntity must be used within a TestProvider')
  })
})
