console.log("Hola mundo JS Servidor")

console.time("miProceso")

for(let i = 0; i < 10000; i++){}

console.timeEnd("miProceso")

let usuarios = [
    {nombre: "Ines", edad: 22},
    {nombre: "Maria", edad: 25},
];

console.table(usuarios)


