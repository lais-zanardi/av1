import Teste from "../model/Teste"
import PersistenciaService from "./PersistenciaService"
import { TipoTeste } from "../enum/TipoTeste"
import { ResultadoTeste } from "../enum/ResultadoTeste"
import { AeronaveService } from "./AeronaveService" 

export default class TesteService {
    public static salvar( codigoAeronave: string, tipo: TipoTeste, resultado: ResultadoTeste): Teste {
         const todasAeronaves = AeronaveService.carregar()
        const aeronave = todasAeronaves.find(a => a.codigo === codigoAeronave)

        if (!aeronave) {
            throw new Error(`Aeronave com código '${codigoAeronave}' não foi encontrada para registro do teste.`)
        }
        const novoTeste = new Teste(tipo, resultado)
        aeronave.testes.push(novoTeste)      
        PersistenciaService.salvar(todasAeronaves, 'aeronaves.txt')
        console.log(`✅ Teste [${tipo}] registrado com sucesso para a aeronave ${codigoAeronave}.`)
        return novoTeste
    }
}