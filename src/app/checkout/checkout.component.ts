import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  constructor(private fb:FormBuilder) { }
  checkOutForm=this.fb.group({
    name:["",[Validators.required]],
    houseName:["",[Validators.required]],
    place:["",[Validators.required]],
    landMark:[""],
  })
}
