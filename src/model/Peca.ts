import { StatusPeca } from "../enum/StatusPeca"
import { TipoPeca } from "../enum/TipoPeca"

export default class Peca {
    private nome: string
    private tipo: TipoPeca
    private fornecedor: string
    private status: StatusPeca
    
    constructor(nome: string, tipo: TipoPeca, fornecedor: string, status: StatusPeca) {
        this.nome = nome
        this.tipo = tipo
        this.fornecedor = fornecedor
        this.status = status
    }

     public get getNome(): string {
        return this.nome
    }

    public get getTipo(): TipoPeca {
        return this.tipo
    }

    public get getFornecedor(): string {
        return this.fornecedor
    }

    public get getStatus(): StatusPeca {
        return this.status
    }
    
    public atualizarStatus(novoStatus: StatusPeca): void {
        if (this.status === novoStatus) {
            console.warn(`O status da peça '${this.nome}' já é ${novoStatus}. Nenhuma alteração foi feita.`)
            return
        }

        this.status = novoStatus
        console.log(`Status da peça '${this.nome}' atualizado para: ${this.status}.`)
    }

    public detalhes(): string {
        return `Peça: ${this.nome} | Tipo: ${this.tipo} | Fornecedor: ${this.fornecedor} | Status: ${this.status}`
    }
}