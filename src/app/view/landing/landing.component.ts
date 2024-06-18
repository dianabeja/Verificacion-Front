import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { faFacebookF, faTwitter, faInstagram, faCcVisa, faCcMastercard, faCcAmex, faCcPaypal } from '@fortawesome/free-brands-svg-icons';
import * as mapboxgl from 'mapbox-gl';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import { faEnvelope, faMapMarkerAlt, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { BuscarVuelosService } from 'src/app/service/buscar-vuelos.service';
import { vuelo } from 'src/app/models/tarjetaVuelo.model';
import { VuelodetallesComponent } from '../vuelodetalles/vuelodetalles.component';
import { busqueda } from 'src/app/models/busqueda.model';
import {jwtDecode} from 'jwt-decode'; 

interface Airport {
  name: string;
  coordinates: [number, number];
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, AfterViewInit {
  faFacebookF = faFacebookF;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faCcVisa = faCcVisa;
  faCcMastercard = faCcMastercard;
  faCcAmex = faCcAmex;
  faCcPaypal = faCcPaypal;
  faEnvelope = faEnvelope;
  faMapMarkerAlt = faMapMarkerAlt;
  faPhoneAlt = faPhoneAlt;
  isLoggedIn: boolean = false; 
  showUserMenu = false;
  userFullName: string = '';
  
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  map!: mapboxgl.Map;
  airports: Airport[] = [
    { name: 'Aeropuerto Internacional Benito Juárez', coordinates: [-99.0721, 19.4361] },
    { name: 'Aeropuerto Internacional de Cancún', coordinates: [-86.8771, 21.0365] },
    { name: 'Aeropuerto Internacional de Guadalajara', coordinates: [-103.3112, 20.5218] },
    { name: 'Aeropuerto Internacional de Monterrey', coordinates: [-100.1147, 25.7783] },
    { name: 'Aeropuerto Internacional de Tijuana', coordinates: [-116.9743, 32.5411] },
    { name: 'Aeropuerto Internacional de Mérida', coordinates: [-89.6628, 20.9367] },
    { name: 'Aeropuerto Internacional de Puerto Vallarta', coordinates: [-105.2484, 20.6801] },
    { name: 'Aeropuerto Internacional de Los Cabos', coordinates: [-109.7173, 23.1518] },
    { name: 'Aeropuerto Internacional de Guanajuato', coordinates: [-101.4791, 20.9934] },
    { name: 'Aeropuerto Internacional de Oaxaca', coordinates: [-96.7266, 17.0006] },
    { name: 'Aeropuerto Internacional de Veracruz', coordinates: [-96.1829, 19.1428] },
    { name: 'Aeropuerto Internacional de Puebla', coordinates: [-98.3714, 19.1364] },
    { name: 'Aeropuerto Internacional de Acapulco', coordinates: [-99.7541, 16.7570] },
    { name: 'Aeropuerto Internacional de Chihuahua', coordinates: [-106.4386, 28.7021] },
    { name: 'Aeropuerto Internacional de Culiacán', coordinates: [-107.9821, 24.7641] },
    { name: 'Aeropuerto Internacional de Hermosillo', coordinates: [-110.9361, 29.0959] },
    { name: 'Aeropuerto Internacional de La Paz', coordinates: [-110.3626, 24.0727] },
    { name: 'Aeropuerto Internacional de Mazatlán', coordinates: [-106.2705, 23.1614] },
    { name: 'Aeropuerto Internacional de Morelia', coordinates: [-101.0258, 19.8497] },
    { name: 'Aeropuerto Internacional de Tampico', coordinates: [-97.8651, 22.2965] },
    { name: 'Aeropuerto Internacional de Tuxtla Gutiérrez', coordinates: [-93.0256, 16.5633] },
    { name: 'Aeropuerto Internacional de Villahermosa', coordinates: [-92.8174, 17.9970] },
    { name: 'Aeropuerto Internacional de Aguascalientes', coordinates: [-102.3147, 21.7020] },
    { name: 'Aeropuerto Internacional de Cozumel', coordinates: [-86.9303, 20.5110] },
    { name: 'Aeropuerto Internacional de Durango', coordinates: [-104.5279, 24.1243] },

  ];

  busqueda: busqueda = {
    lugarD: '',
    lugarO: '',
  }

  fechaSalida: Date | undefined
  
  hayTarjetas = false
  tarjetas: vuelo[] = []
  regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/

  constructor(private buscarService: BuscarVuelosService, public dialog: MatDialog, private router: Router, private elementRef: ElementRef, ) { }

  openDialog(vuelo: vuelo){
    const dialogRef = this.dialog.open(VuelodetallesComponent, {
      width: '60vw',
      data: vuelo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("the dialog was closed");
      
    })
  }

  ngOnInit(): void {
    (mapboxgl as any).accessToken = 'pk.eyJ1Ijoic2FsdmF2IiwiYSI6ImNsdzc2eWlpcDI3dHMyaW5yYzd5bmk0eDUifQ.fvHcDqd3c5-sGcRu1WjGxA';
    this.checkLoginStatus();

  }

  checkLoginStatus() {
    const accessToken = localStorage.getItem('access_Token');
    this.isLoggedIn = !!accessToken; // Asigna true si hay un token de acceso en localStorage

    if (accessToken) {
      console.log('Usuario está logueado.');
      const decoded: any = jwtDecode(accessToken); // Decodificar el token JWT
      console.log('Decoded token:', decoded);
      this.userFullName = decoded.identificador; // Ajusta según la estructura de tu token

    } else {
      console.log('Usuario no está logueado.');
    }
  }

  ngAfterViewInit(): void {
    if (this.mapContainer && this.mapContainer.nativeElement) {
      this.map = new mapboxgl.Map({
        container: this.mapContainer.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-99.0195, 19.7236], 
        zoom: 5
      });

      this.airports.forEach(airport => {
        new mapboxgl.Marker()
          .setLngLat(airport.coordinates)
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${airport.name}</h3>`)) 
          .addTo(this.map);
      });
    } else {
      console.error('El contenedor del mapa no está definido.');
    }
  }

  getVuelos(){
    console.log("buscando");
    
    let lugarD: string = this.busqueda.lugarD
    let lugarO: string = this.busqueda.lugarO
    let fechasalida: string = ''
    if(this.fechaSalida != null){
      let date: Date = new Date(this.fechaSalida!)

      const day = date.getUTCDate()
      const month = date.getUTCMonth()
      const year = date.getUTCFullYear();

      fechasalida = `${day}/${month+1}/${year}`
    }

    console.log(fechasalida);

    if(lugarD.length == 0 || lugarO.length == 0){
      alert("Es necesario introducir tanto una ciudad de origen como de destino")
    }
    else{
      if(fechasalida.length == 0){
        this.buscarService.getVuelos(lugarD, lugarO).subscribe({
          next: response => this.ordenarVuelos(response),
          error: err => alert("introduce bien el origen/destino"),
          complete: () => console.log("complete")
          })
      }
      else {
        let subscripcion = this.buscarService.getVuelosConFecha(lugarD, lugarO, fechasalida).subscribe({
          next: response => this.ordenarVuelos(response),
          error: err => alert("introduce bien el origen/destino"),
          complete: () => console.log("complete")
          })
      }
    }
  }

  ordenarVuelos(vuelos: any){
    console.log(vuelos);
    let arreglo: any[] = vuelos
    let vuelosArreglados: any[] = []
    arreglo.forEach(vuelo => {
      let tarjeta: vuelo = 
      {
        viajeID: vuelo.Viaje_ID,
        origen: this.busqueda.lugarO.split(',')[0],
        destino: this.busqueda.lugarD.split(',')[0],
        fecha: vuelo.fechaSalida,
        precio: 0,
        hora: vuelo.hora_Salida,
        tipo: vuelo.asientosdisponibles,
        asientos: 0
      }
      vuelosArreglados.push(tarjeta)
    })
    this.tarjetas = vuelosArreglados
    if(this.tarjetas.length != 0){
      this.hayTarjetas = true
    }
  }
  logout() {
    localStorage.removeItem('access_Token'); // Elimina el token de acceso del almacenamiento local
    this.isLoggedIn = false; // Actualiza el estado de isLoggedIn
    this.router.navigate(['/']); // Redirige a la página de inicio de sesión u otra página deseada
  }
  toggleUserMenu(event: Event) {
    event.stopPropagation(); 
    this.showUserMenu = !this.showUserMenu; 
  }
  

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.showUserMenu == true) {
      this.showUserMenu = false;
    }
  }
}

