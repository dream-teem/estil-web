import styled, { css } from 'styled-components'

export const ChatContentContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const ChatMessageListContainer = styled.div`
  max-height: 100%;
  flex: 1;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.1);
  height: 100%;
  overflow-y: auto;

  .message-list {
    overflow: auto;
  }

  .rce-container-mbox.is-own {
    .rce-mbox {
      background: #dcf8c6;
    }
    .rce-mbox-right-notch {
      fill: #dcf8c6;
    }
    .rce-mbox-left-notch {
      fill: #dcf8c6;
    }
  }
`

type Props = {
  isPhone: boolean
}
export const ChatMessagesContainer = styled.div<Props>`
  width: 300px;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.3);

  ${({ isPhone }) =>
    isPhone &&
    css({
      width: '100%',
      borderRight: 'none'
    })}
  .current-chat {
    .rce-citem {
      background: rgba(0, 0, 0, 0.1);
    }
  }
`

export const EmptyMessageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`
