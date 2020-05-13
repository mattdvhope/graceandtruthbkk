import React from "react"
import BackgroundImage from 'gatsby-background-image'
import { rhythm } from '../utils/typography'

export default class LayoutHeader extends React.Component {
  constructor(props) {
    super();
    this.state = { 
      window: undefined,
      background: undefined,
    };
  }

  componentDidMount() {
    let height;
    const inner = window.innerWidth;
    if (inner <= 359) {
      height = 4;
    } else if (inner > 359 && inner <= 374) {
      height = 4.2;
    } else if (inner > 374 && inner <= 400) {
      height = 4.7;
    } else if (inner > 400 && inner <= 500) {
      height = 5.3;
    } else if (inner > 500 && inner <= 535) {
      height = 7;
    } else if (inner > 535 && inner <= 650) {
      height = 8;
    } else if (inner > 650 && inner <= 800) {
      height = 10;
    } else if (inner > 800 && inner <= 920) {
      height = 11;
    } else if (inner > 920) {
      height = 14.4;
    }
    this.setState({
      background: (
        <BackgroundImage
          Tag="div"
          fluid={this.props.homePageHero}
          backgroundColor={`#007ACC`}
          style={{
            height: rhythm(height),
            position: 'relative',
            marginBottom: `${rhythm(1)}`,
          }}
        />
      )
    })
  }

  render() {
    if (this.state.background) {
      return this.state.background
    } else {
      return null;
    }
  } // render

}