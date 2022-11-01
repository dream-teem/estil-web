import React, { useRef } from 'react'

type Props = {
  onChange: (files: File[]) => void
}

export const useDropzone = ({ onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const openFileDialog = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
      inputRef.current.click()
    }
  }

  const onFilesAdded = ({
    target: { files }
  }: React.ChangeEvent<HTMLInputElement>) => {
    onChange(fileListToArray(files))
  }

  const fileListToArray = (list: FileList | null) => {
    return Array.from(list || [])
  }

  return {
    wrapperProps: {
      onClick: openFileDialog
    },
    inputProps: {
      ref: inputRef,
      onChange: onFilesAdded,
      type: 'file'
    }
  }
}
