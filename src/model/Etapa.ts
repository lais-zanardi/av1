import { StatusEtapa } from "../enum/StatusEtapa"
import Funcionario from "./Funcionario"

export default class Etapa {
    public nome: string
    public prazo: string
    public status: StatusEtapa
    public funcionarios: Funcionario[]
    
    constructor(nome: string, prazo: string, status: StatusEtapa, funcionarios: Funcionario[]) {
        this.nome = nome
        this.prazo = prazo
        this.funcionarios = funcionarios
        this.status = status
    }
    
    public iniciar(): void {}
    public finalizar(): void {}
    public associarFuncionario(f: Funcionario): void {}
    public listarFuncionarios(): Funcionario[] {}
}