import React from 'react'
import HelmetLocale from './HelmetLocale'
import { Link, navigate } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'
import { isLoggedIn } from "../utils/auth"
import { rhythm, scale } from '../utils/typography'

import LayoutHeader from './LayoutHeader'
import Logout from "./Logout"
import Footer from "./Footer"

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

export default ({ children, location }) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        cosmicjsSettings(slug: { eq: "general" }) {
          metadata {
            site_title
            site_heading
            homepage_hero {
              local {
                childImageSharp {
                  fluid(quality: 90, maxWidth: 1920) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            author_name
            author_bio
            author_avatar {
              imgix_url
            }
          }
        }
      }
    `}
    render={data => {
      const siteTitle = data.cosmicjsSettings.metadata.site_heading
      const homePageHero =
        data.cosmicjsSettings.metadata.homepage_hero.local.childImageSharp.fluid
      let header;
      let rootPath = `/`
      let postsPath = `/posts`
      if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
        rootPath = __PATH_PREFIX__ + `/`
        postsPath = __PATH_PREFIX__ + `/posts`
      }
      const headerTag = (<LayoutHeader homePageHero={homePageHero} />)
      if (location.pathname === rootPath || location.pathname === postsPath) {
        header = headerTag
      } else {
        header = (<Link to="/">{headerTag}</Link>)
      }
      const author = data.cosmicjsSettings.metadata
      const logout = isLoggedIn() ? (<Logout />) : (<span/>)
      return (
        <div>
          <HelmetLocale title={`${siteTitle}`} />
          {header}
          <div
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              maxWidth: rhythm(24),
              padding: `0 ${rhythm(3 / 4)} ${rhythm(1.5)} ${rhythm(3 / 4)}`,
              minHeight: 'calc(100vh - 42px)',
            }}
          >
            {children}
            {logout}
            <Footer author={author} />
          </div>
          <link href="https://fonts.googleapis.com/css?family=Athiti|Chonburi|Kanit|Maitree|Prompt|Sriracha|Taviraj|Trirong|Josefin+Sans" rel="stylesheet" />
        </div>
      )
    }}
  />
)
