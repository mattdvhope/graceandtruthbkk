import React from 'react'
import { Link, navigate } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'

import { rhythm, scale } from '../utils/typography'

import LayoutHeaderOne from './LayoutHeaderOne'
import LayoutHeaderTwo from './LayoutHeaderTwo'
import Footer from "./Footer"
import Logout from "./Logout"
import FacebookPixel from "./FacebookPixel"

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

export default ({ children, location }) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        cosmicjsSettings(slug: { eq: "general" }) {
          metadata {
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
          }
        }
      }
    `}
    render={data => {
      const siteTitle = data.cosmicjsSettings.metadata.site_heading
      const homgePageHero =
        data.cosmicjsSettings.metadata.homepage_hero.local.childImageSharp.fluid
      let header

      let rootPath = `/`
      let postsPath = `/posts`
      if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
        rootPath = __PATH_PREFIX__ + `/`
        postsPath = __PATH_PREFIX__ + `/posts`
      }

      if (location.pathname === rootPath || location.pathname === postsPath) {
        header = (<LayoutHeaderOne homgePageHero={homgePageHero} />)
      } else {
        header = (<LayoutHeaderTwo siteTitle={siteTitle} />)
      }

      return (
        <div>
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
          </div>
          <Footer />
          <Logout />
          <link href="https://fonts.googleapis.com/css?family=Athiti|Chonburi|Kanit|Maitree|Prompt|Sriracha|Taviraj|Trirong|Josefin+Sans" rel="stylesheet" />
          <FacebookPixel />
        </div>
      )
    }}
  />
)
