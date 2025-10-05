import { TipoAeronave } from '../enum/TipoAeronave'
import { IPeca } from './IPeca'
import { IEtapa } from './IEtapa'
import { ITeste } from './ITeste'
import Etapa from '../model/Etapa'

export interface IAeronave {
    codigo: string
    modelo: string
    tipo: TipoAeronave
    capacidade: number
    alcance: number
    pecas: IPeca[]
    etapas: Etapa[]
    testes: ITeste[]
}