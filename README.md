<span align=center>
  <h1>
    Duxcore API Manifestation
    <br />
  <a href="https://discord.gg/dTGJ5Bchnq">
    <img src="https://img.shields.io/discord/844279877503025182?label=Discord&logo=discord&logoColor=white&style=for-the-badge" />
  </a>
  <a href="https://www.npmjs.com/package/@duxcore/manifestation">
    <img src="https://img.shields.io/npm/dw/@duxcore/manifestation?logo=npm&style=for-the-badge" />
    <img src="https://img.shields.io/npm/v/@duxcore/manifestation/latest?label=Latest%20Version&style=for-the-badge" />
  </a>
  </h1>
</span>

This is a very lightwiehgt manifestation library that is designed to make it easier to create express.js api's.  Simply create a manifestation object.  Create an api server using the manifestation object and then enjoy your new manifested api server.

Example Code
```ts
import { manifestation, ApiManifest } from "@duxcore/manifestation";

const teapot = manifestation.newRoute({
  route: "/teapot",
  method: "all",
  executor: (req, res) => {
    const response = manifestation.newApiResponse({
      status: 418,
      message: "I'm not a teapot",
      successful: true
    });

    manifestation.sendApiResponse(res, response);
  }
})

/**
 * Example Manifest
 * 
 * This manifest has two routes with no middleware.
 * 
 * /teapot
 * /v1/teapot
 */
const manifest = manifestation.newManifest({
  routes: [ teapot ],
  versions: [
    {
      version: 1,
      routes: [ teapot ]
    }
  ]
})

manifestation.createServer(manifest, {}).listen(2020, () => { console.log("started")});
```