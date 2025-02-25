function initMap() {
    const location = { lat: 43.238949, lng: 76.889709 }; // Координаты Алма-Аты (пример)
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: location,
    });
    new google.maps.Marker({
        position: location,
        map: map,
    });
}
window.onload = initMap;


// Обработка вопросов для чат-бота
function sendMessage() {
    const question = document.getElementById('chatInput').value;
    if (!question.trim()) {
        document.getElementById('chatResponse').textContent = 'Введите ваш вопрос!';
        return;
    }
    document.getElementById('chatResponse').innerHTML = `
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    `;
    setTimeout(() => {
        document.getElementById('chatResponse').textContent = `Ваш вопрос: "${question}". Ответ: пока не реализовано!`;
    }, 1000);
}

function toggleDirectors() {
const directorsList = document.getElementById('directorsList');
if (directorsList.classList.contains('collapse')) {
    directorsList.classList.remove('collapse');
} else {
    directorsList.classList.add('collapse');
}
}
const chatbotCard = document.getElementById("chatbotCard");
const chatModal = document.getElementById("chatModal");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");

chatbotCard.addEventListener("click", () => {
    chatModal.style.display = "block";
    chatModal.classList.remove("fade-out");
    chatModal.classList.add("fade-in");
});

// Закрытие чата
function closeChat() {
    chatModal.classList.remove("fade-in");
    chatModal.classList.add("fade-out");
    setTimeout(() => {
        chatModal.style.display = "none";
    }, 300);
}

// Отправка сообщения
function sendMessage() {
    const userMessage = chatInput.value.trim();
    if (userMessage === "") return;

    // Добавить сообщение пользователя
    const userMessageElement = document.createElement("div");
    userMessageElement.textContent = userMessage;
    userMessageElement.style.textAlign = "right";
    userMessageElement.style.marginBottom = "10px";
    chatMessages.appendChild(userMessageElement);

    chatInput.value = "";

    // Ответ чата
    const botResponseElement = document.createElement("div");
    botResponseElement.textContent = "Спасибо за ваш вопрос! Мы скоро ответим.";
    botResponseElement.style.textAlign = "left";
    botResponseElement.style.marginBottom = "10px";
    chatMessages.appendChild(botResponseElement);

    chatMessages.scrollTop = chatMessages.scrollHeight; // Прокрутка вниз
}