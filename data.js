const screen = document.querySelector('.current');
const prevScreen = document.querySelector('.prev');
const prevAnswer = document.querySelector('.jawaban')

let currentScreen = "";
let operator = "";
let perhitungan = "";
let prevOperand = "";
let currentOperand = "";
let kalkulasi = "";
let kalkulasiSelesai = false;
let jawabanSebelumnya = "";
let prevAnsSign = false;


function clickNumber(value) {
    if (value === '.' && currentScreen.includes('.')) return;
    if (kalkulasiSelesai === true && operator == null) {
        Clear();
        prevAnsSign = true;
    }
    currentScreen = currentScreen.toString() + value.toString();
    kalkulasiSelesai = false; // Reset flag kalkulasi selesai
    updateScreen();
}

function chooseOperation(operation) {
    if (currentScreen === "") return
    if (prevOperand !== '' && !kalkulasiSelesai) {
        Perhitungan();
    }
    operator = operation;
    prevOperand = currentScreen
    currentScreen = "";
    updateScreen();
}

function Perhitungan() {
    prev = parseFloat(prevOperand);
    current = parseFloat(currentScreen);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operator) {
        case '+':
            perhitungan = prev + current
            break
        case '-':
            perhitungan = prev - current
            break
        case '×':
            perhitungan = prev * current
            break
        case '÷':
            perhitungan = prev / current
            break
        default:
            return
    }
    // Menyusun kalkulasi dalam format yang diinginkan
    kalkulasi = `${prev} ${operator} ${current} =`;
    currentScreen = perhitungan;
    prevOperand = perhitungan; // Perbarui nilai prevOperand untuk perhitungan berikutnya
    jawabanSebelumnya = perhitungan; // Perbarui Prev Answer
    operator = undefined; // Tetap undefined hingga operator baru dipilih
    kalkulasiSelesai = true;
    prevAnsSign = true;
    updateScreen();
}
function Clear() {
    currentScreen = '';
    prevOperand = '';
    operator = undefined;
    perhitungan = '';
    kalkulasi = '';
    updateScreen();
}

function Delete() {
    currentScreen = currentScreen.toString().slice(0, -1)
    updateScreen();
}
function getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
        integerDisplay = ''
    } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
    } else {
        return integerDisplay
    }
}

function updateScreen() {
    screen.innerText = getDisplayNumber(currentScreen);
    if (operator != null) {
        prevScreen.innerText = `${getDisplayNumber(prevOperand)} ${operator}`;
    } else if (kalkulasi !== "") {
        prevScreen.innerText = kalkulasi;
    } else {
        prevScreen.innerText = "";
    }
    if(jawabanSebelumnya !== '' && prevAnsSign == true){
        prevAnswer.innerText = jawabanSebelumnya; 
    }else {
        return;
    }
}









