import { Request, Response } from 'express';

export interface IController {
    addData: (req: Request, res: Response) => Promise<Response>;
    getData: (req: Request, res: Response) => Promise<Response>;
    updateData: (req: Request, res: Response) => Promise<Response>;
    deleteData: (req: Request, res: Response) => Promise<Response>;
}

