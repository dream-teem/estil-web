export type PaginatedResponse<K extends string, V> = Record<K, V> &
  Record<
    'metadata',
    {
      hasMore: boolean
      resultCount: number
      offset: number
    }
  >
