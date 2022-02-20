import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages/Message";

export default class MessageDao implements MessageDaoI {
    private static MessageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if(MessageDao.MessageDao === null) {
            MessageDao.MessageDao = new MessageDao();
        }
        return MessageDao.MessageDao;
    }
    private constructor() {}
    findAllMessagesReceived = async (uid: string): Promise<Message[]> => 
        MessageModel
            .find({userReceived: uid});
    findAllMessagesSent = async (uid: string): Promise<Message[]> =>
        MessageModel.find({userSent: uid});
    findAllMessagesToUser = async (sender: string, receiver: string): Promise<any> =>
        MessageModel.find({userSent: sender, userReceived: receiver});
    userMessagesUser = async (sender: string, receiver: string): Promise<any> =>
        MessageModel.create({userSent: sender, userReceived: receiver});
    userDeletesAllMessagesToUser = async (sender: string, receiver: string): Promise<any> =>
        MessageModel.deleteMany({userSent: sender, userReceived: receiver});
    deleteMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({_id: mid});
}