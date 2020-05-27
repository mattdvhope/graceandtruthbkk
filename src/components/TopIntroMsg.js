import React from "react"

const TopIntroMsg = ({ description }) => (

	<div
      style={{
        width: `92%`,
        marginLeft: `auto`,
        marginRight: `auto`,
        fontSize: `130%`,
      }}
    >
    <hr style={{ marginBottom: `0%` }}/>
    {description}
    <hr style={{ marginBottom: `0%` }}/>
  </div>

)

export default TopIntroMsg
