import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css', './ahorcado-btn-letra.css', '../juegos-btn-empezar.css']
})
export class AhorcadoComponent implements OnInit {
  juegoIniciado: boolean = false;
  palabraAAdivinar: string='';
  pista: string='';
  letrasAdivinadas: string[] = [];
  intentosRestantes: number = 6;
  letrasPresionadas: Set<string> = new Set();
  botonesColores: { [key: string]: string } = {};
  mostrarPista: boolean=false;
  letraElegidaSinAcentos: string='';
  palabrasConPistas = [
    { palabra: 'perro', pista: 'Animal doméstico' },
    { palabra: 'gato', pista: 'Animal doméstico' },
    { palabra: 'elefante', pista: 'Animal grande de África' },
    { palabra: 'jirafa', pista: 'Animal con cuello largo' },
    { palabra: 'tigre', pista: 'Felino rayado' },
    { palabra: 'águila', pista: 'Ave rapaz' },
    { palabra: 'cocodrilo', pista: 'Reptil acuático' },
    { palabra: 'koala', pista: 'Animal australiano' },
    { palabra: 'ballena', pista: 'Mamífero marino' },
    { palabra: 'tortuga', pista: 'Reptil con caparazón' },
    { palabra: 'italia', pista: 'País en Europa' },
    { palabra: 'japón', pista: 'País en Asia' },
    { palabra: 'australia', pista: 'País en Oceanía' },
    { palabra: 'brasil', pista: 'País en América del Sur' },
    { palabra: 'china', pista: 'País en Asia' },
    { palabra: 'rusia', pista: 'País en Europa y Asia' },
    { palabra: 'canadá', pista: 'País en América del Norte' },
    { palabra: 'suecia', pista: 'País en Europa' },
    { palabra: 'india', pista: 'País en Asia' },
    { palabra: 'méxico', pista: 'País en América del Norte' },
    { palabra: 'silla', pista: 'Mueble para sentarse' },
    { palabra: 'mesa', pista: 'Mueble para poner cosas' },
    { palabra: 'armario', pista: 'Mueble para guardar ropa' },
    { palabra: 'sofá', pista: 'Mueble para descansar' },
    { palabra: 'cama', pista: 'Mueble para dormir' },
    { palabra: 'ropero', pista: 'Mueble para ropa' },
    { palabra: 'rojo', pista: 'Color cálido' },
    { palabra: 'verde', pista: 'Color de la naturaleza' },
    { palabra: 'azul', pista: 'Color del cielo' },
    { palabra: 'amarillo', pista: 'Color brillante' },
    { palabra: 'naranja', pista: 'Color frutal' },
    { palabra: 'fruta', pista: 'Alimento natural' },
    { palabra: 'vegetal', pista: 'Alimento de plantas' },
    { palabra: 'agua', pista: 'Elemento vital' },
    { palabra: 'fuego', pista: 'Elemento que arde' },
    { palabra: 'tierra', pista: 'Planeta habitable' },
    { palabra: 'aire', pista: 'Elemento gaseoso' },
    { palabra: 'luz', pista: 'Radiación electromagnética' },
    { palabra: 'cine', pista: 'Lugar para ver películas' },
    { palabra: 'música', pista: 'Arte sonoro' },
    { palabra: 'libro', pista: 'Fuente de conocimiento' },
    { palabra: 'familia', pista: 'Grupo de personas relacionadas' },
    { palabra: 'amigo', pista: 'Persona cercana' },
    { palabra: 'viaje', pista: 'Desplazamiento a otro lugar' },
    { palabra: 'avión', pista: 'Medio de transporte aéreo' },
    { palabra: 'coche', pista: 'Medio de transporte terrestre' },
    { palabra: 'bicicleta', pista: 'Medio de transporte con pedales' },
    { palabra: 'computadora', pista: 'Máquina electrónica' },
    { palabra: 'teléfono', pista: 'Dispositivo de comunicación' },
    { palabra: 'televisión', pista: 'Medio de entretenimiento' },
    { palabra: 'trabajo', pista: 'Actividad laboral' },
    { palabra: 'dinero', pista: 'Medio de intercambio' },
    { palabra: 'amor', pista: 'Sentimiento afectivo' },
    { palabra: 'odio', pista: 'Sentimiento negativo' },
    { palabra: 'risa', pista: 'Expresión de alegría' },
    { palabra: 'llanto', pista: 'Expresión de tristeza' },
    { palabra: 'canción', pista: 'Composición musical' },
    { palabra: 'poesía', pista: 'Expresión literaria' },
    { palabra: 'arte', pista: 'Expresión creativa' },
    { palabra: 'ciencia', pista: 'Búsqueda de conocimiento' },
    { palabra: 'historia', pista: 'Registro del pasado' },
    { palabra: 'cultura', pista: 'Conjunto de tradiciones' },
    { palabra: 'naturaleza', pista: 'Mundo natural' },
    { palabra: 'planeta', pista: 'Cuerpo celeste' },
    { palabra: 'universo', pista: 'Todo lo que existe' },
    { palabra: 'misterio', pista: 'Enigma sin resolver' },
    { palabra: 'sabiduría', pista: 'Conocimiento profundo' },
    { palabra: 'paz', pista: 'Ausencia de guerra' },
    { palabra: 'guerra', pista: 'Conflicto armado' },
    { palabra: 'felicidad', pista: 'Estado de alegría' },
    { palabra: 'tristeza', pista: 'Estado de pesar' },
    { palabra: 'alegría', pista: 'Estado de felicidad' },
    { palabra: 'esperanza', pista: 'Fe en un futuro mejor' },
    { palabra: 'creatividad', pista: 'Capacidad de crear' },
    { palabra: 'inspiración', pista: 'Estímulo creativo' },
    { palabra: 'pasión', pista: 'Intenso sentimiento' },
    { palabra: 'pintura', pista: 'Arte visual' },
    { palabra: 'escultura', pista: 'Arte tridimensional' },
    { palabra: 'danza', pista: 'Expresión corporal' },
    { palabra: 'teatro', pista: 'Representación artística' },
    { palabra: 'literatura', pista: 'Escritura creativa' },
    { palabra: 'cielo', pista: 'Espacio sobre la Tierra' },
    { palabra: 'mar', pista: 'Gran masa de agua' },
    { palabra: 'montaña', pista: 'Elevación natural de la tierra' },
    { palabra: 'río', pista: 'Flujo de agua natural' },
    { palabra: 'bosque', pista: 'Área de árboles' },
    { palabra: 'desierto', pista: 'Área árida' },
    { palabra: 'playa', pista: 'Orilla del mar' },
    { palabra: 'isla', pista: 'Tierra rodeada de agua' },
    { palabra: 'estrella', pista: 'Cuerpo celeste luminoso' },
    { palabra: 'sol', pista: 'Estrella central del sistema solar' },
    { palabra: 'luna', pista: 'Satélite natural de la Tierra' },
    { palabra: 'amistad', pista: 'Relación de afecto' },
    { palabra: 'amor', pista: 'Sentimiento profundo' },
    { palabra: 'familia', pista: 'Grupo de personas relacionadas' },
    { palabra: 'trabajo', pista: 'Actividad laboral' },
    { palabra: 'comida', pista: 'Alimento' },
    { palabra: 'bebida', pista: 'Líquido para beber' },
    { palabra: 'ropa', pista: 'Vestimenta' },
    { palabra: 'calzado', pista: 'Zapatos y zapatillas' },
    { palabra: 'viaje', pista: 'Desplazamiento a otro lugar' },
    { palabra: 'vacaciones', pista: 'Tiempo de descanso' },
    { palabra: 'aventura', pista: 'Experiencia emocionante' },
    { palabra: 'alegría', pista: 'Estado de felicidad' },
    { palabra: 'diversión', pista: 'Entretenimiento' },
    { palabra: 'pasatiempo', pista: 'Actividad recreativa' },
    { palabra: 'relajación', pista: 'Descanso y tranquilidad' },
    { palabra: 'educación', pista: 'Proceso de aprendizaje' },
    { palabra: 'conocimiento', pista: 'Información adquirida' },
    { palabra: 'tecnología', pista: 'Avances científicos' },
    { palabra: 'internet', pista: 'Red global de comunicación' },
    { palabra: 'redes', pista: 'Plataformas sociales' },
    { palabra: 'teléfono', pista: 'Dispositivo de comunicación' },
    { palabra: 'computadora', pista: 'Máquina electrónica' },
    { palabra: 'naturaleza', pista: 'Mundo natural' },
    { palabra: 'planeta', pista: 'Cuerpo celeste' },
    { palabra: 'espacio', pista: 'Vacío cósmico' },
    { palabra: 'universo', pista: 'Todo lo que existe' },
    { palabra: 'galaxia', pista: 'Sistema estelar' },
    { palabra: 'constelación', pista: 'Grupo de estrellas' },
    { palabra: 'astronomía', pista: 'Estudio del espacio' },
    { palabra: 'exploración', pista: 'Viajes a lo desconocido' },
    { palabra: 'descubrimiento', pista: 'Hallazgo importante' },
    { palabra: 'invento', pista: 'Creación innovadora' },
    { palabra: 'creatividad', pista: 'Capacidad de crear' },
    { palabra: 'inspiración', pista: 'Estímulo creativo' },
    { palabra: 'imaginación', pista: 'Capacidad de idear' },
    { palabra: 'sueño', pista: 'Estado de descanso' },
    { palabra: 'pesadilla', pista: 'Sueño aterrador' },
    { palabra: 'realidad', pista: 'Lo que es verdadero' },
    { palabra: 'ficción', pista: 'Historia inventada' },
    { palabra: 'viaje', pista: 'Desplazamiento a otro lugar' },
    { palabra: 'destino', pista: 'Lugar de llegada' },
    { palabra: 'avión', pista: 'Medio de transporte aéreo' },
    { palabra: 'barco', pista: 'Embarcación' },
    { palabra: 'tren', pista: 'Medio de transporte ferroviario' },
    { palabra: 'automóvil', pista: 'Vehículo de motor' },
    { palabra: 'bicicleta', pista: 'Medio de transporte con pedales' },
    { palabra: 'paseo', pista: 'Excursión' },
    { palabra: 'caminata', pista: 'Andar a pie' },
    { palabra: 'explorador', pista: 'Persona que investiga' },
    { palabra: 'naturaleza', pista: 'Mundo natural' },
    { palabra: 'montaña', pista: 'Elevación natural de la tierra' },
    { palabra: 'río', pista: 'Flujo de agua natural' },
    { palabra: 'bosque', pista: 'Área de árboles' },
    { palabra: 'desierto', pista: 'Área árida' },
    { palabra: 'playa', pista: 'Orilla del mar' },
    { palabra: 'isla', pista: 'Tierra rodeada de agua' },
    { palabra: 'selva', pista: 'Bosque tropical' },
    { palabra: 'cascada', pista: 'Caída de agua' },
    { palabra: 'lago', pista: 'Cuerpo de agua dulce' },
    { palabra: 'océano', pista: 'Gran cuerpo de agua' },
    { palabra: 'volcán', pista: 'Montaña con actividad' },
    { palabra: 'terremoto', pista: 'Movimiento de la tierra' },
    { palabra: 'huracán', pista: 'Ciclón tropical' },
    { palabra: 'tornado', pista: 'Torbellino de viento' },
    { palabra: 'nieve', pista: 'Cristales de hielo' },
    { palabra: 'lluvia', pista: 'Agua que cae del cielo' },
    { palabra: 'viento', pista: 'Movimiento del aire' },
    { palabra: 'rayo', pista: 'Descarga eléctrica' },
    { palabra: 'estación', pista: 'Periodo del año' },
    { palabra: 'invierno', pista: 'Estación fría' },
    { palabra: 'primavera', pista: 'Estación de flores' },
    { palabra: 'verano', pista: 'Estación calurosa' },
    { palabra: 'otoño', pista: 'Estación de hojas caídas' },
    { palabra: 'sol', pista: 'Estrella central del sistema solar' },
    { palabra: 'luna', pista: 'Satélite natural de la Tierra' },
    { palabra: 'estrella', pista: 'Cuerpo celeste luminoso' },
    { palabra: 'planeta', pista: 'Cuerpo celeste' },
    { palabra: 'cometa', pista: 'Objeto celeste con cola' },
    { palabra: 'astronomía', pista: 'Estudio del espacio' },
    { palabra: 'galaxia', pista: 'Sistema estelar' },
    { palabra: 'constelación', pista: 'Grupo de estrellas' },
    { palabra: 'satélite', pista: 'Objeto que orbita un planeta' },
    { palabra: 'fusión', pista: 'Unión de núcleos' },
    { palabra: 'fisión', pista: 'División de núcleos' },
    { palabra: 'energía', pista: 'Capacidad de hacer trabajo' },
    { palabra: 'electricidad', pista: 'Flujo de electrones' },
    { palabra: 'magnetismo', pista: 'Propiedad de los imanes' },
    { palabra: 'química', pista: 'Ciencia de las sustancias' },
    { palabra: 'biología', pista: 'Ciencia de los seres vivos' },
    { palabra: 'geología', pista: 'Ciencia de la Tierra' },
    { palabra: 'ecología', pista: 'Estudio de ecosistemas' },
    { palabra: 'genética', pista: 'Estudio de los genes' },
    { palabra: 'evolución', pista: 'Cambio a lo largo del tiempo' },
    { palabra: 'célula', pista: 'Unidad básica de vida' },
    { palabra: 'organismo', pista: 'Ser vivo' },
    { palabra: 'bacteria', pista: 'Microorganismo' },
    { palabra: 'virus', pista: 'Agente infeccioso' },
    { palabra: 'plantas', pista: 'Reino vegetal' },
    { palabra: 'animales', pista: 'Reino animal' },
    { palabra: 'humano', pista: 'Especie Homo sapiens' },
    { palabra: 'extinción', pista: 'Desaparición de especies' },
    { palabra: 'ecosistema', pista: 'Comunidad biológica' },
    { palabra: 'biósfera', pista: 'Capa de vida en la Tierra' },
    { palabra: 'atmósfera', pista: 'Capa de aire' },
    { palabra: 'hidrosfera', pista: 'Capa de agua' },
    { palabra: 'litosfera', pista: 'Capa de roca' },
    { palabra: 'energía', pista: 'Capacidad de hacer trabajo' },
    { palabra: 'electricidad', pista: 'Flujo de electrones' },
    { palabra: 'magnetismo', pista: 'Propiedad de los imanes' },
    { palabra: 'química', pista: 'Ciencia de las sustancias' },
    { palabra: 'biología', pista: 'Ciencia de los seres vivos' },
    { palabra: 'geología', pista: 'Ciencia de la Tierra' },
    { palabra: 'ecología', pista: 'Estudio de ecosistemas' },
    { palabra: 'genética', pista: 'Estudio de los genes' },
    { palabra: 'evolución', pista: 'Cambio a lo largo del tiempo' },
    { palabra: 'célula', pista: 'Unidad básica de vida' },
    { palabra: 'organismo', pista: 'Ser vivo' },
    { palabra: 'bacteria', pista: 'Microorganismo' },
    { palabra: 'virus', pista: 'Agente infeccioso' },
    { palabra: 'plantas', pista: 'Reino vegetal' },
    { palabra: 'animales', pista: 'Reino animal' },
    { palabra: 'humano', pista: 'Especie Homo sapiens' },
    { palabra: 'extinción', pista: 'Desaparición de especies' },
    { palabra: 'ecosistema', pista: 'Comunidad biológica' },
    { palabra: 'biósfera', pista: 'Capa de vida en la Tierra' },
    { palabra: 'atmósfera', pista: 'Capa de aire' },
    { palabra: 'hidrosfera', pista: 'Capa de agua' },
    { palabra: 'litosfera', pista: 'Capa de roca' },
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    const palabrasSinTildes = this.palabrasConPistas.map((item) => ({
      palabra: this.quitarTildes(item.palabra),
      pista: item.pista,
    }));

    this.palabrasConPistas=palabrasSinTildes;
  }

  iniciarJuego(): void {
    this.elegirPalabra();
    this.juegoIniciado=true;
    this.letrasAdivinadas = [];
    this.intentosRestantes = 6;
    this.letrasPresionadas.clear();
    this.botonesColores = {};
    this.mostrarPista=false;

    console.log(this.palabraAAdivinar);
  }

  elegirPalabra(): void{
    const indice=Math.floor(Math.random() * this.palabrasConPistas.length);

    this.palabraAAdivinar=this.palabrasConPistas[indice].palabra;
    this.pista=this.palabrasConPistas[indice].pista;
  }

  manejarAdivinanza(letra: string): void {
    if (this.sePuedeSeguirAdivinando() && !this.letrasPresionadas.has(letra)) {
      this.letrasPresionadas.add(letra);

      if (this.palabraAAdivinar.includes(letra)) {
        if (!this.letrasAdivinadas.includes(letra)) {
          this.letrasAdivinadas.push(letra);
          this.botonesColores[letra] = '#7EFF3E';

          if(this.palabraFueAdivinada())
          {
            Swal.fire({
              icon: 'success',
              title: '¡Enhorabuena!',
              html:
              'La palabra era <b>'+this.palabraAAdivinar+'</b>...',
              showCancelButton:true,
              showDenyButton: true,
              confirmButtonText: '¡Otra palabra!',
              denyButtonText: 'Ir a otros juegos',
              cancelButtonText: 'Cancelar',
            }).then((result) => {
              if (result.isConfirmed) {
                this.iniciarJuego();
              } else if (result.isDenied) {
                this.router.navigate(['/juegos']);
              }
            });
          }

        }
      } else {
        this.intentosRestantes--;
        this.botonesColores[letra] = '#FF3E3E';

        if(this.intentosRestantes==0)
        {
          Swal.fire({
            icon: 'error',
            title: 'Ups! ya no te quedan intentos...',
            html:
            'La palabra era <b>'+this.palabraAAdivinar+'</b>...<br>' +
            '¡Intentalo de nuevo!',
            showCancelButton:true,
            showDenyButton: true,
            confirmButtonText: 'Reiniciar',
            denyButtonText: 'Ir a otros juegos',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {
              this.iniciarJuego();
            } else if (result.isDenied) {
              this.router.navigate(['/juegos']);
            }
          });
        }
      }
    }

    const enviarMensajeSnd = new Audio();
    enviarMensajeSnd.src='../../../assets/juegos/sonidos/click.wav'
    enviarMensajeSnd.play();
  }

  palabraFueAdivinada(): boolean {

    const letrasAdivinadasUnicas = Array.from(new Set(this.letrasAdivinadas)).sort().join('');
    const palabraAAdivinarUnica = Array.from(new Set(this.palabraAAdivinar.split(''))).sort().join('');

    return letrasAdivinadasUnicas === palabraAAdivinarUnica;
  }

  sePuedeSeguirAdivinando(): boolean{
    return this.intentosRestantes>0 && !this.palabraFueAdivinada();
  }

  quitarTildes(palabra: string): string {
    return palabra.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  togglePista(): void{
    this.mostrarPista = !this.mostrarPista;
  }
}
