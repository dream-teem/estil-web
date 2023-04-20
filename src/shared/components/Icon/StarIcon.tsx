import React from 'react'

type Props = {
  className?: string
  onClick?: () => void
}

function StarIcon({ onClick, className }: Props) {
  return (
    <svg
      onClick={onClick}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      id="star"
    >
      <path
        fill="#000"
        d="M10.975 18.847a2 2 0 0 1 2.049.002l3.34 1.997c.8.478 1.778-.229 1.568-1.123l-.877-3.72a2 2 0 0 1 .646-1.978l2.934-2.513c.705-.603.326-1.746-.6-1.819l-3.882-.325a2 2 0 0 1-1.671-1.205L12.968 4.63c-.358-.841-1.578-.841-1.936 0L9.52 8.154a2 2 0 0 1-1.67 1.203l-3.885.326c-.925.073-1.304 1.216-.6 1.819L6.3 14.015a2 2 0 0 1 .645 1.978l-.877 3.72c-.21.894.768 1.6 1.567 1.122l3.34-1.988Z"
      ></path>
    </svg>
  )
}

export default StarIcon
