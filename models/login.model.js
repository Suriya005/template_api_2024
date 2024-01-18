import * as collection from "./schema/all.schema.js";
import { ObjectId } from "bson";
export function getGroupBranch(origin) {
    return new Promise((resolve, reject) => {
        collection.branch
            .find({ $and: [{ domain_group: origin }] })
            .select("_id domain_name")
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
}
export function getMember(branch_ids, username) {
    return new Promise((resolve, reject) => {
        collection.member
            .findOne({
                $and: [{ branch_id: { $in: branch_ids } }, { username: username.toUpperCase() }]
            })
            .select("_id ou_id branch_id username password password_type status")
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
}
export function findMemberSessionByUID(uid) {
    return new Promise((resolve, reject) => {
        collection.memberSession
            .findOne({
                $and: [{ uid: new ObjectId(uid) }]
            })
            .select("_id")
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
}
export function deleteMemberSession(_id) {
    return new Promise((resolve, reject) => {
        collection.memberSession
            .deleteMany({
                $and: [{ _id: new ObjectId(_id) }]
            })
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
}

export function insertMemberSession(member) {
    return new Promise((resolve, reject) => {
        const { ou_id, branch_id, _id: uid, username } = member;
        collection.memberSession
            .create({
                ou_id: new ObjectId(ou_id),
                branch_id: new ObjectId(branch_id),
                uid: new ObjectId(uid),
                token: null,
                ip: "127.0.0.1",
                status: "000",
                datetime: new Date(),
                start_date: new Date(),
                end_date: new Date(new Date().getTime() + 30000),
                cr_by: username,
                cr_date: new Date(),
                cr_prog: "member-session.model (insert)",
                upd_by: null,
                upd_date: null,
                upd_prog: null
            })
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
}
export function updateToken(member, token) {
    return new Promise((resolve, reject) => {
        const { _id: uid, username } = member;
        collection.memberSession
            .updateOne(
                {
                    $and: [{ uid: new ObjectId(uid) }]
                },
                {
                    $set: {
                        token: token,
                        upd_by: username,
                        upd_date: new Date(),
                        upd_prog: "member-session.model (update token)"
                    }
                }
            )
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
}
export function insertLoginLog(member) {
    return new Promise((resolve, reject) => {
        const { ou_id, branch_id, _id: uid } = member;
        collection.memberLoginLog
            .create({
                ou_id: new ObjectId(ou_id),
                branch_id: new ObjectId(branch_id),
                uid: new ObjectId(uid),
                login_date: new Date()
            })
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
}
