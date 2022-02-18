import { messagesDao } from "../database/daos/index.js";
import { loggerDefault, loggerErrors } from "../utils/loggers.js";

export function chatMessagesSocket(s, req) {
    // On connection, send all messages
    messagesDao.getAll().then((messages) => {
        s.send(JSON.stringify(messages));
    });

    s.on("message", async (message) => {
        try {
            const { type, body, email } = JSON.parse(message);
            const mess = await messagesDao.create({ type: type, body: body, email: email });
            s.send(JSON.stringify(mess));
        } catch (error) {
            loggerErrors.error(error.message);
        }
    });
}

// Example to see socket working
export function showChat(req, res) {
    res.status(200).send(`
    <!doctype html>
<html lang=en>
<head>
<meta charset=utf-8>
<meta name=viewport content="width=device-width, initial-scale=1">
<title>Websocket test</title>
<style>
h1 { font-family: helvetica, sans-serif; margin: 0; }
h1+p { margin: 0; }
</style>
</head>
<body>
<h1>Messages test</h1>

<label for="type">Message type</label>
<select id="type">
    <option value="system">System</option>
    <option value="user">User</option>
</select>

<label for="type">Email</label>
<input id="email" type="text" />

<label for="message">Message</label>
<input id="message" type="text" />
<button onclick="sendMessage()">Send message</button>

<p id="l"></p>
<script>


var l = document.getElementById('l');
var log = function (m) {
    var i = document.createElement('li');
    i.innerText = new Date().toISOString()+' '+m;
    l.appendChild(i);
}
log('opening websocket connection');
var s = new WebSocket('ws://localhost:8080/api/messages/');
s.onopen = function () {
    log('websocket connection opened');
}
s.onmessage = function (e) {
    const data = JSON.parse(e.data);
    if(data.length > 0){
        data.forEach(function (m) {
            log(m.type+ " - "+m.email+': '+m.body);
        });
    }
    else{
        log(data.type+ " - "+data.email+': '+data.body);
    }

}

function sendMessage() {
    const type = document.getElementById("type").value;
    const message = document.getElementById("message").value;
    const email = document.getElementById("email").value;
    s.send(JSON.stringify({type:type,body:message,email:email}));
}

</script>
</body>
</html>
    
    `);
}

export async function showMessages(req, res) {
    try {
        const messages = await messagesDao.getMessagesByEmail(req.params.email);
        res.status(200).json(messages);
    } catch (error) {
        loggerErrors.error(error.message);
        res.status(error?.status || 400).json(error);
    }
}
