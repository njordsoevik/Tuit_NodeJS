/**
 * @file Declares Message data type representing relationship between
 * users and users, as in user messages a user
 */
 import User from "../users/User";
 
 /**
  * @typedef message Represents messages relationship between a user and a user,
  * as in a user messages a user
  * @property {User} userSent User being messaged
  * @property {User} userReceived User messaging the user
  * @property {string} message Message text
  */

export default interface Message {
    userSent: User,
    userReceived: User,
    message: string,
    sentOn: Date
};