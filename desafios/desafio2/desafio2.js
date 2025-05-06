import fs from "fs";

function leerArchivo(path){
    const archivo = fs.readFileSync("personas.json", "utf8");
    const array = JSON.parse(archivo);
    return array;
}

function insertarOrdenado(nombre, array){
    let a = 0;
    let b = array.length - 1;
    while (a < b){
        let c = Math.floor((a + b) / 2);
        if (nombre === array[c]){
            array.splice(c, 0, nombre);
            return;
        }
        else if (nombre > array[c])
            a = c + 1;
        else
            b = c - 1;
    }
    if (nombre < array[a])
        array.splice(a, 0, nombre); // era mas chico que el ultimo por revisar
    else
        array.splice(a + 1, 0, nombre); // era igual o mayor al ultimo por revisar
}

(function main(){
    const personas = leerArchivo("./personas.json");
    
    let sumaEdades = 0;
    let personaMasJoven = null;
    const gomezes = new Array();
    let sumaEdadesNombreParApellidoImpar = 0;
    const objeto = {
        mayores: 0,
        menores: 0,
        primeraMitad: 0,
        segundaMitad: 0
    }
    const contadorApellidos = {
        "CASTILLO": 0,
        "DIAZ": 0,
        "FERRER": 0,
        "PINO": 0,
        "ROMERO": 0
    }
    personas.forEach(persona => {
        sumaEdades += persona.edad;
        if (personaMasJoven === null || persona.edad < personaMasJoven.edad ){
            personaMasJoven = persona;
        }

        if (persona.apellido === "GOMEZ"){
            insertarOrdenado(persona.nombre, gomezes);
        }

        if (persona.nombre.length % 2 === 0 && persona.apellido.length % 2 !== 0){
            sumaEdadesNombreParApellidoImpar += persona.edad;
        }

        if (persona.edad > 18)
            objeto.mayores++; 
        else 
            objeto.menores++;     
        if (persona.apellido[0] <= 'L')
            objeto.primeraMitad++;
        else
            objeto.segundaMitad++;

        if (persona.apellido in contadorApellidos){
            contadorApellidos[persona.apellido]++;
        }
    });

    const promEdad = personas.length > 0 ? Math.round(sumaEdades / personas.length) : 0;
    console.log(`La edad promedio es ${promEdad}`);
    console.log(`La persona mas joven es ${personaMasJoven.nombre} ${personaMasJoven.apellido} con ${personaMasJoven.edad} años`);
    console.log("Los Gomez son:")
    console.log(gomezes.toLocaleString());
    console.log(`Las personas con un nombre con longitud par y apellido con longitud impar suman ${sumaEdadesNombreParApellidoImpar} años`);
    console.log("Este es el objeto:")
    console.log(JSON.stringify(objeto));
    console.log("Este es el contador de apellidos:")
    console.log(JSON.stringify(contadorApellidos));
})();