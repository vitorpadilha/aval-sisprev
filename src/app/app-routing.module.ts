import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {
    path:"itens",
    loadChildren: () => import('./itens/item-listar/item-listar.module').then(modulo => modulo.ItemListarModule)
  },
  {
    path:"itens/cadastrar",
    loadChildren: () => import('./itens/item-cadastrar-editar/item-cadastrar-editar.module').then(modulo => modulo.ItemCadastrarEditarModule)
  },
  {
    path:"itens/editar/:id",
    loadChildren: () => import('./itens/item-cadastrar-editar/item-cadastrar-editar.module').then(modulo => modulo.ItemCadastrarEditarModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
