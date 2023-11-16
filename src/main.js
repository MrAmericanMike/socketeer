import Express from "express";
import HTTP from "http";
import { Server } from "socket.io";

const APP = Express();
const SERVER = HTTP.createServer(APP);
const IO = new Server(SERVER);
const PORT = process.env.PORT || 5050;

APP.use(Express.static("./public"));

APP.get("/api/ping", (req, res) => {
	res.json({ message: "pong" }).end;
});

IO.on("connection", async (socket) => {
	console.log("Client connected");

	socket.on("ping", (_, cb) => {
		console.log("Ping received");
		cb("Pong");
	});
	socket.on("disconnect", (data) => {
		console.log("Client disconnected", data);
	});
});

SERVER.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`);
});

