import React from 'react'
import { Link, navigate } from 'gatsby'
import get from 'lodash/get'
import { graphql } from 'gatsby'
import { handleLogin, isLoggedIn, getUser } from "../utils/auth"

import HelmetLocale from '../components/HelmetLocale'
import Layout from '../components/layout'
import BlogContent from './blog_content'

import { rhythm, scale } from '../utils/typography'

class BlogPostTemplate extends React.Component {
  constructor(props) {
    super();
    this.state = { 
      id_token: undefined,
      person: undefined,
      window: undefined
    };
  }

  async componentDidMount() {
    // const url_with_code = window.location.search.match(/(?<=code=)(.*)(?=&state)/)
    const url_with_code = window.location.search.match(/(code=)(.*)(?=&state)/)
    const code = url_with_code ? url_with_code[2] : null
    
    if (!isLoggedIn() && code) {
      // 1. getting id_token
      const slug = window.localStorage.getItem("Node Slug");
      const params = `grant_type=authorization_code&code=${code}&redirect_uri=${process.env.GATSBY_API_URL}${slug}&client_id=1654145148&client_secret=0c9e185b0a932ace22d6d6df08eaa644`;
      const response = await fetch(`https://api.line.me/oauth2/v2.1/token`, {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: params
      })
      const json = await response.json();

      // 2. getting user info with id_token
      const personal_data = await fetch(`https://api.line.me/oauth2/v2.1/verify`, {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `id_token=${json.id_token}&client_id=1654145148`
      });
      const person = await personal_data.json()
      handleLogin(person)

      // 3. personal data from LINE login
      this.setState({ window: window, person: person, id_token: json.id_token });

      // sessionStorage.setItem("json", JSON.stringify(json))
      // // 4a. validate ID token
      // let base64Url = json.id_token.split('.')[1]; // json.id_token you get
      // let base64 = base64Url.replace('-', '+').replace('_', '/');
      // let decodedData = JSON.parse(Buffer.from(base64, 'base64').toString('binary'));
      // console.log("decodedData: ", decodedData)

      // // 4b. validate ID token
      // console.log("decodedData: ", parseJwt(json.id_token))
      // function parseJwt (token) {
      //   var base64Url = token.split('.')[1];
      //   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      //   var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      //       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      //   }).join(''));

      //   return JSON.parse(jsonPayload);
      // };
    } else {
      this.setState({ window: window, person: getUser() })
    }
  } // async componentDidMount()

  youtubeEmbeddable(youtubeUrl) {
    const video_id = this.youtubeId(youtubeUrl);
    return `https://www.youtube.com/embed/${video_id}`
  }

  youtubeId(youtubeUrl) {
    let video_id = youtubeUrl.split('v=')[1];
    const ampersandPosition = video_id.indexOf('&');
    if(ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }
    return video_id    
  }

  heightOfVideo() {
    const inner = window.innerWidth;
    if (inner <= 359) {
      return 5.6;
    } else if (inner > 359 && inner <= 374) {
      return 6.2;
    } else if (inner > 374 && inner <= 400) {
      return 6.7;
    } else if (inner > 400 && inner <= 500) {
      return 7.4;
    } else if (inner > 500 && inner <= 535) {
      return 9;
    } else if (inner > 535 && inner <= 560) {
      return 10;
    } else if (inner > 560 && inner <= 600) {
      return 10.5;
    } else if (inner > 600 && inner <= 650) {
      return 11;
    } else if (inner > 650 && inner <= 740) {
      return 12;
    } else if (inner > 740 && inner <= 800) {
      return 13;
    } else if (inner > 800 && inner <= 920) {
      return 13.5;
    } else if (inner > 920) {
      return 14;
    }
  }

  render() {
    const post = this.props.data.cosmicjsPosts
    const youtubeCosmic = post.metadata.youtube_url
    const youtubeUrl = this.youtubeEmbeddable(youtubeCosmic)
    const siteTitle = get(
      this.props,
      'data.cosmicjsSettings.metadata.site_title'
    )
    const author = get(this, 'props.data.cosmicjsSettings.metadata')

    const location = get(this, 'props.location')
    const { previous, next } = this.props.pageContext

    // console.log(this.heightOfVideo())

    const blog_post_page = (
      <Layout location={location}>
        <BlogContent
          post={post}
          youtubeUrl={youtubeUrl}
          height={this.heightOfVideo()}
          width={(this.heightOfVideo() * 16) / 9}
          author={author}
          siteTitle={siteTitle}
          previous={previous}
          next={next}
        />
      </Layout>
    ) // blog_post_page

    if (!this.state.window) {
      console.log("not yet rendering blog page!!!!");
      return (<span></span>)
    } 
    else {
      if (isLoggedIn()) {
        console.log("isLoggedIn()!!!!");
        return blog_post_page;
      } else {
        navigate(`/`)
        alert("You're not logged in yet!!!!");
        return null
      }
    }

  } // render()
} // BlogPostTemplate

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    cosmicjsPosts(slug: { eq: $slug }) {
      id
      content
      title
      created(formatString: "MMMM DD, YYYY")
      metadata {
        youtube_url
      }
    }
    cosmicjsSettings(slug: { eq: "general" }) {
      metadata {
        site_title
        author_name
        author_bio
        author_avatar {
          imgix_url
        }
      }
    }
  }
`
