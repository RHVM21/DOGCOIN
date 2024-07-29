let score = 0;

// Инициализация Telegram Web Apps
Telegram.WebApp.ready();
const initData = Telegram.WebApp.initDataUnsafe;

// Отправьте initData на сервер для проверки
fetch('/api/check-data', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ initData })
})
.then(response => response.text())
.then(result => {
    console.log('Server response:', result);
})
.catch(error => {
    console.error('Error:', error);
});

document.getElementById('hamster').addEventListener('click', () => {
    score++;
    document.getElementById('score').textContent = `Очки: ${score}`;
});

document.getElementById('friends-btn').addEventListener('click', () => {
    document.getElementById('friends-modal').style.display = 'block';
});

document.getElementById('top-btn').addEventListener('click', () => {
    document.getElementById('top-modal').style.display = 'block';
});

document.getElementById('close-friends').addEventListener('click', () => {
    document.getElementById('friends-modal').style.display = 'none';
});

document.getElementById('close-top').addEventListener('click', () => {
    document.getElementById('top-modal').style.display = 'none';
});

// Пример данных для друзей и топа
const friends = ['Друг 1', 'Друг 2', 'Друг 3'];
const topPlayers = ['Игрок 1', 'Игрок 2', 'Игрок 3'];

const friendsList = document.getElementById('friends-list');
friends.forEach(friend => {
    const li = document.createElement('li');
    li.textContent = friend;
    friendsList.appendChild(li);
});

const topList = document.getElementById('top-list');
topPlayers.forEach(player => {
    const li = document.createElement('li');
    li.textContent = player;
    topList.appendChild(li);
});

// Отображение информации о пользователе
const userInfo = document.getElementById('user-info');
if (Telegram.WebApp.initDataUnsafe.user) {
    userInfo.textContent = `Привет, ${Telegram.WebApp.initDataUnsafe.user.first_name} ${Telegram.WebApp.initDataUnsafe.user.last_name}!`;
} else {
    console.log('Информация о пользователе не доступна');
}