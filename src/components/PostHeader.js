import React from "react"
import BackgroundImage from 'gatsby-background-image'
import { rhythm } from '../utils/typography'

export default ({ PostHero }) => (
  <BackgroundImage
    Tag="div"
    fluid={PostHero}
    backgroundColor={`#007ACC`}
    style={{
      height: `12vw`,
      position: 'relative',
      marginBottom: `${rhythm(1)}`,
    }}
  />
)