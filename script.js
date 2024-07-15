// Obtém os elementos do formulário e seus campos de entrada
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const cPassword = document.getElementById("c-password");

// Show Error Message
function showError(input, message) {
    const formControl = input.parentElement; //Obtem o elemento pai do input
    formControl.className = "input error"; //Define a classe do pai como "input error" para estilização
    const small = formControl.querySelector("small"); // Seleciona o elemento <small> para a mensagem de erro
    small.innerText = message; // Define o texto da mensagem de erro
}

// Show Sucess message
function showSucess(input) {
    const formControl = input.parentElement; //Obtém o elemento pai do input
    formControl.classList.add("sucess"); // Adiciona a classe "sucess" ao pai para estilização
}

// Check Required fields
function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
    if (input.value.trim() === "") { //Verifica se o campo está vazio após remover espações em brancos
        showError(input, `${getFieldName(input)} é necessário`); //Mostra mensagem de erro se estiver vazio
    } else {
        showSucess(input); //Mostra mensagem de sucesso se não estiver vazio.
    }
    });
}

// Get Field Name
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1); //Capitaliza a primeira letra do id do input
}

// Check Input Lenght
function checkLenghth(input, min, max) {
    if (input.value.length < min) {
        showError(
            input, `${getFieldName(input)} deve ser pelo menos ${min} caracteres `   
        );
    } else if (input.value.length > max) {
        showError(
            input, `${getFieldName(input)} deve ser menor que ${max} caracteres `
        );
    } else {
        showSucess(input);
    }
}

// Check E-mail is Valid
function checkEmail(input) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (re.test(input.value.trim())) {
        showSucess(input);
    }else {
        showError(input, "E-mail não é válido");
    }
}

// Check Password Match
function checkPasswordMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, "Password não correspondente");
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkRequired([username, email, password, cPassword]);
    checkLenghth(username, 3, 15);
    checkLenghth(password, 8, 25);
    checkEmail(email);
    checkPasswordMatch(password,cPassword);
});

