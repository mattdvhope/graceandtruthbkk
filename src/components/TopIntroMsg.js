import React from "react"

const TopIntroMsg = ({ description, width }) => (

	<div
      style={{
        width: `${width}`,
        marginLeft: `auto`,
        marginRight: `auto`,
        fontSize: `130%`,
      }}
    >
    <hr style={{ marginBottom: `0%` }}/>
    <div style={{ marginLeft: `auto`, marginRight: `auto` }}>{description}</div>
    <hr style={{ marginBottom: `0%` }}/>
  </div>

)

export default TopIntroMsg
