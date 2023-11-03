
# Apple Wallet Passes Generation using Node.js

This project demonstrates how to generate Apple Wallet passes using Node.js. It leverages several libraries, including `passkit-generator`, `Express.js`, and Firebase.

## Libraries Used

- [passkit-generator](https://github.com/alexandercerutti/passkit-generator): A Node.js library for generating Apple Wallet passes.
- [Express.js](https://expressjs.com/): A web application framework for Node.js.
- [Firebase](https://firebase.google.com/): A comprehensive mobile and web app development platform.

## Demo

Here's a simple example of how to generate an Apple Wallet pass using this project:

<img width="312" alt="image" src="https://github.com/salman-aziz-4425/Apple-Wallet-Passes-Nodejs/assets/85288719/b6a6bada-cc29-40ad-b5b8-a302838bad79">

## Getting Started

1. **Install Dependencies**: Before running the project, install the required dependencies using npm:

   ```bash
   npm install

## Sample Input:
 ```bash
{
    "qrText":"Eqan my friend",
    "thumbnail":"https://images2.alphacoders.com/132/1323416.jpeg",
     "icon":" https://static.vecteezy.com/system/resources/thumbnails/024/553/676/small/skull-wearing-crown-logo-skull-king-sticker-pastel-cute-colors-generative-ai-png.png",
    "primary":{
        "value":"Salman Aziz",
        "label":"Name"
    },
    "secondary":[
        {
        "value":"Salman Aziz",
        "label":"name"
        },
        {
        "value":"secondary fields",
        "label":"Name"
        }
    ],
    "auxiliary":[
        {
        "value":"auxiliary fields",
        "label":"Name"
        },
        {
        "value":"auxiliary fields",
        "label":"Name"
        }
    ],
    "backgroundColor":"000000",
    "textColor":"FFFFFF"
}
