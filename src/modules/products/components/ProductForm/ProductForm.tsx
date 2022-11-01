import Button from '@/components/Elements/Button/Button'
import { Spacer } from '@/components/Elements/Spacer/Spacer'
import { useAuth } from '@/hooks/useAuth'
import {
  CategoryWithoutChildren,
  Product,
  ProductColor
} from '@/modules/products/types'
import { GetProductResponse } from '@/services/products/types'
import { City } from '@/types/entities'
import { yupResolver } from '@hookform/resolvers/yup'
import { pick } from 'lodash'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import {
  BasicInfoForm,
  getBasicInfoSchema
} from './components/BasicInfoForm/BasicInfoForm'
import { getImageSchema, ImageForm } from './components/ImageForm/ImageForm'
import {
  getLocationSchema,
  LocationForm
} from './components/LocationForm/LocationForm'
import {
  getProductInfoSchema,
  ProductInfoForm
} from './components/ProductInfoForm/ProductInfoForm'
import * as Styled from './styles'

export interface ProductFormProps {
  product?: GetProductResponse
  onSubmit: (product: FieldValues) => void
  isSubmitting?: boolean
}

export type FieldValues = {
  basicInfo: Pick<Product, 'description'>
  productInfo: Pick<Product, 'brand' | 'condition' | 'size' | 'price'> & {
    category: CategoryWithoutChildren // this is needed to avoid circular dependcy https://github.com/react-hook-form/react-hook-form/discussions/7764
    colors: ProductColor[]
  }
  location: {
    city: City
  }
  images: Product['images']
}

export const ProductForm = ({
  product,
  onSubmit,
  isSubmitting
}: ProductFormProps) => {
  const { t } = useTranslation('common')
  const { user } = useAuth()
  const schema = yup.object().shape({
    images: getImageSchema(),
    productInfo: getProductInfoSchema(),
    basicInfo: getBasicInfoSchema(),
    location: getLocationSchema()
  })

  const methods = useForm<FieldValues>({
    mode: 'onBlur',
    defaultValues: {
      basicInfo: {
        ...pick(product, 'description')
      },
      productInfo: {
        ...pick(
          product,
          'brand',
          'condition',
          'size',
          'price',
          'category',
          'colors'
        )
      },
      images: product?.images,
      location: {
        city: product?.city || user?.city
      }
    },
    resolver: yupResolver(schema)
  })

  return (
    <FormProvider {...methods}>
      <Styled.Form onSubmit={methods.handleSubmit(onSubmit)}>
        <ImageForm productImages={product?.images || []} />
        <Spacer variant="m" />
        <BasicInfoForm />
        <Spacer variant="m" />
        <ProductInfoForm />
        <Spacer variant="m" />
        <LocationForm />
        <Spacer variant="l" />
        <Button isLoading={isSubmitting} fullWidth={true} type="submit">
          {t('save')}
        </Button>
      </Styled.Form>
    </FormProvider>
  )
}
