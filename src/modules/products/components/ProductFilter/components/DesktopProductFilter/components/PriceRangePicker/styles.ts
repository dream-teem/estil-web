import styled from 'styled-components'

export const PriceRangeWrapper = styled.div`
  width: 100$;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const PriceInputField = styled.input`
  width: 5rem;
  height: 3rem;
  border-radius: 0.25rem;
  outline: none;
  border: 1px solid rgb(102, 102, 102);
  font-size: 0.875rem;
  text-align: center;
`

export const PriceInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;

  &:first-child {
    margin-right: 1rem;
  }

  &:last-child {
    margin-left: 1rem;
  }
`
