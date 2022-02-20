import mongoose, {Schema} from "mongoose";
import Message from "../../models/messages/Message";

const MessageSchema = new mongoose.Schema<Message>({
    userSent: {type: Schema.Types.ObjectId, ref: "UserModel"},
    userReceived: {type: Schema.Types.ObjectId, ref: "UserModel"},
    message: {type: String}
}, {collection: "messages"});
export default MessageSchema;