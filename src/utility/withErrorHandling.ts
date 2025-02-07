import {Request, Response, NextFunction} from "express";
import createHttpError from "http-errors";

export const withErrorHandling =
    (fn: any) => async (req: Request, res: Response, next: NextFunction) => {
        return await Promise.resolve(fn(req, res, next)).catch((error) => {
            console.error(error);
            next(createHttpError(500, error.message));
        });
    };

export default withErrorHandling;
