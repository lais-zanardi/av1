import { TipoAeronave } from "../enum/TipoAeronave"

export default class Aeronave {
    private codigo: string
    private modelo: string
    private tipo: TipoAeronave
    private capacidade: number
    private alcance: number
    
    constructor(codigo: string, modelo: string, tipo: TipoAeronave, capacidade: number, alcance:number) {
        this.codigo = codigo
        this.modelo = modelo
        this.tipo = tipo
        this.capacidade = capacidade
        this.alcance = alcance
    }
    

    public get getCodigo(): string {
        return this.codigo
    }

    public get getModelo(): string {
        return this.modelo
    }

    public get getTipo(): TipoAeronave {
        return this.tipo
    }

    public get getCapacidade(): number {
        return this.capacidade
    }

    public get getAlcance(): number {
        return this.alcance
    }

    public detalhes(): void {
        console.log(`Código: ${this.codigo}\nModelo: ${this.modelo}\nTipo: ${this.tipo}\nCapacidade: ${this.capacidade} pessoas\nAlcance: ${this.alcance} km`)
    }
}
