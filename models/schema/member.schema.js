import { default as mongoose, Schema } from "mongoose";
const structure = new Schema(
    {
        ou_id: { type: Schema.Types.ObjectId, required: true },
        branch_id: { type: Schema.Types.ObjectId, required: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        password_type: { type: String, required: false },
        status: { type: String, required: true }
    },
    { collection: "member" }
);
export default mongoose.model("member", structure);
