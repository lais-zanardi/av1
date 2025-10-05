import { TipoPeca } from '../enum/TipoPeca'
import { StatusPeca } from '../enum/StatusPeca'

export interface IPeca {
    nome: string
    tipo: TipoPeca
    fornecedor: string
    status: StatusPeca
}