import { Request, Response } from 'express';

export interface IController {
    registration: (req: Request, res: Response) => Promise<Response>;
    signIn: (req: Request, res: Response) => Promise<Response>;
    editProfile: (req: Request, res: Response) => Promise<Response>;
    changePassword: (req: Request, res: Response) => Promise<Response>;
}
