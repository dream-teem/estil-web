import { useState } from 'react'

export const useNavbar = () => {
  const [open, setOpen] = useState(false)

  const onClose = () => setOpen(false)

  const onOpen = () => setOpen(true)

  return { onOpen, onClose, open }
}
