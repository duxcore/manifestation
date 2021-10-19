import {manifestation, ApiManifest} from "./src/index";

/**
 * Example Manifest
 * 
 * This manifest has two routes with no middleware.
 * 
 * /teapot
 * /v1/teapot
 */
const manifest: ApiManifest = {
  routes: [
    {
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
    }
  ],
  versions: [
    {
      version: 1,
      routes: [
        {
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
        }
      ]
    }
  ]
}

manifestation.createServer(manifest, {}).listen(2020, () => { console.log("started")});

