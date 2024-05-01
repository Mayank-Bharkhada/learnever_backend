import {
    type Handler,
    type Request,
    type Response,
    type NextFunction,
  } from "express";
  import { ZodError } from "zod";
  import ResponseHandler from "../lib/responseHandler.js";
  
  export function asyncMW(fn: Handler): Handler | NextFunction {
    return async function (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void | NextFunction> {
      try {
        await fn(req, res, next);
      } catch (e) {
        if (e instanceof ZodError) {
          ResponseHandler.badRequest(res, e.errors[0].message);
        }
        next(e);
      }
    };
  }
  