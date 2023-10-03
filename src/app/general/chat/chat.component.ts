import { Component, OnInit } from '@angular/core';
import { ChatMsj } from 'src/app/interfaces/chat-msj';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import { ZonahorariaService } from 'src/app/services/zonahoraria/zonahoraria.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {

  usuarioLogeado: any;
  mensaje:string='';
  mensajes:ChatMsj[]=[];
  mostrarChat=false;

  constructor(private authService: AuthService, private chatService: ChatService, private zonaHorariaService: ZonahorariaService) {}

  ngOnInit(): void {
    this.usuarioLogeado=this.authService.getUser();

    this.chatService.getMsjChat().subscribe((listaMensajes)=>{
      this.mensajes=listaMensajes;
    });
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

    this.chatService.addMsjChat(nuevoMensaje).then(()=>{
      const enviarMensajeSnd = new Audio();
      enviarMensajeSnd.src='../../../assets/chat/sonidos/msj-enviado.wav'
      enviarMensajeSnd.play();
  
      this.mensaje='';
  
      setTimeout(() => {
        this.scrollUltimoMensaje();
      }, 20);
    });
  }

  mostrarChatYScrollear(){
    this.mostrarChat=true;
    
    setTimeout(() => {
      this.scrollUltimoMensaje();
    }, 20);
  }

  scrollUltimoMensaje() {
    const msjContainer = document.getElementById('mensajes-container');

    if(msjContainer)
    {
      msjContainer.scrollTop = msjContainer.scrollHeight - msjContainer.clientHeight;
    }
  }
}