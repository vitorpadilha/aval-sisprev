import { SubItem } from "../sub-itens/sub-item.model";

export interface Item{
    id: number,
    nome: string,
    subitens?: SubItem[]
}
