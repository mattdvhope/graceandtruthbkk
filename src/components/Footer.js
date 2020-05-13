import React from "react"
import { Link, navigate } from "gatsby"
import { logout } from "../utils/auth"
import Logout from "./Logout"
import Bio from "./Bio"
import FB from "./FB"
import cosmicjsLogo from '../../static/cosmicjs.svg'
import gatsbyLogo from '../../static/gatsby.png'

export default ({ author }) => (
  <footer
    style={{
      textAlign: 'center',
      padding: `0 3px 20px 0`,
    }}
  >
{/* <Bio settings={author} />  */}
    <FB/>
  </footer>
)