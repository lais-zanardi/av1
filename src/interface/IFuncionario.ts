import { NivelPermissao } from '../enum/NivelPermissao'

export interface IFuncionario {
    id: string
    nome: string
    telefone: string
    endereco: string
    usuario: string
    nivelPermissao: NivelPermissao
}