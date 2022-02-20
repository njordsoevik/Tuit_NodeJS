/**
 * @file Defines the follow schema in the 
 * follows collection
 */

import mongoose, {Schema} from "mongoose";
import Follow from "../../models/follows/Follow";

const FollowSchema = new mongoose.Schema<Follow>({
    follower: {type: Schema.Types.ObjectId, ref: "UserModel", required: true},
    followee: {type: Schema.Types.ObjectId, ref: "UserModel", required: true},
}, {collection: "follows"});
export default FollowSchema;