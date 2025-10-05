import { TipoAeronave } from '../enum/TipoAeronave'
import { IPeca } from './IPeca'
import { IEtapa } from './IEtapa'
import { ITeste } from './ITeste'

export interface IAeronave {
    codigo: string
    modelo: string
    tipo: TipoAeronave
    capacidade: number
    alcance: number
    pecas: IPeca[]
    etapas: IEtapa[]
    testes: ITeste[]
}