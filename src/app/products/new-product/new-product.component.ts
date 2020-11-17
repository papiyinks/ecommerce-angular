import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html'
})
export class NewProductComponent implements OnInit {
  isLoading = false;
  error: string = null;

  constructor(private prodService: ProductsService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const name = form.value.productName;
    const brand = form.value.brand;
    const price = form.value.price;
    const imageUrl = form.value.image;
    const description = form.value.description;

    this.isLoading = true;
    this.prodService.createProduct(name, brand, price, imageUrl, description).subscribe(
      resData => {
        this.isLoading = false;
        this.router.navigate(['/products']);
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }

}
