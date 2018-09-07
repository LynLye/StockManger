import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import {SearchService} from './search.service';
import {StocksService} from './stocks.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

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

export class MultipleService  {
  // cmp = 'aapl';
  searchtype = 'ohlc';
  apiUrl = 'https://api.iextrading.com/1.0/stock/';
  pushStock: Stock = new Stock;
  constructor(private stocksService: StocksService,
    private searchService: SearchService,
    private http: HttpClient) { }
  getOHLC(stock: string) {
      return this.searchService.getOHLC(stock)
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

