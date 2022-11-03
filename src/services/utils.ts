import { RequestContext } from 'next/dist/server/base-server'

export const isRequestContext = (ctx: unknown): ctx is RequestContext => {
  const reqCtx = ctx as RequestContext

  return reqCtx && 'req' in reqCtx && 'headers' in reqCtx.req
}
