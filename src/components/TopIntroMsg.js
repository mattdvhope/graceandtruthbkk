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
    <hr style={{ marginBottom: `0%`, width: `13em` }}/>
    {description}
    <hr style={{ marginBottom: `0%`, width: `13em` }}/>
  </div>

)

export default TopIntroMsg
