
const socket = io();

socket.on("welcome", (msg) => {
    const welcomeMessage = document.getElementById("welcomeText");
    const p = document.createElement("p");
    p.textContent = msg;
    p.classList.add("welcome-new-user")
    welcomeMessage.appendChild(p);
});

function handleSubmit(event) {
    event.preventDefault();

    const inputName = document.getElementById("name");
    const btonWelcome = document.getElementById("btnLogin");

    const data = {
        name: inputName.value,
        clientID: socket.id,
    }

    socket.emit("username", data);
    inputName.disabled = true;
    btonWelcome.disabled = true;

}

function handleSendMessage(event) {
    event.preventDefault();

    const inputMessage = document.getElementById("message");
    socket.emit("textSend", inputMessage.value)
}

socket.on("chat-message", (msg) => {
    const messagesArea = document.getElementById("welcomeText");
    const p = document.createElement("p");
    p.textContent = msg;
    messagesArea.appendChild(p);
})