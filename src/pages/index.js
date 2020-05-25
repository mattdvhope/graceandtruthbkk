import React from 'react'
import { Link } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import { rhythm } from '../utils/typography'
import { isLoggedIn } from "../utils/auth"

class BlogIndex extends React.Component {
  constructor() {
    super();
    this.state = {
      window: undefined,
    };
    this.thumbNailImage = this.thumbNailImage.bind(this);
  }

  handleClick(e, slug) {
    e.preventDefault();
    window.localStorage.setItem("Node Slug", slug);
    window.location.replace(this.lineLink(slug));
  }

  makeState(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  Linkage(title, slug, src) {
    return isLoggedIn() ? this.loggedInLink(title, slug, src) : this.loggedOutLink(title, slug, src)
  }

  loggedOutLink(title, slug, src) {
    return (
      <a
        href={this.lineLink(slug)}
        onClick={e => this.handleClick(e, slug)}
        style={{ boxShadow: `none`, fontFamily: `Kanit`, color: `#0B2238` }}
      >
        {this.thumbNailImage(src)}
        {title}
      </a>
    )
  }

  lineLink(slug) {
    return `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1654145148&redirect_uri=${process.env.GATSBY_API_URL}${slug}&state=${this.makeState(10)}&scope=profile%20openid&max_age=360000&ui_locales=th&bot_prompt=aggressive`
  }

  loggedInLink(title, slug, src) {
    return (
      <Link style={{ boxShadow: `none`, fontFamily: `Kanit`, color: `#0B2238` }} to={`posts/${slug}`}>
        {this.thumbNailImage(src)}
        {title}
      </Link>
    )
  }

  thumbNailImage(src) {
    return <img
      src={src} alt="thumbnail" height="65px" width="65px"
      style={{
        float: `left`,
        borderRadius: `50%`,
        borderStyle: `inset`,
        marginTop: rhythm(1 / 2),
        marginBottom: rhythm(-0.1),
        marginRight: rhythm(1 / 3),
      }}
    />
  }

  lineMsg(intro) {
    const intro_to_LINE_links = intro;
    return isLoggedIn() ? null : (<div style={{
      width: `92%`,
      marginTop: `-1.5vw`,
      marginLeft: `auto`,
      marginRight: `auto`,
      marginBottom: `-30px`,
      fontSize: `130%`,
    }}>
      {intro_to_LINE_links}
    </div>)
  }

  lineImage() {
    return isLoggedIn() ? null : (<img
      src="/LINE_APP.png" alt="LINE" width="20px" height="20px"
      style={{
        float: `left`,
        marginTop: `9px`,
        marginRight: `6px`,
        marginBottom: rhythm(-0.1),
      }}
    />)
  }

  render() {
    const intro = get(this, 'props.data.cosmicjsSettings.metadata.site_description')
    const posts = get(this, 'props.data.allCosmicjsPosts.edges')
    const location = get(this, 'props.location')

    return (
      <Layout location={location}>
        {this.lineMsg(intro)}
        {posts.map(({ node }) => {
          const title = get(node, 'title') || node.slug
          const src = node.metadata.thumb_nail_youtube.imgix_url;
          return (
            <div key={node.slug}>
              <div
                style={{
                  marginTop: rhythm(1.5),
                  marginBottom: rhythm(-0.1),
                  fontSize: `130%`,
                }}
              >
                {this.Linkage(title, node.slug, src)}
                {this.lineImage()}
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
