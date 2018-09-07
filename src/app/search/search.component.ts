import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { Stock } from '../stock';
import { StocksService } from '../stocks.service';
import { OHLC, SearchService } from '../search.service';
import { MultipleService} from '../multiple.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  result: OHLC;
  stocks: Stock[];
  pushStock: Stock = new Stock;
  _stocks:  Stock[];

  constructor( private multipleService: MultipleService
  // private stocksService: StocksService,
  // private searchService: SearchService
  ) { }

  ngOnInit() {
  }

  getResult(stock: string) {
    this.pushStock = { cmp: stock };
    this._stocks = this.multipleService.getStocks();
    this.multipleService.getOHLC(stock).subscribe(
      resp => {
        {
          this.result = resp;
          this.multipleService.addStocks(this.pushStock);
        }
      });
    if ( this.multipleService.getStocks() === this._stocks) {
      this.result = {open: {
        price: 0,
        time: 0,
      },
      close: {
        price: 0,
        time: 0,
      },
      high: 0,
      low: 0,
      }; }
    this.stocks = this.multipleService.getStocks();
  }
}
