// Agular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Provider
import { ExchangeAccessor } from '../accessor/exchange-accessor';
import { FinanceAccessor } from '../accessor/finance-accessor';


/*
  Generated class for the ApiAccessorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiAccessorProvider {

  constructor(private http : HttpClient) {
  }

  public getExchangeAccessor() : ExchangeAccessor {
      return new ExchangeAccessor(this.http);
  }

  public getFinanceAccessor() : FinanceAccessor {
      return new FinanceAccessor(this.http);
  }
}
