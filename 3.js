// --- Property of Asa Marsal --- //

//Modul node.js stdin & stdout
const readline = require('readline');

//Input output interface logs
const executeiocode = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Fungsi mengurutkan array dengan metode bubblesort berurutan
function recursiveBubblesort(arr, n = arr.length) {
    if (n === 1) return;
    
    for (let i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        }
    }
    
    recursiveBubblesort(arr, n - 1);
}

//Fungsi memisahkan array kecil ke besar, ganjil dan genap
function sortinganArray(arr) {
    let arrTersortir = [...arr];
    recursiveBubblesort(arrTersortir);
    
    let ganjil = arrTersortir.filter(num => num % 2 !== 0);
    let genap = arrTersortir.filter(num => num % 2 === 0);
    
    console.log("Array:", arrTersortir.join(", "));
    console.log("Ganjil:", ganjil.join(", "));
    console.log("Genap:", genap.join(", "));
}

//Fungsi yang dijalankan pertama di cmd
function masukkanInput() {
    //Di nodejs question = prompt
    executeiocode.question('Masukkan array angka. contoh : [angka,angka,angka]) -> ', (input) => {
        try {
            // Hapus [], ubah ke number dan split
            const numbers = input.replace(/[\[\]]/g, '').split(',').map(Number);
            
            if (numbers.some(isNaN)) {
                //Bukan angka -> munculkan logs lagi
                throw new Error('Input harus dalam format angka');
            }
            
            sortinganArray(numbers);
            //Hentikan proses
            executeiocode.close();
        } catch (error) {
            console.log('Error:', error.message);
            masukkanInput();
        }
    });
}

masukkanInput();