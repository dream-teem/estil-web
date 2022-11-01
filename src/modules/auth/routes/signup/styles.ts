import { getMq } from '@/styles'
import styled from 'styled-components'

export const SignupWrapper = styled.div`
  @media ${getMq('tablet', null)} {
    padding-top: 13rem;
  }
`
export const SignupInnerWrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${getMq('tablet', null)} {
    margin-left: auto;
    margin-right: auto;
    width: max-content;
    border-radius: 0.25rem;
    box-shadow: 0 5px 10px rgb(0 0 0 / 15%);
  }

  .logo {
    margin-bottom: 1rem;
  }
`
