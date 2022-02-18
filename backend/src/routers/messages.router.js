import { Router } from "express";
import { messagesController } from "../controllers/index.js";
import { isLogged } from "../middlewares/userValidator.js";

const router_messages = Router();


// Create new chat
router_messages.ws("/", messagesController.chatMessagesSocket);


// This should render the view
router_messages.get("/", isLogged ,messagesController.showChat);




// View chats from user
router_messages.get("/:email", messagesController.showMessages);

export default router_messages;