import express from "express";
import { default as router } from "./router.middlerware.js";
const app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");
    app.locals.pretty = true;
    return next();
});
app.use(express.json({ extended: true }));
router(app);
app.listen(process.env.PORT, () => console.log("listening on port " + process.env.PORT));
