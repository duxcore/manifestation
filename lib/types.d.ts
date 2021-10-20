import * as Express from "express";
export declare type ExpressExecutor = (req: Express.Request, res: Express.Response) => void;
export declare type MethodTypes = "get" | "post" | "put" | "delete" | "patch" | "all";
export interface CreateServerOptions {
    port?: number;
    express?: Express.Application;
    route404?: ExpressExecutor;
}
export declare type MiddlewareMethod = (req: Express.Request, res: Express.Response, next: () => void) => void;
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
    version: number;
    middleware?: MiddlewareMethod[];
    routes: ApiRoute[];
}
export interface ApiResponse {
    status?: number;
    message?: string;
    data?: any;
    successful?: boolean;
    meta?: any;
}
