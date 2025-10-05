import { StatusEtapa } from "../enum/StatusEtapa"
import { IEtapa } from "../interface/IEtapa"
import { IFuncionario } from "../interface/IFuncionario"
import Funcionario from "./Funcionario"

export default class Etapa implements IEtapa {
    private _id: string
    private _nome: string
    private _prazo: string
    private _status: StatusEtapa
    public _funcionarios: Funcionario[]
    
    constructor(id: string, nome: string, prazo: string, status: StatusEtapa, funcionarios: Funcionario[]) {
        this._id = id
        this._nome = nome
        this._prazo = prazo
        this._funcionarios = funcionarios
        this._status = StatusEtapa.PENDENTE //por default inicializar etapa como PENDENTE
    }

    public get id(): string {
        return this._id
    }

    public get funcionarios(): Funcionario[] {
        return this._funcionarios
    }

    public get nome(): string {
        return this._nome
    }

    public get prazo(): string {
        return this._prazo
    }

    public get status(): StatusEtapa {
        return this._status
    }
    
    public iniciar(): void {
        if (this._status === StatusEtapa.PENDENTE) {
            this._status = StatusEtapa.ANDAMENTO
            console.log(`Etapa '${this._nome}' iniciada e em andamento.`)
        } else {
            throw new Error(`A etapa '${this._nome}' já está em andamento ou concluída.`)
        }
    }

    public finalizar(): void {
        if (this._status === StatusEtapa.ANDAMENTO) {
            this._status = StatusEtapa.CONCLUIDA
            console.log(`Etapa '${this._nome}' concluída com sucesso.`)
        } else {
            throw new Error(`A etapa '${this._nome}' não pode ser finalizada se não estiver em andamento.`)
        }
    }

    public associarFuncionario(funcionario: Funcionario): void {
        let jaAssociado = false
        for (let i = 0; i < this._funcionarios.length; i++) {
            const funcionarioAtual = this._funcionarios[i]

            if (funcionarioAtual.id === funcionario.id) {
                jaAssociado = true
                break 
            }
        }

        if (jaAssociado) {
            throw new Error(`Funcionário ${funcionario.nome} já está associado a esta etapa.`)
        }
        
        this._funcionarios.push(funcionario)
        console.log(`Funcionário ${funcionario.nome} associado à etapa.`)
    }

    
    public listarFuncionarios(): string {
        if (this._funcionarios.length === 0) {
            return `Nenhum funcionário designado para a etapa '${this._nome}'.`
        }
        const lista = this._funcionarios.map(f => `  - ${f.nome} (ID: ${f.id})`).join('\n')
        return `Funcionários na etapa '${this._nome}':\n${lista}`
    }
}