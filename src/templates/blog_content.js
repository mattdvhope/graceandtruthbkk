import React from "react"
import { Link } from 'gatsby'
import HelmetLocale from '../components/HelmetLocale'
import { rhythm } from '../utils/typography'

export default ({ post, youtubeUrl, height, width, siteTitle, previous, next }) => (
	<>
    <HelmetLocale title={`${post.title} | ${siteTitle}`} />
    <h3
      style={{
        marginTop: rhythm(0.1),
        textAlign: `center`,
        fontFamily: `Kanit`,
				color: `#0B2238`,
      }}
    >
      {post.title}
    </h3>
    <div>
      <iframe // Youtube video 
        style={{
				  marginLeft: `auto`,
				  marginRight: `auto`,
          height: rhythm(height),
          width: rhythm(width),
        }}
        src={youtubeUrl}
        frameBorder="0"
        allowFullScreen
      />
    </div>

    <div
      className="post-content"
      dangerouslySetInnerHTML={{ __html: post.content }}
    />

    <hr
      style={{
        marginBottom: rhythm(1),
      }}
    />
    <ul
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        listStyle: 'none',
        padding: 0,
      }}
    >
      {previous && (
        <li>
          <Link to={`posts/${previous.slug}`} rel="prev">
            ← {previous.title}
          </Link>
        </li>
      )}

      {next && (
        <li>
          <Link to={`posts/${next.slug}`} rel="next">
            {next.title} →
          </Link>
        </li>
      )}
    </ul>
	</>
)
