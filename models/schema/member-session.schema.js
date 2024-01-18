import { default as mongoose, Schema } from "mongoose";
const structure = new Schema(
    {
        ou_id: { type: Schema.Types.ObjectId, required: true },
        branch_id: { type: Schema.Types.ObjectId, required: true },
        uid: { type: Schema.Types.ObjectId, required: true },
        token: { type: String, required: false },
        ip: { type: String, default: "127.0.0.1" },
        status: { type: String, default: "000" },
        datetime: { type: String, default: "127.0.0.1" },
        start_date: { type: Date, default: new Date() },
        end_date: { type: Date, default: new Date(new Date().getTime() + 30000) },
        cr_by: { type: String, required: true },
        cr_date: { type: Date, default: new Date() },
        cr_prog: { type: String, default: "member-session.model (insert)" },
        upd_by: { type: String, default: null },
        upd_date: { type: Date, default: null },
        upd_prog: { type: String, default: null }
    },
    { collection: "member_session" }
);
export default mongoose.model("member_session", structure);
