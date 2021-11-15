import express, { Application } from "express";
import {
  ApiManifest,
  ApiResponse,
  ApiRoute,
  CreateServerOptions,
  ExpressExecutor
} from "./types";

export * from './types';
export const manifestation = {
  /**
   * Send an API response within an express method
   * 
   * @param res - Express response object
   * @param response - Response object that will be sent to client
   * 
   * @returns {void}
   */
  sendApiResponse(
    res: express.Response,
    response: ApiResponse
  ): void {
    res.status(response.status ?? 200).json(response);

    return;
  },

  /**
   * Create a new API Response object
   * 
   * This will create a standardized and uniform API response object that can easily be sent to the user
   * by making use of the sendApiResponse method.  This will just use a basic JSON api response format that
   * is easy to read and manage.
   * 
   * @param data - The data that will be assembled into an API Response
   * @returns {ApiResponse} - The assembled and uniform api response object.
   */
  newApiResponse(data: ApiResponse): ApiResponse {
    return {
      status: data.status,
      message: data.message,
      data: data.data,
      successful: data.successful,
      meta: {
        timestamp: data.meta?.timestamp ?? new Date().getTime()
      }
    };
  },

  /**
   * Create a new route object
   * 
   * This will create a route object with types to make it easy for anybody to create a new route
   * object.
   *  
   * @param route - The route object
   * @returns {Apiroute} - The Route object
   */
  newRoute(route: ApiRoute): ApiRoute {
    return route;
  },

  /**
   * Create a new manifest object
   * 
   * This will simply create a manifest object that can be used with types for accessability.
   * 
   * @param manifest - The manifest object
   * @returns {ApiManifest} - The api manifest object
   */
  newManifest(manifest: ApiManifest): ApiManifest {
    return manifest;
  },

  /**
   * Create API Server
   * 
   * This method will create the API server according to the manifest object provided as well as
   * the options object.  It will return the express object in case you'd like to do anything special
   * with it. 
   * 
   * @param manifest - The manifest object with your API's configuration.
   * @param options - The options to be used when creating your api server
   * 
   * @returns - The final express object.
   */
  createServer(manifest: ApiManifest, options: CreateServerOptions): Application {

    // Establish the values from the options object.
    const application = options.express ?? express();
    const port = options.port ?? 8080;

    // Establish the 404 route that will be used if a route doesn't exist.
    const route404: ExpressExecutor = options.route404 ?? function (req, res) {
      const response = manifestation.newApiResponse({
        status: 404,
        message: `Cannot ${req.method} ${req.path}`,
        successful: false
      });

      return manifestation.sendApiResponse(res, response);
    }

    const registerRoute = (route: ApiRoute, instance) => {
      if (typeof route.method == "string")
        instance[route.method](
          route.route,
          ...(route.middleware ?? []),
          route.executor
        );

      if (typeof route.method == 'object')
        route.method.map(method => {
          instance[method](
            route.route,
            ...(route.middleware ?? []),
            route.executor
          );
        });
    }

    // Re-Establish the manifest
    manifest = {
      middleware: manifest.middleware ?? [],
      routes: manifest.routes ?? [],
      routers: manifest.routers ?? [],
      versions: manifest.versions ?? []
    }

    if ((manifest.middleware ?? []).length > 0) application.use(...(manifest.middleware ?? []));

    /**
     * Map out the base routes of the api with no version prefix
     */
    manifest.routes?.map(route => registerRoute(route, application));

    /**
     * Map out the base routers of the api.
     */
    manifest.routers?.map(r => {
      const router = express.Router();

      if ((r.middleware ?? []).length > 0) router.use(...(r.middleware ?? []));
      r.routes.map(route => registerRoute(route, router));

      application.use(r.route, router);
    })

    /**
     * Map out all of the versions and their associated routes.
     */
    manifest.versions?.map(version => {
      const vPrefix = `/v${version.version}`;

      const versionRouter = express.Router();

      version.routers?.map(r => {
        const router = express.Router();

        if ((r.middleware ?? []).length > 0) router.use(...(r.middleware ?? []));
        r.routes.map(route => registerRoute(route, router));

        versionRouter.use(r.route, router);
      })

      if ((version.middleware ?? []).length > 0) versionRouter.use(...(version.middleware ?? []))
      version.routes.map(route => registerRoute(route, versionRouter));

      application.use(vPrefix, versionRouter)
    })

    /**
     * Initilize the Unknwon route method.
     */
    setTimeout(() => {
      application['all'](
        "*",
        route404
      )
    }, 1)

    return application;
  }
}