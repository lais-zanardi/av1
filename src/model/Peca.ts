import { StatusPeca } from "../enum/StatusPeca"
import { TipoPeca } from "../enum/TipoPeca"
import { IPeca } from "../interface/IPeca"

export default class Peca implements IPeca {
    private _nome: string
    private _tipo: TipoPeca
    private _fornecedor: string
    private _status: StatusPeca
    
    constructor(nome: string, tipo: TipoPeca, fornecedor: string, status: StatusPeca) {
        this._nome = nome
        this._tipo = tipo
        this._fornecedor = fornecedor
        this._status = status
    }

     public get nome(): string {
        return this._nome
    }

    public get tipo(): TipoPeca {
        return this._tipo
    }

    public get fornecedor(): string {
        return this._fornecedor
    }

    public get status(): StatusPeca {
        return this._status
    }
    
    public atualizarStatus(novoStatus: StatusPeca): void {
        if (this._status === novoStatus) {
            console.warn(`O status da peça '${this._nome}' já é ${novoStatus}. Nenhuma alteração foi feita.`)
            return
        }

        this._status = novoStatus
        console.log(`Status da peça '${this._nome}' atualizado para: ${this._status}.`)
    }

    public detalhes(): string {
        return `Peça: ${this._nome} | _Tipo: ${this._tipo} | Fornecedor: ${this._fornecedor} | Status: ${this._status}`
    }
}