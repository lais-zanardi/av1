import { StatusEtapa } from '../enum/StatusEtapa'
import { IFuncionario } from './IFuncionario'
import Funcionario from '../model/Funcionario'

export interface IEtapa {
    finalizar(): void
    iniciar(): void
    associarFuncionario(funcionario: Funcionario): void
    listarFuncionarios(): string
    id: string
    nome: string
    prazo: string
    status: StatusEtapa
    funcionarios: IFuncionario[]
}