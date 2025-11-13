
# Mercado Campesino (AgroMarket)

## Descripción

El mercado campesino siempre a sido parte importante en nuestra economía a nivel local y nacional, sin embargo, existen muchas dificultades que limitan a las familias campesinas distribuir eficientemente sus productos a mas hogares Colombianos, por eso, buscamos impulsar el mercado campesino por medio del desarrollo web de **AgroMarket**, que les permita a estas familias llegar a más corazones Colombianos.

## Objetivo

Ofrecer un espacio virtual que permita a los usuarios tener la comodidad de comprar y vender productos agrícolas, eliminando las barreras geopolíticas entre familias campesinas y potenciales clientes.

## Funcionalidades
Dentro del sistema tendremos funciones como:

- Registro y gestión de usuarios (Cliente, Productor, Administrador)
- Catalogo de productos
- Publicación de productos agrícolas
- Compra y venta de productos
- Consulta y facturación de pedidos
- Consulta de envíos

## Roles de Usuario

**👨Cliente** Navegar en diferentes catálogos para adquirir productos.

**👩‍🌾Productor** Publicar, gestionar sus productos y poder visualizar sus ventas.

**🎮Administrador** Gestionar usuarios y generar reportes.

## Rutas principales

**Productor:**
- `/Productor/crearProducto`
- `/Productor/editarProducto`
- `/Productor/eliminarProducto`
- `/Productor/gestionarVentas`
- `/Productor/editarPerfil`

**Cliente:**  
- `/Cliente/registro` 
- `/Cliente/ingreso`
- `/Cliente/editarPerfil` 
- `/Cliente/explorar`  
- `/Cliente/comprar`
- `/Cliente/consultarCompra`

**Administrador:**  
- `/admin/gestionarUsuarios`  
- `/admin/gestionarProductos`  
- `/admin/reportes`