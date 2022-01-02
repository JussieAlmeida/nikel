const mymodal = new bootstrap.Modal(#register-modal);
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checklogged();

//LOGAR NO SISTEMA
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const passoword = document.getElementById("passoword-input").value;
    const checksession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if(!account) {
         alert("opps! Verifique o usuário ou a senha.");
         return;
    }

    if(account) {
        if(account.passoword !== passoword)
        {
            alert("opps! Verifique o usuário ou a senha.");
            return;
        }
        savesession (email,checksession);
        windows.location.href = "home.html";
}
})

//CRIAR CONTA
document.getElementById("create-form").addEventListener("submit", function (e){
    e.preventDefault();
    
    const email = document.getElementById("email-creat-input").value;
    const passoword = document.getElementById("passoword-creat-input").value;

    if(email.length < 5) {
        alert("Preencha o campo com um e-mail valido.");
        return;
    }

    if(passoword.length < 4) {
        alert("Preencha a senha com no minimo 4 digitos.");
        return;
    }

    saveAccount({
      login: email,
      passoword: passoword,
      transactions: []

    });

    mymodal.hide();

    alert("Conta criada com sucesso.");
});

function checklogged() {
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged) {
        savesession(logged, session);

        window.location.href = "home.html";
    }
}

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function savesession(data, savesession) {
    if(savesession) {
        localStorage.setItem("session,data");
    }

    sessionStorage.setItem("logged,data");
}

function getAccount(key) {
    const account = localStorage.getItem(key);

    if(account) {
        return JSON.parse(account);
    }

    return "";
}

