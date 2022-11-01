import throttle from 'lodash/throttle'
import { useLayoutEffect, useState } from 'react'

const getDeviceConfig = (width: number) => {
  if (width < 320) {
    return 'xs'
  } else if (width >= 320 && width < 720) {
    return 'sm'
  } else if (width >= 720 && width < 1024) {
    return 'md'
  }
  return 'lg'
}

const useBreakpoint = () => {
  const [brkPnt, setBrkPnt] = useState<ReturnType<typeof getDeviceConfig>>(() =>
    getDeviceConfig(window.innerWidth)
  )

  useLayoutEffect(() => {
    const calcInnerWidth = throttle(function () {
      setBrkPnt(getDeviceConfig(window.innerWidth))
    }, 200)
    window.addEventListener('resize', calcInnerWidth)
    return () => window.removeEventListener('resize', calcInnerWidth)
  }, [])

  return brkPnt
}
export default useBreakpoint
