
import {WASocket,
    getContentType
} from "@whiskeysockets/baileys" ;
import {Paco } from "./index"

import{flujos,mensajeDef,mensajeSalida}from "../Data/flujos.json"
import buffer from 'fs';

let mensaje = "sabias que ";


function ahajaja(){
    
}

export function menu(coon : WASocket, msg: Paco){
    if(!msg || msg.key.fromMe)return 
let a= getContentType(msg.message ?? undefined);
    let info= msg.key.remoteJid;
    if(msg.message?.ephemeralMessage && a){
        msg.message[a]?.toString()
    }

    

    if(a && info && a === "conversation" ){
        // check ephimeral message 
        console.log(msg.key.id)
    let b = msg.message?.[a]?.toLocaleLowerCase() as string;
    for(const flujo of flujos){
const pijaDeThanos=flujo.palabrasclave.some((a)=>a.match(b));
if(pijaDeThanos){
    console.log(flujo.texto)
switch(flujo.texto){
    case "ubi":
    coon.sendMessage(info, { location:{
        name: "disneyPark",
        address:"calle lopes Mateos no.12",
        degreesLatitude:33.81210176428599,
        degreesLongitude: -117.91897675139288
    }});
    console.log("mensaje de ubi")
    return;
    break;
    case "img":
   
    console.log("mensaje de imagen")
    return;
    break;
    default:
     coon.sendMessage(info,{text:mensajeSalida[0]})
}
}else{
    coon.sendMessage(info,{
        text: mensajeDef[0],
    })
}
    }
   
    }
}

