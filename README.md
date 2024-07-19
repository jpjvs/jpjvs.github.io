# Getting Started with FB JS SDK

The goal of this project is to serve as an example/tutorial for usage of the FB JS SDK.

## Project Config

- Facebook config data must be passed as environment variables in .env file, similarly to how it's done on the .env.sample provided;

## Facebook App Config

On Meta Developers page, on use cases -> login with facebook -> settings:
- Turn on the JavaScript SDK option;
- Add an allowed domain on the list (ngrok is not accepted);

## SDK Usage

- The SDK must be loaded in such a scope as to be available to all source code which will use it. Here, it is loaded in the App.js root file;
- Token information is passed to the callback of the window.FB.login call (as observed in .sr/services/meta.js);
- User information is passed to the callback of the window.FB.api(/me) call (as observed in .sr/services/meta.js);

## To DO

- Send token data to a backend using asymmetric encryption;
