import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Item} from './item.model'

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private baseUrl = "http://localhost:3000";
  private element = "itens";

  constructor(private httpCliente: HttpClient) { }
  list():Observable<Item[]> {
    return this.httpCliente.get<Item[]>(this.baseUrl+"/"+this.element);
  }
  remover(item: Item):Observable<{}> {
    return this.httpCliente.delete(this.baseUrl+"/"+this.element+"/"+item.id);
  }
  cadastrar(item: Item): Observable<Item> {
      return this.httpCliente.post<Item>(this.baseUrl+"/"+this.element, item);
  }

  retornaPorId(id: string): Observable<Item> {
      return this.httpCliente.get<Item>(this.baseUrl+"/"+this.element+"/"+id);
  }

  alterar(item: Item):Observable<Item> {
      return this.httpCliente.put<Item>(this.baseUrl+"/"+this.element+"/"+item.id, item);
  }
}
