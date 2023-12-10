const result = document.getElementById("users-registered");

const getUsersNum = async ()  => {
        const res = await fetch ('../api/userNum/getUserNum');
        const usersNum = await res.json();
        result.innerHTML =  `Пользователей зарегестрировано: ${usersNum}`;
} 

window.onload = getUsersNum;