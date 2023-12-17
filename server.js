const express = require("express");
const { databaseConnect } = require("./model/dbconnection");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const http = require("http"); // Import http module

const app = express();
const server = http.createServer(app); // Create http server and pass the express app
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
    },
});

const PORT = process.env.PORT || 3005; // Use environment variable or default to 3005

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression(9));

const corsOptions = {
    origin: "https://chat-apk-q8110w6nf-anikepa.vercel.app", // Single origin
    methods: ["POST", "GET", "DELETE", "PUT"], // Array of methods
    credentials: true,
};
app.use(cors(corsOptions));

databaseConnect();

app.use("/", require("./router/indexRoute"));

const onlineUser = [];

io.on("connection", (socket) => {
    console.log("socket server is connected");

    socket.on('login', (data) => {
        onlineUser.push(data);
    });

    socket.on("chat-message", (message) => {
        io.emit(`${message.channelId}`, message);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

server.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`);
});
