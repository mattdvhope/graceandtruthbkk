import React from 'react'
import { Link } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import TopIntroMsg from '../components/TopIntroMsg'
import { rhythm } from '../utils/typography'
import { isLoggedIn } from "../utils/auth"
import { makeState, lineLoginURL, handleLineLoginClick } from "../utils/line_login"
import { linkVisit } from "../utils/visit_recorder"

class BlogIndex extends React.Component {
  constructor() {
    super();
    this.state = {
      window: undefined,
    };
    this.thumbNailImage = this.thumbNailImage.bind(this);
  }

  thumbNailImage(src) {
    return <img
      src={src} alt="thumbnail" height="65px" width="65px"
      style={{
        float: `left`,
        borderRadius: `50%`,
        borderStyle: `inset`,
        marginTop: rhythm(1 / 2),
        marginBottom: rhythm(0),
        marginRight: rhythm(1 / 3),
      }}
    />
  }

  Linkage(title, slug, src) {
    return isLoggedIn() ? this.loggedInLink(title, slug, src) : this.loggedOutLink(title, slug, src)
  }

  lineLogo() {
    return isLoggedIn() ? <span/> : (<img
      src="/LINE_APP.png" alt="LINE" width="20px" height="20px"
      style={{
        float: `left`,
        marginTop: `9px`,
        marginRight: `6px`,
        marginBottom: rhythm(-0.1),
      }}/>)
  }

  loggedOutLink(title, slug, src) {
    return (
      <a
        href={lineLoginURL(slug)}
        onClick={e => handleLineLoginClick(e, slug)}
        style={{ boxShadow: `none`, fontFamily: `Kanit`, color: `#0B2238` }}
      >
        {this.thumbNailImage(src)}
        {this.lineLogo()}
        {title}
      </a>
    )
  }

  loggedInLink(title, slug, src) {
    return (
      <Link style={{ boxShadow: `none`, fontFamily: `Kanit`, color: `#0B2238` }} onClick={e => linkVisit()} to={`posts/${slug}`}>
        {this.thumbNailImage(src)}
        {this.lineLogo()}
        {title}
      </Link>
    )
  }

  render() {
    const description = isLoggedIn() ? "เราหวังว่าคุณจะชอบวิดีโอเหล่านี้ค่ะ" : get(this, 'props.data.cosmicjsSettings.metadata.site_description')
    const timeIntroWidth = isLoggedIn() ? "21ch" : "92%"
    const posts = get(this, 'props.data.allCosmicjsPosts.edges')
    const location = get(this, 'props.location')

    return (
      <Layout location={location}>
        <TopIntroMsg description={description} width={timeIntroWidth}/>
        {posts.map(({ node }) => {
          const title = get(node, 'title') || node.slug
          const src = node.metadata.thumb_nail_youtube.imgix_url;
          return (
            <div key={node.slug}>
              <div
                style={{
                  marginTop: rhythm(1.2),
                  marginBottom: rhythm(-0.1),
                  fontSize: `130%`,
                }}
              >
                {this.Linkage(title, node.slug, src)}
              </div>
              <p dangerouslySetInnerHTML={{ __html: node.metadata.description }}/>
            </div>
          )
        })}

      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    allCosmicjsPosts(sort: { fields: [created], order: DESC }, limit: 1000) {
      edges {
        node {
          metadata {
            description
            thumb_nail_youtube {
              imgix_url
            }
          }
          slug
          title
          created(formatString: "DD MMMM, YYYY")
        }
      }
    }
    cosmicjsSettings(slug: { eq: "general" }) {
      metadata {
        site_description
      }
    }
  }
`
