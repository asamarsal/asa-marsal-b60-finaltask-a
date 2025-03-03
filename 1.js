// --- Property of Asa Marsal --- //

//Modul node.js stdin & stdout
const readline = require('readline');

//Input output interface logs
const executeiocode = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Cek bilangan prima atau bukan
function isPrima(angka) {
    if (angka < 2) return false;
    for (let i = 2; i <= Math.sqrt(angka); i++) {
        if (angka % i === 0) return false;
    }
    return true;
}

//Menambahkan  bilangan prima selanjutnya
function nextPrima(angka) {
    let next = angka + 1;
    while (!isPrima(next)) {
        next++;
    }
    return next;
}

function segitigaSiku(x) {

    //Inisialisasi bilangan prima pertama
    let bilPrima  = 2;
    for (let i = 1; i <= x; i++) {
        let stringBaris = '';
        for (let j = 1; j <= i; j++) {
            stringBaris += bilPrima + ' ';
            bilPrima = nextPrima(bilPrima);
        }
        console.log(stringBaris.trim());
    }
    executeiocode.close();
}

function masukkanInput() {
    //Di nodejs question = prompt
    executeiocode.question('drawSikuSiku(angka)\n Masukkan Angka : ', (input) => {
        const x = Number(input);
        if (isNaN(x)) {
            console.log('Masukkan input dalam bentuk angka');
            return masukkanInput(x);
        }
        else{
            //Harus >0 dan <10
            if (x <= 0 || x >= 10) {
                console.log('================================');
                console.log('[Harap mengikuti instruksi]');
                console.log('Masukkan angka antara 1-9');
                return masukkanInput();
            }
            else{
                console.log('================================');
                console.log('[Segitiga siku-sikunya adalah]\n');
                segitigaSiku(x);
            }
        }
    });
}

masukkanInput();