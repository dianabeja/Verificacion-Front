import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-passenger-form',
  templateUrl: './passenger-form.component.html',
  styleUrls: ['./passenger-form.component.css']
})
export class PassengerFormComponent implements OnInit {
  numPassengers: number | undefined;
  seatClass: string | undefined;
  passengerForms: FormGroup[] = [];
  currentPassengerIndex: number = 0;
  allFormsSubmitted: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.numPassengers = +params['numPassengers'] || 1;
      this.seatClass = params['seatClass'] || 'ejecutiva';
      this.createPassengerForms();
    });
  }

  createPassengerForms(): void {
    for (let i = 0; i < this.numPassengers!; i++) {
      this.passengerForms.push(this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        age: ['', [Validators.required, Validators.min(1)]],
        phoneNumber: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
      }));
    }
  }

  onSubmit() {
    if (this.passengerForms[this.currentPassengerIndex].valid) {
      console.log(this.passengerForms[this.currentPassengerIndex].value);
      this.currentPassengerIndex++;
      if (this.currentPassengerIndex >= (this.numPassengers ?? 0)) {
        this.allFormsSubmitted = true;
      }
    } else {
      console.log('Form is invalid.');
    }
  }
}
