import { Item } from "../itens/item.model";

export interface SubItem{
  id: number,
  nome: string,
  itens?: Item[]
}
