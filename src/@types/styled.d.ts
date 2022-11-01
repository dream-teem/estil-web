import { AppDefaultTheme } from '@/constants/theme'

declare module 'styled-components' {
  export interface DefaultTheme extends AppDefaultTheme {}
}
