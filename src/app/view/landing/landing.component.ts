import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var google: any; 

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  @ViewChild('mapContainer', { static: false }) mapContainer: ElementRef | undefined;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(): void {
    const center = { lat: 19.4363, lng: -99.0721 };

    const mapOptions = {
      zoom: 14, 
      center: center 
    };

    if (this.mapContainer) {
      const map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
    }
  }
}
