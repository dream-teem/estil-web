import { ProductImage } from '@/modules/products/types'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import * as yup from 'yup'
import { FieldValues } from '../../ProductForm'
import ImageDropzone from './components/ImageDropzone/ImageDropzone'

export const getImageSchema = () =>
  yup
    .array()
    .of(
      yup.object({
        id: yup.number().required()
      })
    )
    .min(1, 'Выложите минимум  1 фото')

type Props = {
  productImages: ProductImage[]
}
export const ImageForm = ({ productImages }: Props) => {
  const { control } = useFormContext<Pick<FieldValues, 'images'>>()

  return (
    <>
      <Controller
        control={control}
        name="images"
        defaultValue={productImages}
        render={({ field: { onChange }, fieldState: { error }, formState }) => (
          <ImageDropzone
            onChange={onChange}
            images={productImages}
            error={error?.message}
          />
        )}
      />
    </>
  )
}
