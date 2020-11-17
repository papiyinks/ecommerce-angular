import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { Store } from '@ngrx/store';

import * as cartActions from '../cart/store/cart.action';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  private userData = JSON.parse(localStorage.getItem('userData'));
  productID: any;
  productData: any;
  authUserId: any;

  constructor(
    private prodService: ProductsService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this. productID = this.actRoute.snapshot.params['id'];
    this.loadProductDetails(this.productID);
  }

  loadProductDetails(productID){
    this.prodService.getAProduct(productID).subscribe(
      product => {
      this.productData = product;
    });
    this.authUserId = this.userData.id;
  }

  onDeleteProduct(productID){
    this.prodService.deleteProduct(productID).subscribe(
      product => {
        this.router.navigate(['/products']);
    });
  }

  addProductToCart(productData){
    const putId = { id: this.productID };
    const dispacthedProduct = {...productData, ...putId };
    this.store.dispatch(new cartActions.AddToCart(dispacthedProduct));
    alert('Item has been added to Cart');
  }
}
