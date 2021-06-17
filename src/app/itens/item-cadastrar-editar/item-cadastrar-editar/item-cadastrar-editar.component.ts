import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../item.model';
import { ItemService } from '../../item.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { SubItem } from 'src/app/sub-itens/sub-item.model';
import { SubItemService } from 'src/app/sub-itens/sub-item.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-item-cadastrar-editar',
  templateUrl: './item-cadastrar-editar.component.html',
  styleUrls: ['./item-cadastrar-editar.component.scss']
})
export class ItemCadastrarEditarComponent implements OnInit {
  formGroup: FormGroup | undefined;
  item: Item | undefined;
  subItens$: {id:number, nome: string, isChecked:boolean}[];
  constructor(private formBuilder: FormBuilder,
    private itemService: ItemService,
    private subItemService: SubItemService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public matSnackBar: MatSnackBar,
    public matDialog: MatDialog) {
      this.subItens$ = [];

    }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params.id;
    this.formGroup = this.formBuilder.group({
      id: "",
      nome: [ "", Validators.required],
      subitens: this.formBuilder.array([], Validators.required)
    });
    this.subItemService.list().subscribe(
      (dataSub)=>{
        dataSub.map(subItem=>{
          this.subItens$.push({id:subItem.id, nome:subItem.nome, isChecked:false});
        });
      }
    );
    if(id) {
      this.itemService.retornaPorId(id).subscribe(
        (data)=>{
          this.item = data;
          if(this.formGroup && data){
           const checkArray: FormArray = this.formGroup.get('subitens') as FormArray;
           this.item?.subitens?.map(subItem=>{
            if(this.formGroup) {
              checkArray.controls.push(new FormControl({id:subItem.id, nome:subItem.nome}));
              this.checkAlterar(subItem);
            }
           });
           this.formGroup.get('id')?.setValue(data.id);
           this.formGroup.get('nome')?.setValue(data.nome);
         }
        },
        (error) => {
          this.matSnackBar.open("Item não encontrado");
          this.router.navigateByUrl("/itens");
        });
    }
  }
  checkAlterar(subitem: SubItem){
    this.subItens$.map(subItemInterno=>{
      if(subItemInterno.id == subitem.id) {
        subItemInterno.isChecked = true;
      }
    }
    );
  }
  onCheckboxChange(id: number, nome:string, e:any) {
    if(this.formGroup){
      const checkArray: FormArray = this.formGroup.get('subitens') as FormArray;
      if (e.target.checked) {
        checkArray.push(new FormControl({id:id,nome:nome}));
      } else {
        let i: number = 0;
        checkArray.controls.forEach((item: AbstractControl) => {
          if (item.value.id == e.target.value) {
            checkArray.removeAt(i);
          }
          i++;
        });
      }
    }
    return;
  }

  remover() {
    if (this.item) {
        this.itemService.remover(this.item).subscribe(
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
salvarOuAlterar() {

  if (this.item && this.item.id && this.formGroup && this.formGroup.valid) {
    this.itemService.alterar(this.formGroup.value).subscribe(
      (itemAtualizado) => {
        this.matSnackBar.open("Item Atualizado com sucesso!");
        this.router.navigateByUrl("/itens");
      },
     (error) => {
        this.matSnackBar.open("Erro ao atualizar o item");
      }
    );
  } else if(this.formGroup  && this.formGroup.valid){

        this.itemService.cadastrar(this.formGroup.value).subscribe(
            (itemCadastrado) => {
                this.matSnackBar.open("Item Cadastrado com sucesso!");
                this.router.navigateByUrl("/itens");
            },
            (error) => {
                this.matSnackBar.open("Erro ao cadastrar o item");
            }
        );
    }
  }
}
