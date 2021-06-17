import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from '../../item.model';
import { ItemService } from '../../item.service';

@Component({
  selector: 'app-item-listar',
  templateUrl: './item-listar.component.html',
  styleUrls: ['./item-listar.component.scss']
})
export class ItemListarComponent implements OnInit {
   itens$: Observable<Item[]> | undefined



  colunas = ["id", "nome", "edit", "remove"];
  constructor(private itemService: ItemService,
    private router: Router,
    public matSnackBar: MatSnackBar) {
  }

  listarItens() {
    this.itens$ = this.itemService.list();
  }

  ngOnInit() {
    this.listarItens();
  }
  remover(item: Item) {
    if (item) {
        this.itemService.remover(item).subscribe(
            (response) => {
                this.matSnackBar.open("Item deletado com sucesso!");
                this.router.navigateByUrl("/itens");
            },
            (error) => {
                this.matSnackBar.open("Erro ao deletar");
            }
        );
    }
  }
}
