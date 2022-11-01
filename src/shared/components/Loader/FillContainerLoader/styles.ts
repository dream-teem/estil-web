import styled from 'styled-components'

export const LoaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LoadingSpinner = styled.div`
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  width: 40px;
  height: 40px;
  border: 3px solid #d3d3d3; /* Light grey */
  border-top: 3px solid #383636; /* Black */
  border-radius: 50%;
  animation: spinner 1.2s linear infinite;
`
