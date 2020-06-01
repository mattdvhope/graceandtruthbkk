import React from "react"
import BackgroundImage from 'gatsby-background-image'
import { rhythm } from '../utils/typography'
import { isLoggedIn, getUser } from '../utils/auth'

export default ({ homePageHero }) => {
  const lineUser = !isLoggedIn() ? null : (
    <img src={getUser().picture} alt="LINE user"
      style={{
        position: `absolute`,
        top: `1vw`,
        right: `1vw`,
        width: `48px`,
        height: `48px`,
        borderRadius: `50%`,
      }}
    />
  )
  return (
    <div style={{ position: `relative`, top: `0`, left: `0` }}>
      <BackgroundImage
        Tag="div"
        fluid={homePageHero}
        backgroundColor={`#007ACC`}
        style={{
          position: 'relative',
          height: `30vmax`,
          marginBottom: `${rhythm(1)}`,
        }}
      />
      {lineUser}
    </div>
  )
}