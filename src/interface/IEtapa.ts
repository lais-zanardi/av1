import { StatusEtapa } from '../enum/StatusEtapa'
import { IFuncionario } from './IFuncionario'

export interface IEtapa {
    id: string
    nome: string
    prazoDias: number
    status: StatusEtapa
    funcionarios: IFuncionario[]
}