import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  map!: mapboxgl.Map;

  constructor() { }

  ngOnInit(): void {
    (mapboxgl as any).accessToken = 'pk.eyJ1Ijoic2FsdmF2IiwiYSI6ImNsdzc2eWlpcDI3dHMyaW5yYzd5bmk0eDUifQ.fvHcDqd3c5-sGcRu1WjGxA';
  }

  ngAfterViewInit(): void {
    if (this.mapContainer && this.mapContainer.nativeElement) {
      this.map = new mapboxgl.Map({
        container: this.mapContainer.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-99.0195, 19.7236], // Longitud y latitud del centro del mapa
        zoom: 12
      });
    } else {
      console.error('El contenedor del mapa no está definido.');
    }
  }
}

