import { AuthUser } from '@/modules/auth/types'
import { User } from '@/modules/users/types'

export type LoginResponse = AuthUser

export type LoginRequest = Pick<User, 'username'> & {
  password: string
}

export type RegisterRequest = LoginRequest &
  Pick<User, 'username' | 'cityId' | 'name'> & {
    verificationId: string
  }

export type RegisterResponse = AuthUser

export type SendVerificationRequest = {
  countryCode: string
  phone: string
}

export type SendVerificationResponse = {
  isVerified: boolean
  verificationId: string
}

export type ConfirmVerificationRequest = {
  verificationId: string
  smsCode: string
}

export type ConfirmVerificationResponse = {
  isVerified: boolean
}
