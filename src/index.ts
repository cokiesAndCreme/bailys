import { 
    makeWASocket,
    useMultiFileAuthState,
    proto,
    fetchLatestBaileysVersion,
    DisconnectReason,
    jidDecode,
    getContentType,
    WASocket,
    
 } from "@whiskeysockets/baileys";
 import {menu}from "./menu"
 import { Boom } from '@hapi/boom';

 let images = {
  text:"hola pibe"
 }


let  botons = [
  {buttonReply: {
    displayText:"hola im a botton",
    id:"1",
    index: 1
  }, type:"plain"},
  {buttonReply: {
    displayText:"hola im a el segunfo botton",
    id:"2",
    index: 1
  }, type:"plain"}]

 

  let messageDefault:string = "chamito" ;
  function vaqueroVaqueroVaquero(jid: string | null | undefined):string | undefined{
    if(!jid) return ;
     let decode = jidDecode(jid);
    return decode?.user.toString() ?? undefined;
    

  }

  
  export type Paco = proto.IWebMessageInfo;
 
  async function StartWsth() {
    const { state, saveCreds} = await useMultiFileAuthState('./creends');
    const {version, isLatest } = await fetchLatestBaileysVersion().catch(()=>fetchLatestBaileysVersion());
    const sock = makeWASocket({
        printQRInTerminal:true,
        auth: state
    });


    sock.ev.on("connection.update", async (update)=>{
        const {connection, lastDisconnect} = update
        if (connection === "close") {
          let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
          if (reason === DisconnectReason.badSession) {
            console.log(`Bad Session File, Please Delete Session and Scan Again`);
            process.exit();
          } else if (reason === DisconnectReason.connectionClosed) {
            console.log("Connection closed, reconnecting....");
            StartWsth();
          } else if (reason === DisconnectReason.connectionLost) {
            console.log("Connection Lost from Server, reconnecting...");
            StartWsth();
          } else if (reason === DisconnectReason.connectionReplaced) {
            console.log("Connection Replaced, Another New Session Opened, Please Restart Bot");
            process.exit();
          } else if (reason === DisconnectReason.loggedOut) {
            console.log(`Device Logged Out, Please Delete Folder Session yusril and Scan Again.`);
            process.exit();
          } else if (reason === DisconnectReason.restartRequired) {
            console.log("Restart Required, Restarting...");
            StartWsth();
          } else if (reason === DisconnectReason.timedOut) {
            console.log("Connection TimedOut, Reconnecting...");
            StartWsth();
          } else {
            console.log(`Unknown DisconnectReason: ${reason}|${connection}`);
            StartWsth();
          }
        } else if (connection === "open") {
          const botNumber  =sock.user?.id;
          if(botNumber){ 
          
          console.log("Bot success conneted to server", "green" + botNumber);
          console.log("if this time tomorrow crry on carry on this is nothin realy mather ")
          sock.sendMessage(botNumber, { text: `Bot started!\n\n enjoy it c:` });
        
        

        }
    }})
    sock.ev.on("chats.upsert", async (alo)=>{
      console.log("se agrego un chat")
    })

    sock.ev.on("messages.upsert", async (chatUpdate)=>{
      try{ 
        let msg = chatUpdate.messages[0];
        if(!msg.message || msg.key.fromMe) return;
      
      //  let mensajePorDefault: string = "Mi numero";
      //  let aguas = vaqueroVaqueroVaquero(sock.user?.id ?? mensajePorDefault)
      //  console.log(`esta funcion es vaqueroVaquero ${aguas} y este es mi user ${sock.user?.id}`);

      
       menu(sock,msg)
      
      }catch{

      }
    })
    sock.ev.on("creds.update", saveCreds);

    
  }

  StartWsth();