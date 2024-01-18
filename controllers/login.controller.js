import validateBody from "../utils/validate-body.util.js";
import * as MPW from "../utils/member-password.util.js";
import * as JWT from "../utils/member-token.util.js";
import * as model from "../models/login.model.js";
export default async function login(req, res) {
    try {
        const { headers, body } = req;
        const { origin = "http://127.0.0.1:80" } = headers;
        const validate = await validateBody(body, "login");
        const failed = validate.failed;
        if (validate.status !== true) throw { status: 100, message: "invalid parameters", failed };
        const groupBranch = await model.getGroupBranch(origin);
        const branch_ids = groupBranch.map((b) => b._id);
        const { username, password } = body;
        const member = await model.getMember(branch_ids, username);
        if (!member) throw { status: 300, message: "find member not found" };
        if (member.status !== "0") throw { status: 300, message: "member was locked" };
        if (MPW.encrypt(password) !== member.password) throw { status: 300, message: "wrong password" };
        const eSession = await model.findMemberSessionByUID(member._id);
        if (eSession) await model.deleteMemberSession(eSession._id);
        const session = await model.insertMemberSession(member);
        const domain = groupBranch.filter((b) => b._id.toString() === member.branch_id.toString())[0]?.domain_name;
        const payload = {
            _id: member._id,
            ou_id: member.ou_id,
            branch_id: member.branch_id,
            username: member.username,
            url_landing: domain.url
        };
        const token = JWT.create(payload);
        await model.updateToken(member, token);
        await model.insertLoginLog(member);
        const password_type = member.password_type;
        const url = `${domain}/authentication.html?key=${session._id}`;
        res.status(200).send({ status: 200, message: "success", token, password_type, url }).end();
    } catch (e) {
        if (e instanceof Error) {
            const message = e.message;
            const stack = e.stack;
            res.status(500).send({ status: 500, message: "internal server error", error: { message, stack } }).end();
        } else {
            res.status(200).send(e).end();
        }
    }
}
