import { default as mongoose, Schema } from "mongoose";
const structure = new Schema(
    {
        ou_id: { type: Schema.Types.ObjectId, required: true },
        branch_id: { type: Schema.Types.ObjectId, required: true },
        uid: { type: Schema.Types.ObjectId, required: true },
        login_date: { type: Date, default: new Date() }
    },
    { collection: "member_login_log" }
);
export default mongoose.model("member_login_log", structure);
