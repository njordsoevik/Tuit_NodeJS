import {Request, Response} from "express";

/**
 * @file Declares API methods for Messages related data access object methods
 */
export default interface MessageControllerI {
    userMessagesUser (req: Request, res: Response): void;
    deleteMessage (req: Request, res: Response): void;
    userDeletesAllMessagesToUser (req: Request, res: Response): void;
    findAllMessagesReceived (req: Request, res: Response): void;
    findAllMessagesSent (req: Request, res: Response): void;
    findAllMessagesToUser (req: Request, res: Response): void;
};