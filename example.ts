import { manifestation, ApiManifest } from "./src/index";

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
const manifest: ApiManifest = {
  routes: [ teapot ],
  versions: [
    {
      version: 1,
      routes: [ teapot ]
    }
  ]
}

manifestation.createServer(manifest, {}).listen(2020, () => { console.log("started")});

