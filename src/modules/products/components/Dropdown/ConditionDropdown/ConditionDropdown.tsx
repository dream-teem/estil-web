import Dropdown from '@/components/Dropdown/Dropdown'
import { useConditions } from '@/modules/products/hooks/useConditions'
import { ProductCondition } from '@/modules/products/types'
import { Checkmark } from '@styled-icons/ionicons-outline/Checkmark'
import * as Styled from './styles'

type Props = {
  onChange: (c: ProductCondition) => void
  active: number[]
}

function ConditionDropdown({ onChange, active }: Props) {
  const conditions: ProductCondition[] = useConditions()

  const DropdownIcon = ({
    condition
  }: Record<'condition', ProductCondition>) => {
    if (active.includes(condition.id)) return <Checkmark width={22} />
    return null
  }

  return (
    <Styled.ConditionDropdownWrapper>
      <Dropdown>
        {conditions.map(c => (
          <Dropdown.Item
            key={c.id}
            title={c.title}
            onClick={() => onChange?.(c)}
            rightIcon={<DropdownIcon condition={c} />}
          />
        ))}
      </Dropdown>
    </Styled.ConditionDropdownWrapper>
  )
}

export default ConditionDropdown
