import crypto from "crypto";
export function encrypt(password) {
    const cipher = crypto.createCipher("aes256", process.env.MEMBER_PWD_KEY);
    const chiperText = Buffer.concat([cipher.update(password), cipher.final()]);
    password = chiperText.toString("hex");
    return password;
}
export function decrypt(password) {
    const encryptedText = Buffer.from(password, "hex");
    const decipher = crypto.createDecipher("aes256", process.env.MEMBER_PWD_KEY);
    password = decipher.update(encryptedText) + decipher.final();
    return password;
}
