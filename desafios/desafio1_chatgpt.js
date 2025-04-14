const seedrandom = require('seedrandom');

// Inicializar el generador con la semilla proporcionada
const rng = seedrandom(1763519);

// Generar 1,000,000 números enteros usando int32
const numbers = Array.from({ length: 1_000_000 }, () => rng.int32());

// Inicializar contadores y variables
let positives = 0;
let negatives = 0;
let modCount = { 0: 0, 3: 0, 5: 0, 6: 0 };
let tensDigitCount = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
let minValue = Number.MAX_SAFE_INTEGER;
let minPosition = -1;
let sameSignAsPrevious = 0;
let sumSixDigitNumbers = 0;
let countSixDigitNumbers = 0;

for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];

    // Positivos y negativos
    if (num > 0) positives++;
    else if (num < 0) negatives++;

    // Módulo con 7
    const mod7 = ((num % 7) + 7) % 7; // Manejo correcto de negativos
    if ([0, 3, 5, 6].includes(mod7)) {
        modCount[mod7]++;
    }

    // Anteúltimo dígito (decenas)
    const absNum = Math.abs(num);
    if (absNum >= 10) {
        const tensDigit = Math.floor((absNum % 100) / 10);
        tensDigitCount[tensDigit]++;
    } else {
        tensDigitCount[0]++; // Si es menor a 10, decena es 0
    }

    // Menor valor y su posición
    if (num < minValue) {
        minValue = num;
        minPosition = i + 1; // posición empieza en 1
    }

    // Comparar signos con el anterior
    if (i > 0) {
        const prev = numbers[i - 1];
        if ((num >= 0 && prev >= 0) || (num < 0 && prev < 0)) {
            sameSignAsPrevious++;
        }
    }

    // Promedio de números con 6 dígitos
    const digitCount = absNum.toString().length;
    if (digitCount === 6) {
        sumSixDigitNumbers += num;
        countSixDigitNumbers++;
    }
}

// Resultados
console.log('Cantidad de números positivos:', positives);
console.log('Cantidad de números negativos:', negatives);
console.log('Cantidad de números con resto 0, 3, 5 o 6 al dividir por 7:', modCount);
console.log('Contadores según anteúltimo dígito:', tensDigitCount);
console.log('Menor valor:', minValue, '| Posición:', minPosition);
console.log('Cantidad con el mismo signo que el anterior:', sameSignAsPrevious);
const avgSixDigits = countSixDigitNumbers === 0 ? 0 : Math.round(sumSixDigitNumbers / countSixDigitNumbers);
console.log('Promedio de números con exactamente 6 dígitos:', avgSixDigits);