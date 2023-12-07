const sendReqForReg = document.getElementById("sendReqForReg");
const regResult = document.getElementById("result");

sendReqForReg.onclick = async () => {
    let candidate = {
        username:`${document.getElementById("username").value}`,
        email:`${document.getElementById("email").value}`,
        password:`${document.getElementById("password").value}`
    }

    try {
        const response = await fetch('../api/auth/register', {
            method: "post",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(candidate)
        });
      
        const resStatus = response.status;
        if (resStatus == 201){
            regResult.innerHTML = "Успешная регистрация!";
            regResult.className = "font-bold";
        }
        else if(resStatus == 409){
            regResult.innerHTML = "Данный пользователь уже зарегестрирован!";
            regResult.className = "font-bold";
        }
        
      } 
      catch (error) {
        console.log('Error: ' + error);
      }
}

