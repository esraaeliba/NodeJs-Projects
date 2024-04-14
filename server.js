//#region Requires
const express = require("express");
const app = express();
const PORT = process.env.PORT || 7005;
const bodyParser = require('body-parser');
const UserRoutes = require("./Routes/UsersRoutes");
const OrderRoutes = require("./Routes/OrderRoutes");
const ItemRoutes = require("./Routes/ItemsRoutes");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Market");
//#endregion

//#region Middlware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//#endregion


app.use("/api/orders", OrderRoutes);
app.use("/api/items", ItemRoutes);
app.use("/api/users", UserRoutes);


app.listen(PORT, () => {
    console.log("http://localhost:" + PORT);
})