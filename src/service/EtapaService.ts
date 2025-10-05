import Aeronave from "../model/Aeronave"
import Etapa from "../model/Etapa"
import PersistenciaService from "./PersistenciaService"
import { StatusEtapa } from "../enum/StatusEtapa"
import { AeronaveService } from "./AeronaveService"
import { UsuarioService } from "./UsuarioService" 

export class EtapaService {
    private static buscarEtapaPorNome(aeronave: Aeronave, nomeEtapa: string): Etapa | null {
        return aeronave.etapas.find(e => e.nome.toLowerCase() === nomeEtapa.toLowerCase()) || null
    }

    private static atualizarPersistencia(aeronave: Aeronave): void {
        const todasAeronaves = AeronaveService.carregar()
        const indice = todasAeronaves.findIndex(a => a.codigo === aeronave.codigo)

        if (indice === -1) {
            throw new Error(`Erro de Persistência: Aeronave ${aeronave.codigo} não encontrada na lista para atualização.`)
        }

        todasAeronaves[indice] = aeronave 
        PersistenciaService.salvar(todasAeronaves, 'aeronaves.txt')
    }
    
    public static iniciarEtapa(codigoAeronave: string, nomeEtapa: string): void {
        const todasAeronaves = AeronaveService.carregar()
        const aeronave = todasAeronaves.find(a => a.codigo === codigoAeronave)

        if (!aeronave) {
            throw new Error(`Aeronave ${codigoAeronave} não encontrada.`)
        }

        const etapa = this.buscarEtapaPorNome(aeronave, nomeEtapa)

        if (!etapa) {
            throw new Error(`Etapa '${nomeEtapa}' não encontrada para a aeronave ${codigoAeronave}.`)
        }

        // muda de PENDENTE para ANDAMENTO
        etapa.iniciar() 
        
        // Salva a alteração
        this.atualizarPersistencia(aeronave)
    }
    
    public static finalizarEtapa(codigoAeronave: string, nomeEtapa: string): void {
        const todasAeronaves = AeronaveService.carregar()
        const aeronave = todasAeronaves.find(a => a.codigo === codigoAeronave)

        if (!aeronave) {
            throw new Error(`Aeronave ${codigoAeronave} não encontrada.`)
        }

        const indiceAtual = aeronave.etapas.findIndex(e => e.nome.toLowerCase() === nomeEtapa.toLowerCase())

        if (indiceAtual === -1) {
            throw new Error(`Etapa '${nomeEtapa}' não encontrada.`)
        }

        const etapa = aeronave.etapas[indiceAtual]
        etapa.finalizar() 
        this.atualizarPersistencia(aeronave)
    }

    public static associarFuncionario(codigoAeronave: string, nomeEtapa: string, idFuncionario: string): void {
        const todasAeronaves = AeronaveService.carregar()
        const aeronave = todasAeronaves.find(a => a.codigo === codigoAeronave)
        const listaFuncionarios = UsuarioService.carregarTodosFuncionarios()
        
        const funcionario = listaFuncionarios.find(f => f.id === idFuncionario)

        if (!aeronave) throw new Error(`Aeronave ${codigoAeronave} não encontrada.`)
        if (!funcionario) throw new Error(`Funcionário com ID ${idFuncionario} não encontrado.`)

        const etapa = this.buscarEtapaPorNome(aeronave, nomeEtapa)

        if (!etapa) throw new Error(`Etapa '${nomeEtapa}' não encontrada.`)

        etapa.associarFuncionario(funcionario)
        this.atualizarPersistencia(aeronave)
    }
}