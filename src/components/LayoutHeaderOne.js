import React from "react"
import BackgroundImage from 'gatsby-background-image'
import { rhythm } from '../utils/typography'

export default ({ homePageHero, height }) => (
	<BackgroundImage
    Tag="div"
    fluid={homePageHero}
    backgroundColor={`#007ACC`}
    style={{
      height: rhythm(height),
      position: 'relative',
      marginBottom: `${rhythm(1)}`,
    }}
  />
)