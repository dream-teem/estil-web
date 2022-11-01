import { Star } from '@styled-icons/fluentui-system-filled/Star'
import { StarHalf } from '@styled-icons/fluentui-system-filled/StarHalf'
import { StarOneQuarter } from '@styled-icons/fluentui-system-filled/StarOneQuarter'
import { StarThreeQuarter } from '@styled-icons/fluentui-system-filled/StarThreeQuarter'
import { Star as EmptyStar } from '@styled-icons/fluentui-system-regular/Star'
import range from 'lodash/range'
import React from 'react'
import * as Styled from './styles'

type Props = {
  rating: number
  count?: number
}

function Rating({ rating, count }: Props) {
  const RatingStar = ({ index }: Record<'index', number>) => {
    const starRating = Math.max(rating - index, 0)
    if (starRating > 0.75) return <Star width={20} />
    if (starRating > 0.5) return <StarThreeQuarter width={20} />
    if (starRating > 0.25) return <StarHalf width={20} />
    if (starRating > 0) return <StarOneQuarter width={20} />
    return <EmptyStar width={20} />
  }
  return (
    <Styled.RatingWrapper>
      {range(5).map(ind => (
        <Styled.RatingStarWrapper key={ind}>
          <RatingStar index={ind} />
        </Styled.RatingStarWrapper>
      ))}
      ({count})
    </Styled.RatingWrapper>
  )
}

export default Rating
