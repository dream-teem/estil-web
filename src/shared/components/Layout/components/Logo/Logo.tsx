import { Title } from '@/components/Typography/Title'
import { config } from '@/config'
import Link from 'next/link'
import React from 'react'
import * as Styled from './styles'

type Props = {
  className?: string
}
function Logo({ className }: Props) {
  return (
    <Styled.LogoWrapper className={className}>
      <Link href="/">
        <Title color="secondary">{config.seo.meta.og.siteName}</Title>
      </Link>
    </Styled.LogoWrapper>
  )
}

export default Logo
