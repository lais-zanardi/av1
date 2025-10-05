import Peca from "../model/Peca"
import { TipoPeca } from "../enum/TipoPeca"
import { StatusPeca } from "../enum/StatusPeca"
import { AeronaveService } from "./AeronaveService"
import Aeronave from "../model/Aeronave"
import PersistenciaService from "./PersistenciaService"

export class PecaService {
    private static atualizarPersistencia(aeronave: Aeronave): void {
        const todasAeronaves = AeronaveService.carregar()
        const indice = todasAeronaves.findIndex(a => a.codigo === aeronave.codigo)

        if (indice === -1) {
            throw new Error(`Erro de Persistência: Aeronave ${aeronave.codigo} não encontrada para atualização.`)
        }

        todasAeronaves[indice] = aeronave 
        PersistenciaService.salvar(todasAeronaves, 'aeronaves.txt')
    }

    public static associarNovaPeca(codigoAeronave: string, nome: string, tipo: TipoPeca, fornecedor: string, status: StatusPeca): Peca {
        const todasAeronaves = AeronaveService.carregar()
        const aeronave = todasAeronaves.find(a => a.codigo === codigoAeronave)

        if (!aeronave) {
            throw new Error(`Aeronave ${codigoAeronave} não encontrada para associação de peça.`)
        }
        
        const novaPeca = new Peca(nome, tipo, fornecedor, status)
        aeronave.pecas.push(novaPeca)
        this.atualizarPersistencia(aeronave)
        return novaPeca
    }

    public static atualizarStatusPeca(codigoAeronave: string, nomePeca: string, novoStatus: StatusPeca): void {
        const todasAeronaves = AeronaveService.carregar()
        const aeronave = todasAeronaves.find(a => a.codigo === codigoAeronave)

        if (!aeronave) {
            throw new Error(`Aeronave ${codigoAeronave} não encontrada.`)
        }

        const peca = aeronave.pecas.find(p => p.nome.toLowerCase() === nomePeca.toLowerCase())
        if (!peca) {
            throw new Error(`Peça '${nomePeca}' não encontrada na aeronave ${codigoAeronave}.`)
        }
        peca.atualizarStatus(novoStatus)
        this.atualizarPersistencia(aeronave)
    }
}