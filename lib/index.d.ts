import express, { Application } from "express";
import { ApiManifest, ApiResponse, ApiRoute, CreateServerOptions } from "./types";
export * from './types';
export declare const manifestation: {
    /**
     * Send an API response within an express method
     *
     * @param res - Express response object
     * @param response - Response object that will be sent to client
     *
     * @returns {void}
     */
    sendApiResponse(res: express.Response, response: ApiResponse): void;
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
    newApiResponse(data: ApiResponse): ApiResponse;
    /**
     * Create a new route object
     *
     * This will create a route object with types to make it easy for anybody to create a new route
     * object.
     *
     * @param route - The route object
     * @returns {Apiroute} - The Route object
     */
    newRoute(route: ApiRoute): ApiRoute;
    /**
     * Create a new manifest object
     *
     * This will simply create a manifest object that can be used with types for accessability.
     *
     * @param manifest - The manifest object
     * @returns {ApiManifest} - The api manifest object
     */
    newManifest(manifest: ApiManifest): ApiManifest;
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
    createServer(manifest: ApiManifest, options: CreateServerOptions): Application;
};
