import React from "react"
import { rhythm } from '../utils/typography'
import { Link } from 'gatsby'

export default ({ siteTitle }) => (

	<h3
    style={{
      fontFamily: 'Montserrat, sans-serif',
      marginTop: 0,
      marginBottom: rhythm(-1),
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: rhythm(24),
      paddingTop: `${rhythm(1.5)}`,
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
  </h3>

)