import React from "react"
import { Link, navigate, StaticQuery, graphql } from "gatsby"
import { logout } from "../utils/auth"
import Logout from "./Logout"
import FB from "./FB"
import cosmicjsLogo from '../../static/cosmicjs.svg'
import gatsbyLogo from '../../static/gatsby.png'

export default () => (
  <StaticQuery
    query={graphql`
      query FooterQuery {
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
          }
        }
      }
    `}
    render={data => {
      const siteTitle = data.cosmicjsSettings.metadata.site_heading
      const homePageHero =
        data.cosmicjsSettings.metadata.homepage_hero.local.childImageSharp.fluid

      return (
        <footer
          style={{
            textAlign: 'center',
            padding: `0 3px 20px 0`,
          }}
        >
          <FB/>
        </footer>
      )
    }}
  />
)
