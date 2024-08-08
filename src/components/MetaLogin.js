import React from 'react';
import { metaLogin } from '../services/meta';

async function encryptToken(token, publicKey) {
  // Generate a random symmetric key (SK) for AES-GCM
  const symmetricKey = window.crypto.getRandomValues(new Uint8Array(32));

  // Convert the token to a Uint8Array
  const tokenEncoded = new TextEncoder().encode(token);

  // Generate a random IV for AES-GCM
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  // Encrypt the token with AES-GCM
  const encryptedData = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    await window.crypto.subtle.importKey(
      'raw',
      symmetricKey,
      { name: 'AES-GCM' },
      false,
      ['encrypt']
    ),
    tokenEncoded
  );

  // Extract the authentication tag from the encrypted data
  const encryptedToken = new Uint8Array(encryptedData.slice(0, -16)); // Encrypted data
  const authTag = new Uint8Array(encryptedData.slice(-16)); // Last 16 bytes are the authentication tag

  // Encrypt the AES key with the RSA public key using RSA-OAEP with SHA-256
  const encryptedAesKey = await window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
      hash: { name: "SHA-256" },
    },
    publicKey,
    symmetricKey
  );

  // Convert the encrypted AES key and the IV to Base64 strings
  const encryptedAesKeyBase64 = btoa(String.fromCharCode(...new Uint8Array(encryptedAesKey)));
  const ivBase64 = btoa(String.fromCharCode(...iv));

  // Convert the encrypted token and GCM tag to Base64 string
  const encryptedTokenBase64 = btoa(String.fromCharCode(...new Uint8Array(encryptedToken)));
  const authTagBase64 = btoa(String.fromCharCode(...authTag));

  // Return the encrypted AES key, IV, and encrypted token
  return {
    encryptedAesKey: encryptedAesKeyBase64,
    iv: ivBase64,
    encryptedToken: encryptedTokenBase64,
    tag: authTagBase64
  };
}

const MetaLogin = () => {
  const { REACT_APP_FB_SCOPES, REACT_APP_RSA_PUBLIC_KEY } = process.env

  const handleLogin = () => {
    metaLogin(REACT_APP_FB_SCOPES, async response => {
      // Save token information safely somewhere
      // . . . (TO DO)

      console.log(REACT_APP_RSA_PUBLIC_KEY, response)

      // Import the RSA public key
      const publicKey = await window.crypto.subtle.importKey(
        "spki",
        Uint8Array.from(atob(REACT_APP_RSA_PUBLIC_KEY.replace(/-----\w+ PUBLIC KEY-----/g, "").replace(/\n/g, "")), c => c.charCodeAt(0)),
        {
          name: "RSA-OAEP",
          hash: "SHA-256",
        },
        false,
        ["encrypt"]
      )

      const token = response.authResponse.accessToken;
      const encryptedData = await encryptToken(token, publicKey);
      console.log("Encrypted Data:", encryptedData);
    })
  };

  return (
    <div>
      <h1>Meta Login Component</h1>
      <button onClick={handleLogin}>Login on Meta</button>
    </div>
  );
};

export default MetaLogin;