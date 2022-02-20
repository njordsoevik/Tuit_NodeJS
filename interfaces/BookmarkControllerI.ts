import {Request, Response} from "express";

/**
 * @file Declares API methods for Bookmarks related data access object methods
 */
export default interface BookmarkControllerI {
    findAllUsersThatBookmarkedTuit (req: Request, res: Response): void;
    findAllTuitsBookmarkedByUser (req: Request, res: Response): void;
    userBookmarksTuit (req: Request, res: Response): void;
    userUnBookmarksTuit (req: Request, res: Response): void;
    userUnBookmarksAllTuit (req: Request, res: Response): void;
};