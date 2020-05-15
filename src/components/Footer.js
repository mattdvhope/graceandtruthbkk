import React from "react"
import { Link, navigate, StaticQuery, graphql } from "gatsby"
import Logout from "./Logout"
import { isLoggedIn } from "../utils/auth"
import FB from "./FB"

import cosmicjsLogo from '../../static/cosmicjs.svg'
import gatsbyLogo from '../../static/gatsby.png'
import { rhythm } from '../utils/typography'

export default () => (
  <StaticQuery
    query={graphql`
      query FooterQuery {
        cosmicjsSettings(slug: { eq: "general" }) {
          metadata {
            site_title
            infor_name_1
            infor_1
            infor_2
            infor_avatar_1 {
              imgix_url
            }
          }
        }
      }
    `}
    render={data => {
      const settings = data.cosmicjsSettings.metadata
      const image = data.cosmicjsSettings.metadata.infor_avatar_1.imgix_url
      const logout = isLoggedIn() ? (<Logout />) : (<span/>)
      const href = `https://www.facebook.com/pg/graceandtruthBKK/`
      return (
        <div>
          <FB
            image={image}
            infor_name_1={settings.infor_name_1}
            settings={settings}
          />
          <br/>
          <div style={{ display: `block`, marginLeft: `auto`, marginRight: `auto`, fontFamily: `Kanit`, fontSize: `170%`, width: `318px`, width: `156px` }}>
            {logout}
          </div>
        </div>
      )
    }}
  />
)