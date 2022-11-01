import { Title } from '@/components/Typography/Title'
import { getMq } from '@/styles'
import styled from 'styled-components'

export const ProductDetailsWrapper = styled.div`
  width: 100%;
  order: 3;
  padding: 1rem 0;

  @media ${getMq('tablet', null)} {
    padding: 0;
    height: 100%;
  }
`

export const ProductPriceWrapper = styled.div`
  padding: 1rem;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.palette.background.paper};
  z-index: 1;
  border-top: 0.0625rem solid rgb(215, 215, 215);
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${getMq('tablet', null)} {
    padding: 1.5rem 0;
    position: sticky;
    top: 6.5rem;
    display: block;
    border: none;
    ${Title} {
      padding-bottom: 1rem;
    }
  }
`

export const ProductPriceButtonWrapper = styled.div`
  width: 150px;

  .edit-button {
    margin-bottom: 0.5rem;
  }

  @media ${getMq('tablet', null)} {
    width: 100%;
  }
`

export const ProductDescription = styled.p`
  overflow-wrap: break-word;
  white-space: pre-line;
  font-size: 0.875rem;
`

export const ProductInfoTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
`

export const TableBody = styled.tbody``

export const TableRow = styled.tr`
  border-bottom: 1px solid rgb(215, 215, 215);
`

export const TableHeader = styled.th`
  padding: 0.5rem 0px;
  overflow-wrap: break-word;
  text-align: left;
  font-weight: normal;
  text-transform: none;
  vertical-align: top;
  display: table-cell;
`

export const TableData = styled.td`
  padding: 0.5rem 0px;
  overflow-wrap: break-word;
  text-align: right;
  font-weight: normal;
  text-transform: none;
  vertical-align: top;
  display: table-cell;
`

export const TimeText = styled.time`
  font-weight: normal;
  font-size: 0.625rem;
  line-height: 1.5;
  color: rgb(116, 116, 116);
  text-transform: uppercase;
`

export const PhoneNumberWrapper = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;

  .call-icon {
    margin-right: 0.25rem;
  }
`
