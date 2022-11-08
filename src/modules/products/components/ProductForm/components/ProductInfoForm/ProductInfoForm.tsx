import { Spacer } from '@/components/Elements/Spacer/Spacer'
import Form from '@/components/Form/Form'
import Tag from '@/components/Tag/Tag'
import { Text } from '@/components/Typography/Text'
import { Title } from '@/components/Typography/Title'
import { ProductCategory } from '@/modules/products/types'
import { isEmpty } from 'lodash'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import * as yup from 'yup'
import BrandDropdown from '../../../Dropdown/BrandDropdown/BrandDropdown'
import CategoryDropdown from '../../../Dropdown/CategoryDropdown/CategoryDropdown'
import ColorDropdown from '../../../Dropdown/ColorDropdown/ColorDropdown'
import ConditionDropdown from '../../../Dropdown/ConditionDropdown/ConditionDropdown'
import SizeGroupDropdown from '../../../Dropdown/SizeGroupDropdown/SizeGroupDropdown'
import { FieldValues } from '../../ProductForm'
import SelectField from '../SelectField/SelectField'
import * as Styled from './styles'

export const getProductInfoSchema = () =>
  yup.object().shape({
    category: yup
      .object()
      .shape({
        id: yup.number().required('Укажите категорию')
      })
      .required(),
    condition: yup.object().shape({
      id: yup.number().required('Укажите состояние')
    }),
    colors: yup.array().of(
      yup.object({
        id: yup.number().required()
      })
    ),
    brand: yup
      .object()
      .shape({
        id: yup.number().required()
      })
      .nullable(true)
      .default(null),
    size: yup.object().when('category', {
      is: (c: ProductCategory) => Boolean(c.sizeGroupId),
      then: yup.object().shape({
        id: yup.number().required('Укажите размер')
      }),
      otherwise: yup.object().nullable()
    }),
    price: yup.number().required('Укажите цену').typeError('Укажите цену')
  })

export const ProductInfoForm = () => {
  const { formState, control, register, getValues, resetField } =
    useFormContext<Pick<FieldValues, 'productInfo'>>()
  const { t } = useTranslation(['common', 'product'])
  const values = getValues()
  const category = values?.productInfo?.category
  const errors = formState.errors.productInfo

  return (
    <>
      <Title>{t('product:form.info')}</Title>
      <Controller
        control={control}
        name="productInfo.category"
        render={({ field: { onChange, value } }) => (
          <>
            <Styled.FieldRow>
              <Text>{t('product:category')}</Text>
              <SelectField
                value={value?.name}
                placeholder={t('common:select')}
                label={t('product:category')}
                dropdown={
                  <CategoryDropdown
                    active={value ? [value.id] : []}
                    onChange={category => {
                      onChange(category)
                      resetField('productInfo.size')
                    }}
                  />
                }
              />
            </Styled.FieldRow>
            <Styled.ErrorMessage>
              {errors?.category?.id?.message}
            </Styled.ErrorMessage>
          </>
        )}
      />

      <Controller
        control={control}
        name="productInfo.size"
        render={({ field: { onChange, value } }) => (
          <>
            {category && !isEmpty(category.sizeGroups) && (
              <>
                <Styled.FieldRow>
                  <Text>{t('product:size')}</Text>
                  <SelectField
                    value={value?.title || t('common:select')}
                    label={t('product:size')}
                    dropdown={
                      <SizeGroupDropdown
                        active={value?.id ? [value.id] : []}
                        category={category}
                        onChange={onChange}
                      />
                    }
                  />
                </Styled.FieldRow>
                <Styled.ErrorMessage>
                  {(errors?.size as any)?.id?.message}
                </Styled.ErrorMessage>
              </>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="productInfo.brand"
        render={({ field: { onChange, value } }) => (
          <>
            <Styled.FieldRow>
              <Text>{t('product:brand')}</Text>
              <SelectField
                value={
                  value === null
                    ? t('product:brand.noBrand')
                    : value
                    ? value.name
                    : t('common:select')
                }
                label={t('product:brand')}
                dropdown={
                  <BrandDropdown
                    optional={true}
                    active={value?.id ? [value.id] : value === null ? [0] : []}
                    onChange={onChange}
                    onReset={() => onChange(null)}
                  />
                }
              />
            </Styled.FieldRow>
            <Styled.ErrorMessage>
              {(errors?.brand as any)?.id?.message}
            </Styled.ErrorMessage>
          </>
        )}
      />

      <Controller
        control={control}
        name="productInfo.condition"
        render={({ field: { onChange, value } }) => (
          <>
            <Styled.FieldRow>
              <Text>{t('product:condition')}</Text>
              <SelectField
                value={value?.title || t('common:select')}
                label={t('product:condition')}
                dropdown={
                  <ConditionDropdown
                    active={value?.id ? [value.id] : []}
                    onChange={onChange}
                  />
                }
              />
            </Styled.FieldRow>
            <Styled.ErrorMessage>
              {errors?.condition?.id?.message}
            </Styled.ErrorMessage>
          </>
        )}
      />

      <Controller
        control={control}
        name="productInfo.colors"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Styled.FieldRow>
              <Text>{t('product:color')}</Text>
              <SelectField
                value={
                  !isEmpty(value)
                    ? value.map(({ title }) => title).join(', ')
                    : t('common:select')
                }
                label={t('product:color')}
                closeOnSelect={false}
                dropdown={
                  <>
                    <Spacer />
                    <ColorDropdown
                      active={value ? value.map(({ id }) => id) : []}
                      onChange={c =>
                        onChange(
                          value?.find(({ id }) => id === c.id)
                            ? value.filter(({ id }) => id !== c.id)
                            : [...(value || []), c]
                        )
                      }
                    />
                    <Spacer variant="l" />
                    <>
                      {value &&
                        value.map(c => (
                          <Tag
                            key={c.id}
                            onClick={() =>
                              onChange(value.filter(({ id }) => id != c.id))
                            }
                            title={c.title}
                          />
                        ))}
                    </>
                  </>
                }
              />
            </Styled.FieldRow>
            <Styled.ErrorMessage>{error?.message}</Styled.ErrorMessage>
          </>
        )}
      />

      <Styled.FieldRow>
        <Text>{t('product:price')}</Text>
        <Form.InputField
          name="productInfo.price"
          type="number"
          placeholder="0"
          adornment="KZT"
          registration={register('productInfo.price')}
          variant="no-border"
          textAlignment="right"
        />
      </Styled.FieldRow>
      <Styled.ErrorMessage>{errors?.price?.message}</Styled.ErrorMessage>
    </>
  )
}
