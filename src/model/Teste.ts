
import { ResultadoTeste } from "../enum/ResultadoTeste"
import { TipoTeste } from "../enum/TipoTeste"
import Aeronave from "./Aeronave"


export default class Teste {
    public tipo: TipoTeste
    public resultado: ResultadoTeste

    
    constructor(tipo: TipoTeste, resultado: ResultadoTeste) {
        this.tipo = tipo
        this.resultado = resultado
    }
    
    public salvar(): void {}
    public carregar(): void {}
}