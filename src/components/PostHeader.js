import React from "react"
import BackgroundImage from 'gatsby-background-image'
import { rhythm } from '../utils/typography'
import { getUser } from '../utils/auth'

export default ({ PostHero }) => {
  return (
    <div style={{ position: `relative`, top: `0`, left: `0` }}>
      <BackgroundImage
        Tag="div"
        fluid={PostHero}
        backgroundColor={`#007ACC`}
        style={{
          position: 'relative',
          height: `13vw`,
          marginBottom: `${rhythm(1)}`,
        }}
      />
      <img src={getUser().picture} alt="LINE user"
        style={{
          position: `absolute`,
          top: `1vw`,
          right: `2vw`,
          width: `44px`,
          height: `44px`,
          borderRadius: `50%`,
        }}
      />
    </div>
  )
}