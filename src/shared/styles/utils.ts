import { MediaDeviceSizes } from '@/constants/breakpoint'

export const getMq = (
  min: keyof typeof MediaDeviceSizes | null,
  max: keyof typeof MediaDeviceSizes | null
) => {
  if (min && max) {
    return `${minMq(min)} and ${maxMq(max)}`
  }
  if (min) return minMq(min)
  if (max) return maxMq(max)
}

const maxMq = (max: keyof typeof MediaDeviceSizes) => {
  return `(max-width: ${MediaDeviceSizes[max]}px)`
}

const minMq = (min: keyof typeof MediaDeviceSizes) => {
  return `(min-width: ${MediaDeviceSizes[min]}px)`
}
