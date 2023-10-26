import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Encuesta } from 'src/app/interfaces/encuesta';
import { EncuestaService } from 'src/app/services/encuesta/encuesta.service';
import { ZonahorariaService } from 'src/app/services/zonahoraria/zonahoraria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  form!: FormGroup;
  mostrarFormulario: boolean = true;
  encuestasUsuarios: Encuesta[] = [];

  constructor(private fb: FormBuilder, private encuestaService: EncuestaService, private zonahoraria: ZonahorariaService) { }

  ngOnInit(): void {

    this.encuestaService.getEncuestas().subscribe((listaEncuestas)=>{
      this.encuestasUsuarios=listaEncuestas;
    });

    this.form = this.fb.group({
      nombre: [
        '', [
          Validators.required,
          Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]+$'),
          Validators.maxLength(50),
        ]
      ],
      apellido: [
        '', [
          Validators.required,
          Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]+$'),
          Validators.maxLength(50),
        ]
      ],
      edad: [
        '', [
          Validators.required,
          Validators.min(18),
          Validators.max(99),
        ]
      ],
      telefono: [
        null, [
          Validators.required,
          Validators.pattern(/^\d{10}$/),
        ]
      ],
      comentario: [
        '',
        [
          Validators.maxLength(300),
          Validators.required,
        ]
      ],
      puntajePag: [
        0,
        [
          Validators.required
        ]
      ],
      puntajeJuegos: [
        0,
        [
          Validators.required
        ]
      ],
      puntajeReco: [
        0,
        [
          Validators.required
        ]
      ],
    });
  }

  enviarEncuesta() {
    const nuevaEncuesta: Encuesta = {
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      edad: this.form.value.edad,
      telefono: this.form.value.telefono,
      comentario: this.form.value.comentario,
      puntajePag: this.form.value.puntajePag,
      puntajeJuegos: this.form.value.puntajeJuegos,
      puntajeReco: this.form.value.puntajeReco,
      fecha: this.zonahoraria.getHoraArg()
    };

    this.encuestaService.addEncuesta(nuevaEncuesta).then(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Listo!',
        text: 'La encuesta se ha subido con éxito...',
      });
      this.mostrarFormulario=false;
    }).catch(() => {
      Swal.fire({
        icon: 'error',
        title: '¡Ups!',
        text: 'Ocurrió un error enviando la encuesta...',
      });
    });
  }
}
