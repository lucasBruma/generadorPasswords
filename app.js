const password = document.getElementById('password');
const copyButton = document.querySelector('.copy');
const divCopied = document.querySelector('.copied');
const nCharacters = document.getElementById('lengthText');
const rangeSlider = document.getElementById('length');
const symbolsCheckbox = document.getElementById('symbols');
const numbersCheckbox = document.getElementById('numbers');
const lowercaseCheckbox = document.getElementById('lowercase');
const uppercaseCheckbox = document.getElementById('uppercase');
const excludeSimilarCheckbox = document.getElementById('similar');

function generatePassword(length, symbols, numbers, lowercase, uppercase, excludeSimilar) {
    let password = '';
    let characterSet = '';
  
    // uso la opciones seleccionadas para ir formando el character set
    if (symbols) {
    characterSet += '!@#$%^&*';
    }
    if (numbers) {
    characterSet += '0123456789';
    }
    if (lowercase) {
        characterSet += 'abcdefghijklmnopqrstuvwxyz';
    }
    if (uppercase) {
        characterSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    
    // uso el character set para ir armando la contraseña
    for (let i = 0; i < length; i++) {
        let character;
        // genero caracter que no matchea con los caracteres excluyentes
        do {
            let index = Math.floor(Math.random() * characterSet.length);
            character = characterSet[index];
        } while (excludeSimilar && /[il1LoO0]/.test(character));
        // añado caracter a la contraseña
        password += character;
    }

    return password;
}

function getLength(){
    let length = rangeSlider.value;
    return length;
}

function updateNumberCharacters (length){
    nCharacters.textContent = length;
}

function checkBoxes(){
    // obtengo los valores de los checkBoxes
    let symbols = symbolsCheckbox.checked;
    let numbers = numbersCheckbox.checked;
    let lowercase = lowercaseCheckbox.checked;
    let uppercase = uppercaseCheckbox.checked;
    let excludeSimilar = excludeSimilarCheckbox.checked;

    return [symbols,numbers,lowercase,uppercase,excludeSimilar]
}

function checkFalses(checkBoxes){
    if(checkBoxes.every(checkbox => checkbox == false)) return true;
    else return false;
}

function optionsUpdatePass(option){
    let checks = checkBoxes();
    let length = getLength();

    // si hay algun checkbox que aun es true, genero la password. En el caso de que todas queden false, se lo advierto al usuario.
    if(!checkFalses(checks)){
        let passwordCreated = generatePassword(length,...checks);
        password.value = passwordCreated;
    }else{
        alert('No puedes eliminar mas opciones');
        option.checked = true;
    }
}

function showCopied(){
    copyButton.classList.add('copied');
}

function hideCopied(){
    copyButton.classList.remove('copied');
}

function checkCopied(){
    if(copyButton.classList.contains('copied')){
        hideCopied();
    }
}

rangeSlider.addEventListener('input', function() {
    // resetea el copied en caso de que ya se haya copiado una contraseña.
    if(copyButton.classList.contains('copied')){
        hideCopied();
    }
    // obtengo el valor del range slider
    let length = getLength();
    let checks = checkBoxes();
    // genero una nueva contraseña 
    let passwordCreated = generatePassword(length,...checks);
    password.value = passwordCreated;

    updateNumberCharacters(length);
});

copyButton.addEventListener('click', function() {
    // selecciono el contenido del input
    password.select();
    // copio el contenido al clipboard
    document.execCommand('copy');

    // alert('La contraseña se ha copiado al portapapeles');
    showCopied();
});


//al tocar una de las opciones, la contraseña se actualiza
//tambien se chequea si el boton de copied ya fue clickeado
symbolsCheckbox.addEventListener('click',()=>{
    optionsUpdatePass(symbolsCheckbox);
    checkCopied();
})

numbersCheckbox.addEventListener('click',()=>{
    optionsUpdatePass(numbersCheckbox);
    checkCopied();
})

lowercaseCheckbox.addEventListener('click',()=>{
    optionsUpdatePass(lowercaseCheckbox);
    checkCopied();
})

uppercaseCheckbox.addEventListener('click',()=>{
    optionsUpdatePass(uppercaseCheckbox);
    checkCopied();
})

excludeSimilarCheckbox.addEventListener('click',()=>{
    optionsUpdatePass(uppercaseCheckbox);
    checkCopied();
})


  