import usersApi from '@/services/users/api'
import { GetUserResponse } from '@/services/users/types'
import { useRouter } from 'next/router'
import React from 'react'
import { ProfileSettingsContainer } from './components/Container/Container'
import {
  FieldValues,
  SettingsForm
} from './components/SettingsForm/SettingsForm'

type Props = {
  user: GetUserResponse
}

function UserSettings({ user }: Props) {
  const router = useRouter()
  const [update, { isLoading }] = usersApi.endpoints.updateProfile.useMutation()

  const handleSubmit = async ({ city, ...values }: FieldValues) => {
    const res = await update({
      ...values,
      id: user.id,
      cityId: city?.id || null
    })
    if (!('error' in res) && user) router.push(`/profile/${user.username}`)
  }

  return (
    <ProfileSettingsContainer>
      <SettingsForm user={user} onSubmit={handleSubmit} />
    </ProfileSettingsContainer>
  )
}

export default UserSettings
