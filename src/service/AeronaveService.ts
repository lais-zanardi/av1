import  Aeronave from "../model/Aeronave"
import { IAeronave } from "../interface/IAeronave"
import  PersistenciaService  from "./PersistenciaService"
import { TipoAeronave } from "../enum/TipoAeronave"

export class AeronaveService {
    
    private static NOME_ARQUIVO = 'aeronaves.txt'

    public static carregar(): Aeronave[] {
        const dadosBrutos = PersistenciaService.carregar(this.NOME_ARQUIVO)
        return dadosBrutos.map((dados: any) => 
            new Aeronave(
                dados._codigo,
                dados._modelo,
                dados._tipo,
                dados._capacidade,
                dados._alcance
            )
        )
    }
    
    public static salvar(dados: { codigo: string, modelo: string, tipo: TipoAeronave, capacidade: number, alcance: number }): Aeronave {
        const listaAtual = this.carregar()
        for (const aero of listaAtual) {
            if (aero.codigo === dados.codigo) {
                throw new Error(`O código '${dados.codigo}' já está em uso.`)
            }
        }

        const novaAeronave = new Aeronave(
            dados.codigo,
            dados.modelo,
            dados.tipo,
            dados.capacidade,
            dados.alcance
        )

        listaAtual.push(novaAeronave)
        PersistenciaService.salvar(listaAtual, this.NOME_ARQUIVO)

        return novaAeronave
    }
}