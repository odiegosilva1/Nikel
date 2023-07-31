const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

// CRIAR CONTA //
document.getElementById("create-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password =document.getElementById("password-create-input").value;
    

    if(email.length < 5) {
        alert("Preencha o campo com um endereço de e-mail válido.");
        return;
    }

    if (password.length < 6) {
        alert("A senha deve conter pelo menos 6 dígitos.");
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    })

    myModal.hide();
    alert("Conta criada com sucesso!");
    
});

function checkLogged (){
    if(session) {
        sessionStorage.getItem("logged", session);
        logged = session;
    }

    if(logged) {
        saveSession(logged, session);
        window.location.href = "home.html" 

    }

}



function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession (data, saveSession) {

    if(saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);

}

// LOGIN //

document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if(!account) {
        alert("Email ou senha incorretos.")
        return;
    }

    if(account) {
        if(account.password !== password) {
            alert("Email ou senha incorretos.")
            return;
        }

        saveSession(email, checkSession);


        window.location.href = "home.html"    
    }

    
});

function getAccount(key){
    const account = localStorage.getItem(key);

    if(account) {
        return JSON.parse(account);
    }

    return "";

}