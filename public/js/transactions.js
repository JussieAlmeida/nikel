const mymodal = new bootstrap.Modal(#transaction-modal);
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
    transactions: []
};

ocument.getElementById("button-logout").addEventListener("click, logout");



//ADICIONAR LANÇAMENTO
document.getElementById("transaction-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const value =  parseFloat(document.getElementById("value-input").value);
    const descripition = document.getElementById("descripition-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="tape-input"]:checked').value;

    data.transactions.unshift({
        value: value, type: type, descripition: descripition, date: date
    });

    saveDate(date);
    e.target.reset();
    mymodal.hide();

    getTransaction();

   

    alert("Lançamento adicionado com sucesso.");


});

checklogged ();

function checklogged() {
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(!logged) {
        
        window.location.href = "index.html";
        return;
    }
    const dataUser = localStorage.getItem(logged);
    if(dataUser) {
     data = JSON.parse(dataUser);
    }

    getTransaction();

}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");
    
    window.location.href = "index.html"
}

function getTransaction() {
    const transactions = data.transactions;
    let transactionsHtml = ``;

    if(transactions.length) {
        transactions.forEach((item) => {
            let type = "Entrada";

            if(item.type === "2") {
                type = "Saída";
            }

            transactionsHtml += `
                <tr>
                    <th scope="row">${item.date}</th>
                     <td>${item.value.toFixed(2)}</td>
                     <td>${type}</td>
                     <td>${item.descripition}</td>
                </tr>
            `
        })
    }

    document.getElementById("transactions-list").innerHTML = transactionsHtml;
}

function saveDate(date){
    localStorage.setItem(data.login, JSON.stringify(data));
}