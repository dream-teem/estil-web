import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { useProductFilter } from '@/modules/products/hooks/useProductFilter'
import { ArrowForward as ArrowForwardIcon } from '@styled-icons/ionicons-outline'
import { Search as SearchIcon } from '@styled-icons/ionicons-outline/Search'
import { useTranslation } from 'next-i18next'
import React, { useRef, useState } from 'react'
import * as Styled from './styles'
type Props = {
  search: string
  className?: string
  onChange?: (val: string) => void
  onSearch?: (val: string) => void
  mobile?: boolean
}

function SearchBar({ search, onChange, onSearch, mobile, className }: Props) {
  const { t } = useTranslation('common')
  const { updateFilter, filter } = useProductFilter()

  const [focus, setFocus] = useState(false)

  const ref = useRef(null)
  useOnClickOutside(ref, () => setFocus(false))

  const inputRef = useRef<HTMLInputElement | null>(null)

  // const { currentData: data } =
  //   productApi.endpoints.getSearchSuggestions.useQuery(search.trim(), {
  //     skip: !search
  //   })

  const handleSearch = (search: string) => {
    onSearch?.(search)
    inputRef?.current?.blur()
    setFocus(false)
    updateFilter({ ...filter, search: search.replaceAll('**', '') }, '/search')
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch(search)
    }
  }

  const handleClear = () => {
    onChange?.('')
    setFocus(true)
    inputRef?.current?.focus()
  }

  return (
    <Styled.SearchBarOuter ref={ref} className={className}>
      <Styled.SearchBarWrapper>
        <SearchIcon className="search-icon" width={27} />
        <Styled.SearchBarField
          ref={inputRef}
          onKeyDown={handleKeyDown}
          placeholder={t('header.search')}
          autoComplete="off"
          onChange={({ target: { value } }) => onChange?.(value)}
          value={search}
          onFocus={() => setFocus(true)}
        />
        {!!search && (
          <Styled.ClearButton onClick={handleClear}>
            {t('clear')}
          </Styled.ClearButton>
        )}
        {search && onSearch && (
          <ArrowForwardIcon
            className="arrow-button"
            width={24}
            onClick={() => handleSearch(search)}
          />
        )}
      </Styled.SearchBarWrapper>
      {/* {!isEmpty(data?.suggestions) && !isEmpty(search) && (mobile || focus) && (
        <Styled.SearchBarDropdownWrapper>
          <Dropdown>
            {data?.suggestions?.map(s => (
              <Dropdown.Item
                // title={parseHtmlString(
                //   `<b>${s.replace(
                //     /\*{2}(.*?)\*{2}/gm,
                //     '<span style="font-weight: normal;">$1</span>'
                //   )}</b>`
                // )}
                title={parseHtmlString(
                  s.replace(/\*{2}(.*?)\*{2}/gm, '<b>$1</b>')
                )}
                key={s}
                onClick={() => handleSearch(s)}
              />
            ))}
          </Dropdown>
        </Styled.SearchBarDropdownWrapper>
      )} */}
    </Styled.SearchBarOuter>
  )
}

export default SearchBar
