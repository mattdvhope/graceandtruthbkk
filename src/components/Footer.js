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
            infor_name_1
            infor_1
            infor_avatar_1 {
              imgix_url
            }
          }
        }
      }
    `}
    render={data => {
      const settings = data.cosmicjsSettings.metadata
      return (
        <footer>
          <FB settings={settings}/>
        </footer>
      )
    }}
  />
)
