import Dropdown from '@/components/Dropdown/Dropdown'
import { useSizeGroups } from '@/modules/products/hooks/useSizeGroups'
import { CategoryWithoutChildren, ProductSize } from '@/modules/products/types'
import { Checkmark } from '@styled-icons/ionicons-outline/Checkmark'
import * as Styled from './styles'

type Props = {
  category: CategoryWithoutChildren
  active: number[]
  onChange?: (size: ProductSize) => void
}
export const SizeGroupCategory = ({ onChange, category, active }: Props) => {
  const { sizeGroups } = useSizeGroups()

  const sizeGroupList = category.sizeGroups
    .map(id => sizeGroups[id])
    .filter(sg => sg !== undefined)

  if (sizeGroupList.length === 1)
    return (
      <Dropdown>
        {sizeGroupList[0].sizes.map(size => (
          <Dropdown.Item
            key={size.id}
            title={size.title}
            rightIcon={active.includes(size.id) && <Checkmark width={22} />}
            onClick={() => onChange?.(size)}
          />
        ))}
      </Dropdown>
    )

  return (
    <Dropdown>
      {sizeGroupList.map(sg => (
        <Dropdown.CollapsibleItem key={sg.id} title={sg.title}>
          <Styled.SizeGroupWrapper>
            {sg.sizes.map(size => (
              <Styled.SizeItem
                key={size.id}
                active={active.includes(size.id)}
                onClick={() => onChange?.(size)}
              >
                {size.title}
              </Styled.SizeItem>
            ))}
          </Styled.SizeGroupWrapper>
        </Dropdown.CollapsibleItem>
      ))}
    </Dropdown>
  )
}
