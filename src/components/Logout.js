import React from "react"
import { Link, navigate } from "gatsby"
import { logout } from "../utils/auth"

const Logout = () => (

	<h3 style={{ textAlign: 'center', marginTop: `15px`, fontFamily: `Kanit` }}>
		<a
	    href="/"
	    onClick={event => {
	      event.preventDefault()
	      logout(() => navigate(`/`))
	    }}
	  >
	    ออกจากระบบ
	  </a>
	</h3>

)

export default Logout
