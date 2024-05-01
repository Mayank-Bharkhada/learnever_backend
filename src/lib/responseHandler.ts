import { Response } from "express";

class ResponseHandler {
    static success = ( res: Response, data: unknown, message : string ) => {
        return res.status(200).json({
            success: true,
            message,
            code: 200,
            data,
        });
    };

    static created = ( res: Response, data: unknown, message : string ) => {
        return res.status(201).json({
            success: true,
            message,
            code: 201,
            data,
        });
    };

    static serverError = ( res: Response, error: unknown, message : string = "Something went wrong" ) => {
        return res.status(500).json({
            success: false,
            message, 
            code: 500,
            error,
        });
    };

    static badRequest = ( res: Response, error: unknown, message : string = "Bad Request" ) => {
        return res.status(400).json({
            success: false,
            message,
            code: 400,
            error,
        });
    };

    static notFound = ( res: Response, message: string ) => {
        return res.status(404).json({
            success: false,
            message,
            code: 404,
        });
    };

    static unAuthorized = ( res: Response, message: string ) => {
        return res.status(401).json({
            success: false,
            message,
            code: 401,
        });
    };

    static conflict = ( res: Response, message: string ) => {
        return res.status(409).json({
            success: false,
            message,
            code: 409,
        });
    };

}

export default ResponseHandler