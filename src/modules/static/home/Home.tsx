import Button from '@/components/Elements/Button/Button'
import { Spacer } from '@/components/Elements/Spacer/Spacer'
import { Text } from '@/components/Typography/Text'
import { Title } from '@/components/Typography/Title'
import { config } from '@/config'
import { ProductPreview } from '@/modules/products/types'
import { UserPreview } from '@/modules/users/types'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import React from 'react'
import * as Styled from './styles'
type Props = {
  profiles?: UserPreview[]
  products?: ProductPreview[]
}

function Home({}: Props) {
  const { t } = useTranslation(['common', 'landing'])
  return (
    <Styled.HomeWrapper>
      <Styled.LandingImageWrapper>
        <picture>
          <source
            srcSet="/assets/images/landing-desktop.jpg"
            media="(min-width: 768px)"
          />
          <Styled.HeroImage
            className="image"
            src={'/assets/images/landing-mobile.jpg'}
          />
        </picture>
        <Styled.HeroContentWrapper>
          <Title>{config.seo.meta.og.siteName}</Title>
          <Spacer />
          <Text>{t('landing:description')}</Text>
          <Spacer />
          <Link href={'/products'}>
            <Button variant="outline" className="heroButton">
              {t('common:shop')}
            </Button>
          </Link>
        </Styled.HeroContentWrapper>
      </Styled.LandingImageWrapper>
    </Styled.HomeWrapper>
  )
}

export default Home
