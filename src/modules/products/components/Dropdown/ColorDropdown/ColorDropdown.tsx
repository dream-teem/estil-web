import { Text } from '@/components/Typography/Text'
import { useColors } from '@/modules/products/hooks/useColors'
import { ProductColor } from '@/modules/products/types'
import { useTranslation } from 'next-i18next'
import * as Styled from './styles'

type Props = {
  onChange: (c: ColorCircle) => void
  active: number[]
  max?: number
  multicolor?: boolean
}

type ColorCircle = Pick<
  ProductColor,
  'border' | 'code' | 'title' | 'hex' | 'id'
>

function ColorDropdown({
  onChange,
  active,
  multicolor = false,
  max = 2
}: Props) {
  const { t } = useTranslation('common')
  const colorsData: ColorCircle[] = useColors()
  let colors = [...colorsData]
  if (multicolor)
    colors.push({
      hex: 'linear-gradient(to right,red 0,#ff8000 10%,#ff0 20%,#80ff00 30%,#0f0 40%,#00ff80 50%,#0ff 60%,#0ff 70%,#00f 80%,#8000ff 90%,#ff0080 100%)',
      border: '#b7a9a7',
      title: t('color.multicolor'),
      code: t('color.multicolor'),
      id: 0
    })

  const handleChange = (c: ColorCircle) => {
    const exists = active.indexOf(c.id) !== -1

    if (!exists && max !== 0 && active.length >= max) return

    onChange?.(c)
  }

  return (
    <Styled.ColorSelectWrapper>
      {colors.map(c => {
        const isActive = active.includes(c.id)

        return (
          <Styled.ColorItem
            key={`color-select-${c.id}`}
            onClick={() => handleChange(c)}
          >
            <Styled.ColorCircle
              active={isActive}
              hex={c.hex}
              borderHex={c.border}
            />
            <Text
              variant="s"
              color={
                max !== 0 && active.length === max && !isActive
                  ? 'disabled'
                  : 'primary'
              }
            >
              {c.title}
            </Text>
          </Styled.ColorItem>
        )
      })}
    </Styled.ColorSelectWrapper>
  )
}

export default ColorDropdown
