import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
interface ProductResponseData {
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  description: string;
  productId: string;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private userData = JSON.parse(localStorage.getItem('userData'));

  constructor(private http: HttpClient) {}

  createProduct(name: string, brand: string, price: number, imageUrl: string, description: string) {
    return this.http
      .post<ProductResponseData>(
        `https://papistore-angular.firebaseio.com/products.json?auth=${this.userData._token}`,
        {
          name,
          brand,
          price,
          imageUrl,
          description,
          ownerId: this.userData.id
        }
      )
      .pipe(
        catchError(errorResponse => {
          const errorMessage = 'An error occurred!';
          return throwError(errorMessage);
        })
      );
  }

  getProducts() {
    return this.http
      .get<ProductResponseData>(
        'https://papistore-angular.firebaseio.com/products.json')
      .pipe(
        catchError(errorResponse => {
          const errorMessage = 'An error occurred!';
          return throwError(errorMessage);
        })
      );
  }

  getAProduct(productId: string) {
    return this.http
      .get<ProductResponseData>(
        `https://papistore-angular.firebaseio.com/products/${productId}.json`)
      .pipe(
        catchError(errorResponse => {
          const errorMessage = 'An error occurred!';
          return throwError(errorMessage);
        })
      );
  }

  updateProduct(name: string, brand: string, price: number, imageUrl: string, description: string, productId: string) {
    return this.http
      .patch<ProductResponseData>(
        `https://papistore-angular.firebaseio.com/products/${productId}.json?auth=${this.userData._token}`,
          {
            name,
            brand,
            price,
            imageUrl,
            description,
          }
        )
      .pipe(
        catchError(errorResponse => {
          const errorMessage = 'An error occurred!';
          return throwError(errorMessage);
        })
      );
  }

  deleteProduct(productId: string) {
    return this.http
      .delete<ProductResponseData>(
        `https://papistore-angular.firebaseio.com/products/${productId}.json?auth=${this.userData._token}`)
      .pipe(
        catchError(errorResponse => {
          const errorMessage = 'An error occurred!';
          return throwError(errorMessage);
        })
      );
  }
}
