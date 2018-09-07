import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {StocksService} from './stocks.service';

import { Stock } from './stock';
export interface OHLC {
  open: {
    price: number,
    time: number
  };
  close: {
    price: number;
    time: number
  };
  high: number;
  low: number;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // cmp = 'aapl';
  searchtype = 'ohlc';
  apiUrl = 'https://api.iextrading.com/1.0/stock/';
  constructor(private http: HttpClient,
    private stocksService: StocksService ) { }

  getOHLC(stock: string) {
      return this.http.get<OHLC>(this.apiUrl + stock + '/' + this.searchtype)
      .pipe(
        catchError(err => throwError(err))   // then handle the error
      );
  }

    // then handle the error );   // then handle the error
  addStocks(stock: Stock) {
  return this.stocksService.getStocks().push(stock);
}
getStocks() {
  return this.stocksService.getStocks();
}

  // TODO: connection test and error handler
  /**
   getConfigResponse(stock: string): Observable<HttpResponse<OHLC>> {
    return this.http.get<OHLC>(
      (this.apiUrl + stock + '/' + this.searchtype), { observe: 'response' });
  }
  **/
}
