import jwt from "jsonwebtoken";
export function create(payload) {
    return jwt.sign(payload, process.env.MEMBER_TOKEN_KEY, { expiresIn: process.env.MEMBER_TOKEN_EXPIRATION });
}
export function decode(token) {
    return token;
}
export function verify(token) {
    return token;
}
