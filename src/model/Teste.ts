import { ResultadoTeste } from "../enum/ResultadoTeste"
import { TipoTeste } from "../enum/TipoTeste"
import { ITeste } from "../interface/ITeste"
import Aeronave from "./Aeronave"


export default class Teste implements ITeste {
    private _tipo: TipoTeste
    private _resultado: ResultadoTeste

    
    constructor(tipo: TipoTeste, resultado: ResultadoTeste) {
        this._tipo = tipo
        this._resultado = resultado
    }

    public get tipo(): TipoTeste {
        return this._tipo
    }

    public get resultado(): ResultadoTeste {
        return this._resultado
    }
}