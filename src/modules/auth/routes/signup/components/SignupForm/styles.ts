import styled from 'styled-components'

export const SignupFormWrapper = styled.div`
  width: 100%;
  max-width: 414px;
  overflow: auto;
`

export const BackButton = styled.button`
  color: black;
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  display: flex;
`
export const SignupFormHeader = styled.div`
  width: 100%;
  display: flex;
  padding-bottom: 1rem;
  align-items: center;

  .back-icon {
    margin-right: 0.5rem;
  }

  .progress-bar {
    margin: 0px 2rem;
  }
`
