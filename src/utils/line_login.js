// This returns a randomized alphanumeric string of "length" length.
export const makeState = (length) => {
  let result           = '';
  let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// This is URL provided by LINE Platform for logging into this app via LINE.
export const lineLoginURL = (slug) => {
  return `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1654145148&redirect_uri=${process.env.GATSBY_API_URL}${slug}&state=${makeState(10)}&scope=profile%20openid&max_age=360000&ui_locales=th&bot_prompt=aggressive`
}

// This handles the click to log into the app.
export const handleLineLoginClick = (e, slug) => {
  e.preventDefault();
  window.localStorage.setItem("Node Slug", slug);
  window.location.replace(lineLoginURL(slug));
}