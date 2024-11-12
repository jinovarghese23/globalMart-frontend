import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  allCartItems: any = [];
  totalPrice: number = 0;
  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
    this.getAllCartItems()
  }

  getAllCartItems() {
    this.apiService.getAllCartItemsApi().subscribe({
      next: (res) => {
        console.log("1");
        console.log(res)
        this.allCartItems = res;
        this.getTotalPrice()
      },
      error: (res) => {
        console.log(res)
      }
    })
  }
  decrementCartProudct(id: any) {
    this.apiService.decrementApi(id).subscribe({
      next:(res)=>{
        this.getAllCartItems();
        this.apiService.getCartCount()
      },
      error:(res)=>{
        console.log(res);
      }
    })
  }
  incrementCartProudct(id: any) {
    this.apiService.incrementApi(id).subscribe({
      next: (res) => {
        this.getAllCartItems();
        this.apiService.getCartCount()
      },
      error:(res)=>{
        console.log(res)
      }
    })
  }
  // getTotalPrice() {
  //   this.totalPrice=0;
  //   this.totalPrice = this.allCartItems.map((item: any) => {
  //     this.totalPrice = Math.ceil(this.totalPrice + item.grandTotal)
  //   })
  // }
  getTotalPrice() {
    this.totalPrice = 0;
    this.allCartItems.forEach((item: any) => {
      this.totalPrice += Math.ceil(item.grandTotal); // Assuming each item has a `grandTotal` field
    });
  }
  removeItem(id: any) {
    this.apiService.removeItemApi(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getAllCartItems();
      },
      error: (res) => {
        console.log(res);
      }
    })

  }
  emptyAllCartItems(){
    this.apiService.emptyCartApi().subscribe({
      next:(res)=>{
        this.getAllCartItems();
        this.apiService.getCartCount()
      },
      error:(res)=>{
        console.log(res);
      }
    })
  }
  checkOut(){
    sessionStorage.setItem('totalCartValue',JSON.stringify(this.totalPrice))
  }
}
