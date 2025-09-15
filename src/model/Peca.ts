import { StatusPeca } from "../enum/StatusPeca"
import { TipoPeca } from "../enum/TipoPeca"

export default class Peca {
    public nome: string
    public tipo: TipoPeca
    public fornecedor: string
    public status: StatusPeca
    
    constructor(nome: string, tipo: TipoPeca, fornecedor: string, status: StatusPeca) {
        this.nome = nome
        this.tipo = tipo
        this.fornecedor = fornecedor
        this.status = status
    }
    
    public atualizarStatus(novoStatus: StatusPeca): void {}
    public salvar(): void {}
    public carregar(): void {}
}