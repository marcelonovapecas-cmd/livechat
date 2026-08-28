
const socket = io();

let isLogged = false;

socket.on("welcome", (msg) => {
    const welcomeMessage = document.getElementById("chatBoxx");

    welcomeMessage.classList.remove("blur-md")

    const p = document.createElement("p");

    p.textContent = msg;

    p.classList.add("text-green-400");

    welcomeMessage.appendChild(p);

    welcomeMessage.scrollTo({
        top: welcomeMessage.scrollHeight,
        behavior: "smooth"
    });
});

socket.on("user-logout", (msg) => {

    const messagesArea = document.getElementById("chatBoxx");

    messagesArea.classList.add("blur-md")

    const p = document.createElement("p");

    p.textContent = msg;

    p.classList.add("text-red-400");

    messagesArea.appendChild(p);

    messagesArea.scrollTo({
        top: messagesArea.scrollHeight,
        behavior: "smooth"
    });
});

socket.on("chat-message", (msg) => {
    const messagesArea = document.getElementById("chatBoxx");
    const p = document.createElement("p");
    p.textContent = msg;
    messagesArea.appendChild(p);
    messagesArea.scrollTo({
        top: messagesArea.scrollHeight,
        behavior: "smooth"
    });
})

function handleSubmit(event) {
    event.preventDefault();

    const inputName = document.getElementById("name");
    const btonWelcome = document.getElementById("btnLogin");

    if (!isLogged) {

        const name = inputName.value.trim();

        if (name === "") {
            alert("Digite um nick para entrar no chat!");
            return;
        }

        const data = {
            name: name
        }

        socket.emit("username", data);
        inputName.value = "";
        inputName.disabled = true;
        btonWelcome.textContent = "Sair";

        const inputMessage = document.getElementById("message");
        const btnMsg = document.getElementById("btnMsg");

        inputMessage.disabled = false;
        btnMsg.disabled = false;

        isLogged = true;
    } else {
        socket.emit("logout");

        inputName.disabled = false;
        btnLogin.textContent = "Entrar";

        const inputMessage = document.getElementById("message");
        const btnMsg = document.getElementById("btnMsg");

        inputMessage.disabled = true;
        btnMsg.disabled = true;

        isLogged = false;
    }
}

function handleSendMessage(event) {
    event.preventDefault();

    const inputMessage = document.getElementById("message");
    socket.emit("textSend", inputMessage.value);
    inputMessage.value = "";
}





// npx @tailwindcss/cli -i ./src/input.css -o ./public/output.css --watch