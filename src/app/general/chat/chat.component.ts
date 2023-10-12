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
  usuarioNombre: string | null = null;
  mensaje: string = '';
  mensajes: ChatMsj[] = [];
  mostrarChat = false;

  constructor(private authService: AuthService, private chatService: ChatService, private zonaHorariaService: ZonahorariaService) { }

  ngOnInit(): void {
    this.authService.usuarioLogeado.subscribe((user)=>{
      this.usuarioLogeado = user;
      this.usuarioNombre = this.authService.nombreUsuario;
    });

    this.chatService.getMsjChat().subscribe((listaMensajes) => {
      this.mensajes = listaMensajes;

      listaMensajes.sort((a, b) => {
        const dateA = a.fecha;
        const dateB = b.fecha;

        if (dateB < dateA) {
          return 1;
        } else if (dateB > dateA) {
          return -1;
        } else {
          return 0;
        }
      });
    });
  }

  enviarMensaje() {
    const fechaEnvio = this.zonaHorariaService.getHoraArg();

    let nuevoMensaje = {
      id: this.usuarioLogeado.uid,
      user: this.usuarioNombre,
      texto: this.mensaje,
      fecha: fechaEnvio
    }

    this.chatService.addMsjChat(nuevoMensaje).then(() => {
      this.mensaje = '';
      this.emitirSonido('../../../assets/chat/sonidos/msj-enviado.wav');

      setTimeout(() => {
        this.scrollUltimoMensaje();
      }, 20);
    });
  }

  emitirSonido(src: string) {
    const enviarMensajeSnd = new Audio();
    enviarMensajeSnd.src = src;
    enviarMensajeSnd.play();
  }

  mostrarChatYScrollear() {
    this.mostrarChat = true;

    setTimeout(() => {
      this.scrollUltimoMensaje();
    }, 20);
  }

  scrollUltimoMensaje() {
    const msjContainer = document.getElementById('mensajes-container');

    if (msjContainer) {
      msjContainer.scrollTop = msjContainer.scrollHeight - msjContainer.clientHeight;
    }
  }
}