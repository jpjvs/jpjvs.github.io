const initFBSDK = (appID) => {
  window.fbAsyncInit = function () {
    window.FB.init({
      appId: appID,
      cookie: true,
      xfbml: true,
      version: 'v20.0',
    });
  };

  // Load the SDK script
  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}

const metaLogin = (scopes, callback) => {
  window.FB.login(
    function (response) {
      if (response.authResponse) {
        console.log('Welcome! Fetching your information.... ');
        window.FB.api('/me', function (response) {
          console.log('Good to see you, ' + response.name + '.');
        });

        callback(response)
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    },
    { scope: scopes }
  );
}

module.exports = {
  initFBSDK,
  metaLogin
}