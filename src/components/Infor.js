import React from 'react'
import { rhythm } from '../utils/typography'

export default ({ top, bottom, srcImg, altName, imgTop, setHTML }) => (
  <div
    style={{
      display: 'flex',
      marginTop: rhythm(top),
      marginBottom: rhythm(bottom),
      fontFamily: `Athiti`,
    }}
  >
    <img
      src={srcImg}
      alt={altName}
      style={{
        marginRight: rhythm(1 / 2),
        marginTop: rhythm(imgTop),
        width: rhythm(2),
        height: rhythm(2),
      }}
    />
    <div
      dangerouslySetInnerHTML={{ __html: setHTML }}
    />
  </div>
)