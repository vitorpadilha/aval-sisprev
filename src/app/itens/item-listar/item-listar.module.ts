import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemListarRoutingModule } from './item-listar-routing.module';
import { ItemListarComponent } from './item-listar/item-listar.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    ItemListarComponent
  ],
  imports: [
    CommonModule,
    ItemListarRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatSnackBarModule
  ]
})
export class ItemListarModule { }
