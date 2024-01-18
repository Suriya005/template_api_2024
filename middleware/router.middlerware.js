import login from "../routes/login.routes.js";
export default function (app) {
    app.use("/login", login);
}
