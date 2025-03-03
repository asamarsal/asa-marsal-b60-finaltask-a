const arr = [1, 2, 3];
// Cara 1: Array.from()
let copy1 = Array.from(arr);

// Cara 2: slice()
let copy2 = arr.slice();

// Cara 3: concat()
let copy3 = [].concat(arr);

console.log('Array asli:', arr);
console.log('Array copy1:', copy1);
console.log('Array copy2:', copy2);
console.log('Array copy3:', copy3);