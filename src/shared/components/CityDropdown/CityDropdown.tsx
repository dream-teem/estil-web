import { City } from '@/types/entities'
import { Checkmark } from '@styled-icons/ionicons-outline'
import { useTranslation } from 'next-i18next'
import React from 'react'
import Dropdown from '../Dropdown/Dropdown'
import SearchBar from '../SearchBar/SearchBar'
import { Text } from '../Typography/Text'
import * as Styled from './styles'
import { useCities } from './useCities'

type Props = {
  active: number[]
  current?: number
  onChange?: (city: City) => void
}

function CityDropdown({ active, onChange, current }: Props) {
  const { t } = useTranslation('common')
  const { cities, searchCities, search } = useCities()

  const onCityChange = (city: City) => {
    onChange?.(city)
  }

  return (
    <Styled.CityDropdownWrapper>
      <Styled.DropdownHeader>
        <SearchBar search={search} onChange={searchCities} mobile={true} />
      </Styled.DropdownHeader>
      <Styled.CityDropdownContent>
        {cities.length > 0 ? (
          <Dropdown>
            {cities.map(city => (
              <Dropdown.Item
                key={`cities-dropdown-item-${city.id}`}
                title={city.name}
                onClick={() => onCityChange(city)}
                rightIcon={
                  (current === city.id || active.includes(city.id)) && (
                    <Checkmark width={22} />
                  )
                }
              />
            ))}
          </Dropdown>
        ) : (
          <Text className="not-found-text"> {t('notFound')}</Text>
        )}
      </Styled.CityDropdownContent>
    </Styled.CityDropdownWrapper>
  )
}

export default CityDropdown
