import { TipoAeronave } from "../enum/TipoAeronave"
import { IAeronave } from "../interface/IAeronave"
import { IEtapa } from "../interface/IEtapa"
import { IPeca } from "../interface/IPeca"
import { ITeste } from "../interface/ITeste"
import Etapa from "./Etapa"

export default class Aeronave implements IAeronave {
    private _codigo: string
    private _modelo: string
    private _tipo: TipoAeronave
    private _capacidade: number
    private _alcance: number

    public pecas: IPeca[] = []
    public etapas: Etapa[] = []
    public testes: ITeste[] = []
    
    constructor(codigo: string, modelo: string, tipo: TipoAeronave, capacidade: number, alcance:number) {
        this._codigo = codigo
        this._modelo = modelo
        this._tipo = tipo
        this._capacidade = capacidade
        this._alcance = alcance
    }

    public get codigo(): string {
        return this._codigo
    }

    public get modelo(): string {
        return this._modelo
    }

    public get tipo(): TipoAeronave {
        return this._tipo
    }

    public get capacidade(): number {
        return this._capacidade
    }

    public get alcance(): number {
        return this._alcance
    }

    public detalhes(): string {
        return `Código: ${this._codigo}\nModelo: ${this._modelo}\nTipo: ${this._tipo}\nCapacidade: ${this._capacidade}\nAlcance: ${this._alcance}`
    }
}
