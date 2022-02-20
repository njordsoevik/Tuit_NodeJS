/**
 * @file Controller RESTful Web service API for messages resource
 */
 import {Express, Request, Response} from "express";
 import MessageDao from "../daos/MessageDao";
 import MessageControllerI from "../interfaces/MessageControllerI";
 import Message from "../models/messages/Message"
 /**
  * @class TuitController Implements RESTful Web service API for messages resource.
  * Defines the messageing HTTP endpoints:
  * <ul>
  *     <li>GET /api/users/:uid/messages/received to retrieve all the messages sent to a user
  *     </li>
  *     <li>GET /api/users/:uid/messages/sent to retrieve all the messages sent by a user
  *     </li>
  *     <li>GET /api/users/:uid/messages/:rid to retrieve messages that a user sent to another user
  *     </li>
  *     <li>POST /api/users/:uid/messages/:rid to record that a user messages a user
  *     </li>
  *     <li>DELETE /api/users/:uid/messages/:rid to record that a user
  *     deletes all messages to a user</li>
  *     <li>DELETE /api/messages/:mid to record that a user
  *     deletes all of their sent messages</li>
  * </ul>
  * @property {MessageDao} messageDao Singleton DAO implementing messages CRUD operations
  * @property {MessageController} MessageController Singleton controller implementing
  * RESTful Web service API
  */
 export default class MessageController implements MessageControllerI {
     private static messageDao: MessageDao = MessageDao.getInstance();
     private static messageController: MessageController | null = null;
     /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return TuitController
      */
     public static getInstance = (app: Express): MessageController => {
         if(MessageController.messageController === null) {
             MessageController.messageController = new MessageController();
             app.get("/api/users/:uid/messages/received", MessageController.messageController.findAllMessagesReceived);
             app.get("/api/users/:uid/messages/sent", MessageController.messageController.findAllMessagesSent);
             app.get("/api/users/:uid/messages/:rid", MessageController.messageController.findAllMessagesToUser);
             app.post("/api/users/:uid/messages/:rid", MessageController.messageController.userMessagesUser);
             app.delete("/api/messages/:mid", MessageController.messageController.deleteMessage);
             app.delete("/api/users/:uid/messages/:rid", MessageController.messageController.userDeletesAllMessagesToUser);
         }
         return MessageController.messageController;
     }
 
     private constructor() {}
 
     /**
      * Retrieves all users that messageed a user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter tid representing the messageed user
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user objects
      */
     findAllMessagesSent = (req: Request, res: Response) =>
         MessageController.messageDao.findAllMessagesSent(req.params.uid)
             .then(messages => res.json(messages));
 
     /**
      * Retrieves all users messageed by a user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user messageed the users
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user objects that were messageed
      */
     findAllMessagesReceived = (req: Request, res: Response) =>
         MessageController.messageDao.findAllMessagesReceived(req.params.uid)
             .then(messages => res.json(messages));

      /**
      * Retrieves all users messageed by a user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user messageed the users
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user objects that were messageed
      */
    findAllMessagesToUser = (req: Request, res: Response) =>
       MessageController.messageDao.findAllMessagesToUser(req.params.uid, req.params.rid)
           .then(messages => res.json(messages));

     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid and tid representing the user that is messageing the user
      * and the user being messageed
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new messages that was inserted in the
      * database
      */
     userMessagesUser = (req: Request, res: Response) =>
         MessageController.messageDao.userMessagesUser(req.params.uid, req.params.rid, req.body)
             .then((message: Message) => res.json(message));
            //  createTuitByUser = (req: Request, res: Response) =>
            //  TuitController.tuitDao.createTuitByUser(req.params.uid, req.body)
            //      .then((tuit: Tuit) => res.json(tuit));
     
     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid and tid representing the user that is unmessageing
      * the user and the user being unmessageed
      * @param {Response} res Represents response to client, including status
      * on whether deleting the messages was successful or not
      */
      deleteMessage = (req: Request, res: Response) =>
         MessageController.messageDao.deleteMessage(req.params.mid)
             .then(status => res.send(status));

     /**
      * @param {Request} req Represents request from client, including the
      * path parameter ui representing the user that is unmessageing
      * the users
      * @param {Response} res Represents response to client, including status
      * on whether deleting the messages was successful or not
      */
      userDeletesAllMessagesToUser = (req: Request, res: Response) =>
         MessageController.messageDao.userDeletesAllMessagesToUser(req.params.uid, req.params.rid)
             .then(status => res.send(status));
 };