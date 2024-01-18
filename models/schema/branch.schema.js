import { default as mongoose, Schema } from "mongoose";
const structure = new Schema(
    {
        ou_id: { type: Schema.Types.ObjectId, required: true },
        branch_name: { type: String, required: true },
        branch_code: { type: String, required: true },
        domain_name: { type: String, required: true },
        domain_name_list: { type: [String], required: true },
        domain_group: { type: String, required: false }
    },
    { collection: "su_branch" }
);
export default mongoose.model("su_branch", structure);
