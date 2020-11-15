import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  isLoading = false;
  error: string = null;
  productID: any;
  productData: any;

  constructor(private prodService: ProductsService, private actRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this. productID = this.actRoute.snapshot.params['id'];
    this.currentProduct(this.productID);
  }

  currentProduct(productID){
    this.prodService.getAProduct(productID).subscribe(
      product => {
      this.productData = product;
    });
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
    this.prodService.updateProduct(name, brand, price, imageUrl, description, this.productID).subscribe(
      resData => {
        this.router.navigate([`/products/${this.productID}`]);
        // this.isLoading = false;
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
