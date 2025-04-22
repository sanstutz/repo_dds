// import seedrandom from "seedrandom";
let seedrandom = require("seedrandom");
let rand = seedrandom(1763519);

let cant_positivos = 0;
let cant_negativos = 0;
let cant_resto = 0;
let array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
let menor = Infinity;
let menor_index = 0;
let cant_signo = 0;
let signo_anterior = NaN;
let num_digitos = new Array();
let promedio = 0;

for(let i = 0; i < 1000000; i++){
    const n = rand.int32();
    if (n > 0){
        cant_positivos++;
        if (signo_anterior === 1){
            cant_signo++;
        }
        signo_anterior = 1;
    }
    else if (n < 0){
        cant_negativos++;
        if (signo_anterior === -1){
            cant_signo++;
        }
        signo_anterior = -1;
    }
    else{
        signo_anterior = 0;
    }

    let resto = n % 7;
    if (resto === 0 || resto === 3 || resto === 5 || resto === 6){
        cant_resto++;
    }

    if (n < menor){
        menor = n;
        menor_index = i + 1;
    }

    let absn = Math.abs(n);
    let index = Math.floor((absn % 100) / 10);
    array[index]++;

    if (absn >= 100000 && absn <= 999999){
        num_digitos.push(n)
    }
}

let suma = 0;
for(let n of num_digitos){
    suma += n;
}
promedio = Math.round(suma / num_digitos.length);

console.log("Cantidad de numeros positivos:", cant_positivos);
console.log("Cantidad de numeros negativos:", cant_negativos);
console.log("Cantidad de numeros con resto 0, 3, 5 ó 6:", cant_resto);
console.log("Arreglo:", array);
console.log("Menor:", menor, "En la pos:", menor_index);
console.log("Cantidad de numeros con el mismo signo que el anterior:", cant_signo);
console.log("Promedio de los numeros de 6 digitos:", promedio);