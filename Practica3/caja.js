let pedidos = [];
let totalAcumulado = 0;

function agregarPedido(){

    let producto = prompt("Escribe tu producto");
    let precio = prompt("Escribe tu precio");

    pedidos.push({producto, precio});
    totalAcumulado += precio;
    console.log(`Pedido agregado: ${producto} - $${precio}`);
}

function mostrarPedidos(){
    console.log("Pedidos actuales:");
    pedidos.forEach((pedido, index) => {
        console.log(`${index + 1}. ${pedido.producto} - $${pedido.precio}`);
    });
    console.log(`Total acumulado: $${totalAcumulado}`);
    console.table(pedidos);
}