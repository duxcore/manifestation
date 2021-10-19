import * as Express from "express";

export type ExpressExecutor = (req: Express.Request, res: Express.Response) => void

export type MethodTypes = 
  | "get" 
  | "post" 
  | "put" 
  | "delete" 
  | "patch" 
  | "all"

export interface CreateServerOptions {
  port?: number,
  express?: Express.Application,
  route404?: ExpressExecutor;
}

export type MiddlewareMethod = (
  req: Express.Request,
  res: Express.Response,
  next: () => void
) => void;

export interface ApiManifest {
  routes?: ApiRoute[];
  middleware?: MiddlewareMethod[];
  versions?: ApiVersionManifest[];
}

export interface ApiRoute {
  route: string;
  method: MethodTypes[] | MethodTypes;
  middleware?: MiddlewareMethod[];
  executor: ExpressExecutor;
}

export interface ApiVersionManifest {
  version: number; // what version of the api is this?
  middleware?: MiddlewareMethod[];
  routes: ApiRoute[];
}

export interface ApiResponse {
  status?: number; // What is the status code returned with the api response.
  message?: string; // A message attached to the api response.
  data?: any; // The data returned with the api reponse (if any).
  successful?: boolean; // Was the api response successful?
  meta?: any; // Meta data sent along with the api response
}