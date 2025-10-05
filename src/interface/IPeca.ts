import { TipoPeca } from '../enum/TipoPeca'
import { StatusPeca } from '../enum/StatusPeca'

export interface IPeca {
    atualizarStatus(novoStatus: StatusPeca): unknown
    nome: string
    tipo: TipoPeca
    fornecedor: string
    status: StatusPeca
}