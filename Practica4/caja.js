let pedidos = [];

function procesarPedido(onListo, onCancelado) {

    let indice = parseInt(prompt("Selecciona el número del pedido:")) - 1;

    if (!pedidos[indice]) {
        alert("Pedido no encontrado");
        return;
    }

    if (pedidos[indice].estatus !== "Listo") {
        alert("El pedido todavía no está listo en cocina" );
        return;
    }

    let opcion = prompt(
        "Selecciona el estado final:\n" +
        "1. Entregado\n" +
        "2. Cancelado"
    );

    switch (opcion) {

        case "1":
            pedidos[indice].estatus = "Entregado";
            onListo(`${pedidos[indice].producto} entregado`);
            break;

        case "2":
            pedidos[indice].estatus = "Cancelado";
            onCancelado(`${pedidos[indice].producto} cancelado`);
            break;
        default:
            alert("Opción inválida");
    }

    mostrarPedidos();
}

function agregarPedido() {

    mostrar_menu(productos);

    let indice = parseInt(
        prompt("Elige el número del producto (0 a " +(productos.length - 1) + "):")
    );

    if (
        isNaN(indice) ||
        indice < 0 ||
        indice >= productos.length
    ) {

        alert("Selección inválida");
        return;
    }

    let {nombre: producto,precio} = productos[indice];

    let pedido = {producto,precio,estatus: "Pendiente"};

    pedidos.push(pedido);

    console.log(`Pedido agregado: ${producto} - $${precio} - (${pedido.estatus})`);

    mostrarPedidos();

}

function calcularTotales() {

    const subtotal = pedidos.reduce((acum, { precio }) => acum + precio,0);

    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    return { subtotal, iva, total };

}

function mostrarPedidos() {

    console.log("\n===== PEDIDOS =====");

    pedidos.forEach(
        ({ producto, precio, estatus }, index) => {
            console.log(`${index + 1}. ${producto} - $${precio.toFixed(2)} - (${estatus})`);
        }
    );

    const { subtotal, iva, total } = calcularTotales();

    console.log("-------------------");
    console.log(`Subtotal: $${subtotal.toFixed(2)}`);
    console.log(`IVA 16%: $${iva.toFixed(2)}`);
    console.log(`Total: $${total.toFixed(2)}`);
    console.log("===================\n");

}

function hacerPromociones(productos) {

    const promos = productos.map((p) => ({

        ...p,
        precioPromo: parseFloat(
            (p.precio * 0.9).toFixed(2)
        ),
        descuento: "10% off",
    }));
    return promos;
}

function onListo(msg) {

    console.log(`LISTO: ${msg}`);
    alert(`Pedido listo: ${msg}`);
    mostrarPedidos();

}

function onCancelado(msg) {

    console.log(`CANCELADO: ${msg}`);
    alert(`Pedido cancelado: ${msg}`);
    mostrarPedidos();

}