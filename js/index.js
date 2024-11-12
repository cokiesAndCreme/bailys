"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const baileys_1 = require("@whiskeysockets/baileys");
const menu_1 = require("./menu");
const boom_1 = require("@hapi/boom");
let images = {
    text: "hola pibe"
};
let botons = [
    { buttonReply: {
            displayText: "hola im a botton",
            id: "1",
            index: 1
        }, type: "plain" },
    { buttonReply: {
            displayText: "hola im a el segunfo botton",
            id: "2",
            index: 1
        }, type: "plain" }
];
let messageDefault = "chamito";
function vaqueroVaqueroVaquero(jid) {
    var _a;
    if (!jid)
        return;
    let decode = (0, baileys_1.jidDecode)(jid);
    return (_a = decode === null || decode === void 0 ? void 0 : decode.user.toString()) !== null && _a !== void 0 ? _a : undefined;
}
function StartWsth() {
    return __awaiter(this, void 0, void 0, function* () {
        const { state, saveCreds } = yield (0, baileys_1.useMultiFileAuthState)('./creends');
        const { version, isLatest } = yield (0, baileys_1.fetchLatestBaileysVersion)().catch(() => (0, baileys_1.fetchLatestBaileysVersion)());
        const sock = (0, baileys_1.makeWASocket)({
            printQRInTerminal: true,
            auth: state
        });
        sock.ev.on("connection.update", (update) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const { connection, lastDisconnect } = update;
            if (connection === "close") {
                let reason = (_a = new boom_1.Boom(lastDisconnect === null || lastDisconnect === void 0 ? void 0 : lastDisconnect.error)) === null || _a === void 0 ? void 0 : _a.output.statusCode;
                if (reason === baileys_1.DisconnectReason.badSession) {
                    console.log(`Bad Session File, Please Delete Session and Scan Again`);
                    process.exit();
                }
                else if (reason === baileys_1.DisconnectReason.connectionClosed) {
                    console.log("Connection closed, reconnecting....");
                    StartWsth();
                }
                else if (reason === baileys_1.DisconnectReason.connectionLost) {
                    console.log("Connection Lost from Server, reconnecting...");
                    StartWsth();
                }
                else if (reason === baileys_1.DisconnectReason.connectionReplaced) {
                    console.log("Connection Replaced, Another New Session Opened, Please Restart Bot");
                    process.exit();
                }
                else if (reason === baileys_1.DisconnectReason.loggedOut) {
                    console.log(`Device Logged Out, Please Delete Folder Session yusril and Scan Again.`);
                    process.exit();
                }
                else if (reason === baileys_1.DisconnectReason.restartRequired) {
                    console.log("Restart Required, Restarting...");
                    StartWsth();
                }
                else if (reason === baileys_1.DisconnectReason.timedOut) {
                    console.log("Connection TimedOut, Reconnecting...");
                    StartWsth();
                }
                else {
                    console.log(`Unknown DisconnectReason: ${reason}|${connection}`);
                    StartWsth();
                }
            }
            else if (connection === "open") {
                const botNumber = (_b = sock.user) === null || _b === void 0 ? void 0 : _b.id;
                if (botNumber) {
                    console.log("Bot success conneted to server", "green" + botNumber);
                    console.log("if this time tomorrow crry on carry on this is nothin realy mather ");
                    sock.sendMessage(botNumber, { text: `Bot started!\n\n enjoy it c:` });
                }
            }
        }));
        sock.ev.on("chats.upsert", (alo) => __awaiter(this, void 0, void 0, function* () {
            console.log("se agrego un chat");
        }));
        sock.ev.on("messages.upsert", (chatUpdate) => __awaiter(this, void 0, void 0, function* () {
            try {
                let msg = chatUpdate.messages[0];
                if (!msg.message || msg.key.fromMe)
                    return;
                //  let mensajePorDefault: string = "Mi numero";
                //  let aguas = vaqueroVaqueroVaquero(sock.user?.id ?? mensajePorDefault)
                //  console.log(`esta funcion es vaqueroVaquero ${aguas} y este es mi user ${sock.user?.id}`);
                (0, menu_1.menu)(sock, msg);
            }
            catch (_a) {
            }
        }));
        sock.ev.on("creds.update", saveCreds);
    });
}
StartWsth();
