import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { vuelo } from 'src/app/models/tarjetaVuelo.model';

@Component({
  selector: 'app-vuelodetalles',
  templateUrl: './vuelodetalles.component.html',
  styleUrls: ['./vuelodetalles.component.css']
})
export class VuelodetallesComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: vuelo) {}
}
