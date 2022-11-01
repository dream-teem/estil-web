import { Text } from '@/components/Typography/Text'
import isNaN from 'lodash/isNaN'
import React, { useEffect, useState } from 'react'
import * as Styled from './styles'

type Props = {
  onPriceChange?: (price: Record<'min' | 'max', number | undefined>) => void
  currency: string
  min?: number
  max?: number
}

function PriceRangePicker({ currency, min, max, onPriceChange }: Props) {
  const [price, setPrice] = useState<Record<'min' | 'max', number | undefined>>(
    {
      min,
      max
    }
  )

  const getValue = (value: string) => {
    const val = Number(value.replace(currency, ''))
    if (!isNaN(val)) return val
    return
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onPriceChange?.(price)
    }, 600)

    return () => clearTimeout(delayDebounceFn)
  }, [price])

  const handleChange = (type: 'min' | 'max', val: string) => {
    const value = getValue(val)

    const newPrice = { ...price }

    if (type === 'max') newPrice.max = value
    else newPrice.min = value

    setPrice(newPrice)
  }

  return (
    <Styled.PriceRangeWrapper>
      <Styled.PriceInputWrapper>
        <Text>От</Text>
        <Styled.PriceInputField
          onChange={({ target: { value } }) => handleChange('min', value)}
          placeholder={'-'}
          value={price.min || ''}
        ></Styled.PriceInputField>
      </Styled.PriceInputWrapper>
      <Styled.PriceInputWrapper>
        <Text>До</Text>
        <Styled.PriceInputField
          onChange={({ target: { value } }) => handleChange('max', value)}
          placeholder={'-'}
          value={price.max || ''}
        ></Styled.PriceInputField>
      </Styled.PriceInputWrapper>
    </Styled.PriceRangeWrapper>
  )
}

export default PriceRangePicker
