import React from "react"
import BackgroundImage from 'gatsby-background-image'
import { rhythm } from '../utils/typography'

export default ({ homgePageHero }) => (

	<BackgroundImage
    Tag="div"
    className="post-hero"
    fluid={homgePageHero}
    backgroundColor={`#007ACC`}
    style={{
      height: rhythm(14),
      position: 'relative',
      marginBottom: `${rhythm(1.5)}`,
    }}
  >
{/* <h1
      style={{
        ...scale(1.3),
        position: 'absolute',
        textAlign: 'center',
        left: 0,
        right: 0,
        top: rhythm(4),
        marginTop: '0',
        height: rhythm(2.5),
      }}
    >
      <Link
        style={{
          boxShadow: 'none',
          textDecoration: 'none',
          color: 'inherit',
        }}
        to={'/'}
      >
        {siteTitle}
      </Link>
    </h1> */}
  </BackgroundImage>

)