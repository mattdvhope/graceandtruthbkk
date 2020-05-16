import React from 'react'
import HelmetLocale from './HelmetLocale'
import { Link, navigate } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'
import { rhythm, scale } from '../utils/typography'
import HomeHeader from './HomeHeader'
import PostHeader from './PostHeader'
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
                  fluid(quality: 45, maxWidth: 1920) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            homepage_hero_2 {
              local {
                childImageSharp {
                  fluid(quality: 100, maxWidth: 1920) {
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
      const homePageHero =
        data.cosmicjsSettings.metadata.homepage_hero.local.childImageSharp.fluid
      const homePageHero2 =
        data.cosmicjsSettings.metadata.homepage_hero_2.local.childImageSharp.fluid
      let header;
      let rootPath = `/`
      let postsPath = `/posts`
      if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
        rootPath = __PATH_PREFIX__ + `/`
        postsPath = __PATH_PREFIX__ + `/posts`
      }
      if (location.pathname === rootPath || location.pathname === postsPath) {
        header = (<HomeHeader homePageHero={homePageHero} />)
      } else {
        header = (<Link to="/"><PostHeader PostHero={homePageHero2} /></Link>)
      }
      return (
        <div>
          <HelmetLocale title={`${siteTitle}`} />
          {header}
          <div
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              maxWidth: rhythm(24),
              padding: `0 ${rhythm(1.1)} ${rhythm(1.5)} ${rhythm(0.9)}`,
              minHeight: 'calc(100vh - 42px)',
              fontFamily: `Athiti`,
              color: `#095793`,
            }}
          >
            {children}
            <Footer/>
          </div>
          <link href="https://fonts.googleapis.com/css?family=Athiti|Chonburi|Kanit|Maitree|Prompt|Sriracha|Taviraj|Trirong|Josefin+Sans" rel="stylesheet" />
        </div>
      )
    }}
  />
)
