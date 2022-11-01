export const parseError = (error: any) => {
  let message = 'Неполадки на сервере, попробуйте позже'
  if (error?.status) {
    switch (error.status) {
      case 400:
        message = error.data?.message || message
        break
      case 404:
        message = error.data?.message || message
        break
      default:
        message = error.data?.message || message
        break
    }
  }

  return { message }
}
