// --- Property of Asa Marsal --- //

//If DumbwaysJos = x 0.211, min = 50000, max-disc = 20000
//If DumbwaysMantap = x 0.3, min = 80000, max-disc = 40000

//Modul node.js stdin & stdout
const readline = require('readline');

//Input output interface logs
const executeiocode = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//DumbwaysJos (DJ)
const djMin = 50000;
const djDisc = 0.211;
const djDiscmax = 20000;

//DumbwaysMantap (DM)
const dmMin = 80000;
const dmDisc = 0.3;
const dmDiscmax = 40000;

function discCode(x, y) {
    let discount = 0;
    
    //DumbwaysJos (DJ)
    if (x === 1) {
        if (y >= djMin) {
            //Diskon 21.1%
            discount = y * djDisc;
            if (discount > djDiscmax) discount = djDiscmax;
            console.log('================================');
            console.log('[Anda memilih voucher DumbwaysJos]');
        } else {
            console.log('================================');
            console.log('Minimal pembelian Rp 50.000');
            return masukkanNominal(x);
        }
    }
    //DumbwaysMantap (DM)
    else if (x === 2) {
        if (y >= dmMin) {
            //Diskon 30%
            discount = y * dmDisc;
            if (discount > dmDiscmax) discount = dmDiscmax;
            console.log('================================');
            console.log('[Anda memilih voucher DumbwaysMantap]');
        } else {
            console.log('================================');
            console.log('\nMinimal pembelian Rp 80.000');
            return masukkanNominal(x);
        }
    } else {
        console.log('Pilihan tidak valid');
    }

    console.log(`Uang Anda: Rp. ${y}`);
    console.log(`Diskon: Rp. ${discount}`);
    console.log(`Total Pembayaran: Rp. ${y - discount}`);
    console.log(`Kembalian: Rp. ${y - (y - discount)}`);
    executeiocode.close();
}

function masukkanNominal(x) {
    executeiocode.question('================================\nMasukkan nominal pembelian : ', (input) => {
        const y = Number(input);
        if (isNaN(y)) {
            console.log('Masukkan nominal dalam bentuk angka');
            return masukkanNominal(x);
        }
        discCode(x, y);
    });
}

function masukkanInput() {
    //Di nodejs question = prompt
    executeiocode.question('Pilih voucher diskon : \n 1. DumbwaysJos \n 2. DumbwaysMantap \n Pilih 1 atau 2 : ', (input) => {
        const x = Number(input);
        if (x === 1) {
            masukkanNominal(x);2
        } else if (x === 2){
            masukkanNominal(x);
        } else {
            console.log('=================');
            console.log('[Harap mengikuti instruksi]');
            masukkanInput();
        }
    });
}

masukkanInput();