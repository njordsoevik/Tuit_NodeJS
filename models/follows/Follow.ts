/**
 * @file Declares Bookmark data type representing relationship between
 * users and users, as in user follows a user
 */
 import User from "../users/User";
 
 /**
  * @typedef follow Represents follows relationship between a user and a user,
  * as in a user follows a user
  * @property {User} followee Tuit being followed
  * @property {User} follower User following the user
  */

export default interface Bookmark {
    follower: User,
    followee: User
};