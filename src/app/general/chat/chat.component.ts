import { Component, OnInit } from '@angular/core';
import { onSnapshot } from 'firebase/firestore';
import { ChatMsj } from 'src/app/interfaces/chat-msj';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import { ZonahorariaService } from 'src/app/services/zonahoraria/zonahoraria.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  usuarioLogeado: any;
  mensaje:string='';
  mensajes:ChatMsj[]=[];

  constructor(private authService: AuthService, private chatService: ChatService, private zonaHorariaService: ZonahorariaService) {}

  ngOnInit(): void {
    this.usuarioLogeado=this.authService.getUser();

    this.chatService.getMsjChat().subscribe((listaMensajes)=>{
      this.mensajes=listaMensajes;
    });

    /*
    this.chatService.getMsjChat().subscribe((listaMensajes)=>{
      if(listaMensajes!==null)
      {
        this.mensajes=listaMensajes;
      }
    });^
    */
  }

  enviarMensaje(){
    const nombreUser = this.authService.getNombreUser();
    const fechaEnvio = this.zonaHorariaService.getHoraArg();

    let nuevoMensaje={
      id: this.usuarioLogeado.uid,
      user: nombreUser,
      texto: this.mensaje,
      fecha: fechaEnvio
    }
    //this.mensajes.push(nuevoMensaje);

    this.chatService.addMsjChat(nuevoMensaje);

    this.mensaje='';

    setTimeout(() => {
      this.scrollUltimoMensaje();
    }, 20);
  }

  scrollUltimoMensaje() {
    let elements = document.getElementsByClassName('msj');
    let ultimoElemento = elements[elements.length - 1];
    
    if (ultimoElemento instanceof HTMLElement) {
      let topPos = ultimoElemento.offsetTop;
      let container = document.getElementById('mensajes-container');
      
      if (container) {
        (container as HTMLElement).scrollTop = topPos;
      }
    }
  }
}
