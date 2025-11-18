"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerGlobal = loggerGlobal;
function loggerGlobal(req, res, next) {
    const date = new Date();
    const fecha = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} `;
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    console.log(`Estás ejecutando el método ${req.method}, en la ruta${req.url}, el día ${fecha}, a las ${time}`);
    next();
}
//# sourceMappingURL=loggerGlobal.js.map