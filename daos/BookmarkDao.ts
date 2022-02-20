import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";

export default class BookmarkDao implements BookmarkDaoI {
    private static BookmarkDao: BookmarkDao | null = null;
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.BookmarkDao === null) {
            BookmarkDao.BookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.BookmarkDao;
    }
    private constructor() {}
    findAllUsersThatBookmarkedTuit = async (tid: string): Promise<Bookmark[]> => // TODO: Should this return User[]
        BookmarkModel
            .find({tuit: tid})
            .populate("bookmarkedBy")
            .exec();
    findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedBy: uid})
            .populate("tuit")
            .exec();
    userBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.create({tuit: tid, bookmarkedBy: uid});
    userUnBookmarksAllTuit = async (uid: string): Promise<any> =>
        BookmarkModel.deleteMany({bookmarkedBy: uid});
    userUnBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({tuit: tid, bookmarkedBy: uid});
}