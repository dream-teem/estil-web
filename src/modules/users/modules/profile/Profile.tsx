import { Spacer } from '@/components/Elements/Spacer/Spacer'
import { Text } from '@/components/Typography/Text'
import ProductList from '@/modules/products/components/ProductList/ProductList'
import productApi from '@/services/products/api'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { ProfileContainer } from './components/Container/Container'
import ProfileInfo from './components/ProfileInfo/ProfileInfo'
import { UserProfile } from './types'

type Props = {
  user: UserProfile
}
function Profile({ user }: Props) {
  const { data, isLoading, error } =
    productApi.endpoints.getShopProducts.useQuery({
      userId: user.id,
      allItems: true,
      offset: 0, // TODO: make pagination
      limit: 24
    })

  const { t } = useTranslation('product')
  return (
    <>
      <ProfileContainer>
        <ProfileInfo user={user} />
        <Spacer />
      </ProfileContainer>
      {data?.products && <ProductList products={data?.products} />}
      {!isLoading && !error && data?.products?.length === 0 && (
        <Text>{t('noProduct')}</Text>
      )}
    </>
  )
}

export default Profile
