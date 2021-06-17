import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubItem } from './sub-item.model';

@Injectable({
  providedIn: 'root'
})
export class SubItemService {
  private baseUrl = "http://localhost:3000";
  private element = "subitens";
  constructor(private httpCliente: HttpClient) { }
  list():Observable<SubItem[]> {
    return this.httpCliente.get<SubItem[]>(this.baseUrl+"/"+this.element);
  }
}
