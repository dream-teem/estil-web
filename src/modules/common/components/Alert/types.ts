export type AlertState = {
  alerts: Alert[]
}

export type Alert = {
  message: string
  type: 'success' | 'info' | 'warning' | 'error'
}
