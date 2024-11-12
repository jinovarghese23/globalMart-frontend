import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {
  constructor(private apiService: ApiService, private spinner: NgxSpinnerService) { }
  allProducts: any = [];
  ngOnInit() {
    this.apiService.getAllProductsApi().subscribe({
      next: (res) => {
        console.log("All Products");
        console.log(res)
        this.allProducts = res;
      },
      error: (res) => {
        console.log(res)
      }
    })
  }

  addToWishList(product: any) {
    if (sessionStorage.getItem("token")) {
      // add item to wishlist
      this.apiService.addToWishList(product).subscribe({
        next: (res: any) => {
          console.log("===add to wishlist resp===");
          console.log(res);
          this.apiService.getWishlistCount()
          Swal.fire({
            title: 'Success',
            text: `Successfully added to wishlist`,
            icon: 'success',
          });
        },
        error: (res: any) => {
          console.log(res);
          Swal.fire({
            title: 'Warning',
            text: `${res.error}`,
            icon: 'warning',
          });
        }
      })
    }
    else {
      Swal.fire({
        title: 'Warning',
        text: `Please Login`,
        icon: 'warning',
      });
    }
  }
  
  addToCart(product: any) {
    if (sessionStorage.getItem('token')) {
     Object.assign(product,{quantity:1})
      this.apiService.addToCart(product).subscribe({
        next: (res) => {
          Swal.fire({
            title: 'Success',
            text: `Successfully added to cart`,
            icon: 'success',
          });
          this.apiService.getCartCount();
        },
        error: (res) => {
          Swal.fire({
            title: 'Warning',
            text: `${res.error}`,
            icon: 'warning',
          });
        }
      })
    }
    else{
      Swal.fire({
        title: 'Warning',
        text: `Please Login`,
        icon: 'warning',
      });
    }

  }
}
