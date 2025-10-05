import { TipoTeste } from '../enum/TipoTeste'
import { ResultadoTeste } from '../enum/ResultadoTeste'

export interface ITeste {
    tipo: TipoTeste
    resultado: ResultadoTeste
}