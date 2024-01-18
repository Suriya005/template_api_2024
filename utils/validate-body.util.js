import _ from "lodash";
import content from "../config/validation-requirement.js";

export default async (body, key) => {
    return new Promise((resolve, reject) => {
        try {
            const failedCheck = [];
            const r = content[key];
            if (r) {
                for (const [ai, a] of Object.entries(Object.keys(r))) {
                    let allCompleted = true;
                    if (r[a].type === "string" && !checkString(body, r, a)) allCompleted = false;
                    if (allCompleted === false) failedCheck.push({ [a]: r[a] });
                    if (Number(ai) + 1 === Object.keys(r).length)
                        failedCheck.length > 0
                            ? resolve({ status: false, failed: failedCheck })
                            : resolve({ status: true });
                }
            } else {
                resolve({ status: true });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const checkString = (body, r, a) => {
    const isString = _.isString(body[a]);
    const isEmpty = _.isEmpty(body[a]);
    if (r[a].required === true && (!isString || (isString && isEmpty))) {
        return false;
    }
    if (r[a].required === false && !isString) {
        return false;
    }
    return true;
};
