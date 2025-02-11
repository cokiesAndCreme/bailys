"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menu = menu;
const baileys_1 = require("@whiskeysockets/baileys");
const flujos_json_1 = require("../Data/flujos.json");
let mensaje = "sabias que ";
function ahajaja() {
}
function menu(coon, msg) {
    var _a, _b, _c, _d, _e;
    if (!msg || msg.key.fromMe)
        return;
    let a = (0, baileys_1.getContentType)((_a = msg.message) !== null && _a !== void 0 ? _a : undefined);
    let info = msg.key.remoteJid;
    if (((_b = msg.message) === null || _b === void 0 ? void 0 : _b.ephemeralMessage) && a) {
        (_c = msg.message[a]) === null || _c === void 0 ? void 0 : _c.toString();
    }
    if (a && info && a === "conversation") {
        // check ephimeral message 
        console.log(msg.key.id);
        let b = (_e = (_d = msg.message) === null || _d === void 0 ? void 0 : _d[a]) === null || _e === void 0 ? void 0 : _e.toLocaleLowerCase();
        for (const flujo of flujos_json_1.flujos) {
            const pijaDeThanos = flujo.palabrasclave.some((a) => a.match(b));
            if (pijaDeThanos) {
                console.log(flujo.texto);
                switch (flujo.texto) {
                    case "ubi":
                        coon.sendMessage(info, { location: {
                                name: "disneyPark",
                                address: "calle lopes Mateos no.12",
                                degreesLatitude: 33.81210176428599,
                                degreesLongitude: -117.91897675139288
                            } });
                        console.log("mensaje de ubi");
                        return;
                        break;
                    case "img":
                        console.log("mensaje de imagen");
                        return;
                        break;
                    default:
                        coon.sendMessage(info, { text: flujos_json_1.mensajeSalida[0] });
                }
            }
            else {
                coon.sendMessage(info, {
                    text: flujos_json_1.mensajeDef[0],
                });
            }
        }
    }
}
