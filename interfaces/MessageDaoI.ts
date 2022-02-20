import Message from "../models/messages/Message";

/**
 * @file Declares API for Messages related data access object methods
 */
export default interface MessageDaoI {
    findAllMessagesReceived (uid: string): Promise<Message[]>;
    findAllMessagesSent (uid: string): Promise<Message[]>;
    findAllMessagesToUser (sender: string, receiver: string): Promise<Message[]>;
    userMessagesUser (sender: string, receiver: string, message: Message): Promise<any>;
    deleteMessage (uid: string, mid: string): Promise<Message>;
    userDeletesAllMessagesToUser (sender: string, receiver: string): Promise<any>; 
};