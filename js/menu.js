"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menu = menu;
const baileys_1 = require("@whiskeysockets/baileys");
const flujos_json_1 = require("../Data/flujos.json");
const fs_1 = __importDefault(require("fs"));
let mensaje = "sabias que ";
const photo = fs_1.default.readFileSync("C:/Users/venta/Desktop/js/v1_cb/img/gato2.jpg");
function ahajaja() {
}
function menu(coon, msg) {
    var _a, _b, _c;
    console.log("inicio funcion menu");
    if (!msg || msg.key.fromMe)
        return;
    let info = msg.key.remoteJid;
    // let info2= msg.message?.buttonsResponseMessage
    let a = (0, baileys_1.getContentType)((_a = msg.message) !== null && _a !== void 0 ? _a : undefined);
    if (a && info && a === "conversation") {
        console.log(msg.key.id);
        let b = (_c = (_b = msg.message) === null || _b === void 0 ? void 0 : _b[a]) === null || _c === void 0 ? void 0 : _c.toLocaleLowerCase();
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
                        coon.sendMessage(info, {
                            image: photo
                        });
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
