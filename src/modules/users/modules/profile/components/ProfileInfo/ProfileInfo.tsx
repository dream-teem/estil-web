import { Spacer } from '@/components/Elements/Spacer/Spacer'
import moment from 'moment'
import 'moment/locale/ru'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { UserProfile } from '../../types'
import { ProfileInfoContainer } from './components/Container/Container'
import ProfileBasicInfo from './components/ProfileBasicInfo/ProfileBasicInfo'
import ProfileDescription from './components/ProfileDescription/ProfileDescription'
import ProfileFollowingInfo from './components/ProfileFollowingInfo/ProfileFollowingInfo'
import ProfileProductInfo from './components/ProfileProductInfo/ProfileProductInfo'

type Props = {
  user: UserProfile
}

function ProfileInfo({ user }: Props) {
  const {
    i18n: { language }
  } = useTranslation()

  const getActiveDate = () => {
    return moment(user.lastLoggedIn).locale(language).fromNow()
  }
  return (
    <ProfileInfoContainer>
      <ProfileBasicInfo user={user} />
      <Spacer variant="m" />
      <ProfileProductInfo
        lastActive={getActiveDate()}
        productCount={user.productCount}
      />
      <Spacer variant="m" />
      <ProfileDescription description={user.description} />
      <Spacer variant="m" />
      <ProfileFollowingInfo user={user} />
    </ProfileInfoContainer>
  )
}

export default ProfileInfo
