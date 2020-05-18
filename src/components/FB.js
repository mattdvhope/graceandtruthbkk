import React from 'react'

export default ({ image, infor_name_1, settings }) => (
  <div style={{ marginLeft: `auto`, marginRight: `auto`, marginTop: `45px`, width: `232px`, height: `58px` }} >
    <a href="https://www.facebook.com/pg/graceandtruthBKK/" target="_blank" >
      <img
        style={{
          float: `left`,
          marginRight: `6px`,
          marginTop: `4px`
        }} height="50"
        width="50"
        src={image}
        alt={settings.infor_name_1}
      />
    </a>
    <div style={{ fontSize: `130%`, marginTop: `-11px` }}>
      <a href="https://www.facebook.com/pg/graceandtruthBKK/" target="_blank" ><span
        dangerouslySetInnerHTML={{ __html: settings.infor_1 }}
      /></a>
    </div>
    <div style={{ fontSize: `130%`, marginTop: `-45px` }}>
      <a href="https://www.facebook.com/pg/graceandtruthBKK/" target="_blank" ><span
        dangerouslySetInnerHTML={{ __html: settings.infor_2 }}
      /></a>
    </div>
  </div>
)