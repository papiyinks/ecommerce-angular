import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

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
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  createProduct(name: string, brand: string, price: number, imageUrl: string, description: string) {
    const token = this.cookieService.get('token');
    const userId = this.cookieService.get('userId');
    return this.http
      .post<ProductResponseData>(
        `https://papistore-angular.firebaseio.com/products.json?auth=${token}`,
        {
          name,
          brand,
          price,
          imageUrl,
          description,
          ownerId: userId
        }
      )
      .pipe(
        catchError(errorRes => {
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
        catchError(errorRes => {
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
        catchError(errorRes => {
          const errorMessage = 'An error occurred!';
          return throwError(errorMessage);
        })
      );
  }

  updateProduct(name: string, brand: string, price: number, imageUrl: string, description: string, productId: string) {
    const token = this.cookieService.get('token');
    return this.http
      .patch<ProductResponseData>(
        `https://papistore-angular.firebaseio.com/products/${productId}.json?auth=${token}`,
          {
            name,
            brand,
            price,
            imageUrl,
            description,
          }
        )
      .pipe(
        catchError(errorRes => {
          const errorMessage = 'An error occurred!';
          return throwError(errorMessage);
        })
      );
  }

  deleteProduct(productId: string) {
    const token = this.cookieService.get('token');
    return this.http
      .delete<ProductResponseData>(
        `https://papistore-angular.firebaseio.com/products/${productId}.json?auth=${token}`)
      .pipe(
        catchError(errorRes => {
          const errorMessage = 'An error occurred!';
          return throwError(errorMessage);
        })
      );
  }
}
