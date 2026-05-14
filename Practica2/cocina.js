let productos = [
        {nombre: "Leche", precio: 2.5},
        {nombre: "Pan", precio: 1.0},
        {nombre: "Huevos", precio: 3.0},
        {nombre: "Tortas", precio: 2.0},
        {nombre: "Quesadillas", precio: 3.5},
        {nombre: "Queso", precio: 4.0},
        {nombre: "Frijoles", precio: 2.5},
    ];

function AgregarProducto() {

    let producto = prompt("Escribe tu producto");
    let precio = prompt("Escribe tu precio");

    productos.push({
        nombre: producto,
        precio: parseFloat(precio)
    });

    localStorage.setItem("productos", JSON.stringify(productos));

    console.table(productos)

}

function EditarProducto() {

    let indice = prompt("Escribe el índice del producto a editar");
    let producto = prompt("Escribe tu producto");
    let precio = prompt("Escribe tu precio");

    productos[indice] = {
        nombre: producto,
        precio: parseFloat(precio)
    };

    localStorage.setItem("productos", JSON.stringify(productos));

    console.table(productos)

}

function EliminarProducto() {

    let indice = prompt("Escribe el índice del producto a eliminar");

    productos.splice(indice, 1);

    localStorage.setItem("productos", JSON.stringify(productos));

    console.table(productos)

}
