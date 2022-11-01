import { components } from '@octokit/openapi-types'
import { NextPage } from 'next'

export type PaginationParams = Pick<
  components['parameters'],
  'per-page' | 'page'
>

export type AppComponentProps = {
  getLayout: (page: JSX.Element) => JSX.Element
  auth?:
    | {
        redirect?: string
      }
    | boolean
}
export type AppNextPage<P = {}> = NextPage<P> & AppComponentProps
