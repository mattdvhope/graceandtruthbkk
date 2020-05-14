import React from 'react'
import Infor from './Infor'
import { rhythm } from '../utils/typography'

export default ({ settings }) => (
  <div>
    <a href="https://www.facebook.com/pg/graceandtruthvideo/" style={{ textDecoration: `none`, textAlign: `center` }} target="_blank" >
      <Infor
        top={0}
        bottom={0}
        srcImg={settings.infor_avatar_1.imgix_url}
        altName={settings.infor_name_1}
        imgTop={0}
        setHTML={settings.infor_1}
      />
    </a>
  </div>
)