import * as readline from 'readline/promises'
import { stdin as input, stdout as output } from 'process'
import { NivelPermissao } from '../enum/NivelPermissao'
import { TipoAeronave } from '../enum/TipoAeronave'
import { UsuarioService } from './UsuarioService'
import { AeronaveService } from './AeronaveService'
import Funcionario from '../model/Funcionario'
import { TipoPeca } from '../enum/TipoPeca'
import { StatusPeca } from '../enum/StatusPeca'
import { PecaService } from './PecaService'
import { EtapaService } from './EtapaService'

export class MensagensService {
    
    private static rl = readline.createInterface({ input, output })

    private static async pedirInput(pergunta: string): Promise<string> {
        const resposta = await this.rl.question(`>> ${pergunta}: `)
        return resposta.trim()
    }
    
    public static async exibirTelaLogin(): Promise<Funcionario | null> {
        console.log("\n======================================")
        console.log("  AEROCODE - GESTÃO DE PRODUÇÃO  ")
        console.log("======================================\n")

        try {
            const usuario = await this.pedirInput("Usuário")
            const senha = await this.pedirInput("Senha")
            const funcionario = UsuarioService.autenticar(usuario, senha)

            if (funcionario) {
                console.log(`\n✅ Login bem-sucedido! Bem-vindo(a), ${funcionario.nome}.`)
                return funcionario
            } else {
                console.log("\n❌ Falha na autenticação. Usuário ou senha inválidos.")
                return null
            }
        } catch (error) {
            console.error("\n❌ Erro durante o login:", (error as Error).message)
            return null
        }
    }

    public static async iniciarMenuPrincipal(funcionario: Funcionario): Promise<void> {
        let continuar = true
        const nivel = funcionario.nivelPermissao

        while (continuar) {
            console.log(`\n--- MENU PRINCIPAL [${nivel}] ---`)
            console.log("1. Gestão de Aeronaves")
            console.log("2. Gestão de Peças")
            console.log("3. Gestão de Etapas")
            
            if (nivel === NivelPermissao.ADMINISTRADOR) {
                console.log("4. Gestão de Funcionários")
            }
            console.log("9. Logout e Sair")
            
            const opcao = await this.pedirInput("Escolha uma opção")

            try {
                switch (opcao) {
                    case '1':
                        await this.exibirMenuAeronaves()
                        break
                    case '2':
                        await this.exibirMenuPecas()
                        break
                    case '3':
                        await this.exibirMenuEtapas()
                        break
                    case '4':
                        if (nivel === NivelPermissao.ADMINISTRADOR) {
                            await this.exibirMenuFuncionarios()
                        } else {
                            console.log("Acesso negado. Apenas Administradores.")
                        }
                        break
                    case '9':
                        continuar = false
                        console.log("\nSessão encerrada.")
                        break
                    default:
                        console.log("Opção inválida. Tente novamente.")
                }
            } catch (error) {
                console.error(`\n❌ ERRO FATAL: ${(error as Error).message}`)
            }
        }
        this.rl.close() // Fecha a interface readline ao sair
    }

 private static async exibirMenuAeronaves(): Promise<void> {
        let voltar = false
        while (!voltar) {
            console.log("\n--- GESTÃO DE AERONAVES ---")
            console.log("1. Cadastrar Nova Aeronave")
            console.log("2. Listar Todas as Aeronaves")
            console.log("9. Voltar")
            
            const opcao = await this.pedirInput("Ação")

            try {
                switch (opcao) {
                    case '1':
                        await this.menuCadastrarAeronave()
                        break
                    case '2':
                        await this.menuListarAeronaves()
                        break
                    case '9':
                        voltar = true
                        break
                    default:
                        console.log("Opção inválida.")
                }
            } catch (error) {
                console.error(`\n❌ ERRO: ${(error as Error).message}`)
            }
        }
    }

    private static async menuCadastrarAeronave(): Promise<void> {
        console.log("\n--- CADASTRO DE NOVA AERONAVE ---")
        
        const codigo = await this.pedirInput("Código Único (Ex: C001)")
        const modelo = await this.pedirInput("Modelo (Ex: E195-E2)")
        
        console.log("Tipos: 1. COMERCIAL | 2. MILITAR")
        const tipoOpcao = await this.pedirInput("Tipo (1 ou 2)")
        
        let tipo: TipoAeronave
        if (tipoOpcao === '1') {
            tipo = TipoAeronave.COMERCIAL
        } else if (tipoOpcao === '2') {
            tipo = TipoAeronave.MILITAR
        } else {
            throw new Error("Opção de tipo inválida.")
        }
        
        const capacidadeStr = await this.pedirInput("Capacidade (número)")
        const alcanceStr = await this.pedirInput("Alcance (km, número)")

        // Validação e conversão de números
        const capacidade = parseInt(capacidadeStr)
        const alcance = parseInt(alcanceStr)
        if (isNaN(capacidade) || isNaN(alcance)) {
            throw new Error("Capacidade e Alcance devem ser números válidos.")
        }

        const dadosCadastro = { codigo, modelo, tipo, capacidade, alcance }
        const novaAeronave = AeronaveService.salvar(dadosCadastro)

        console.log(`\n✅ Aeronave ${novaAeronave.codigo} (${novaAeronave.modelo}) cadastrada com sucesso!`)
    }

   
    private static menuListarAeronaves(): void {
        const lista = AeronaveService.carregar()
        
        if (lista.length === 0) {
            console.log("\nNão há aeronaves cadastradas.")
            return
        }
        
        console.log("\n--- LISTA DE AERONAVES ---")
        lista.forEach(aero => {
            console.log(`[${aero.codigo}] Modelo: ${aero.modelo} | Tipo: ${aero.tipo}`)
        })
        console.log(`Total: ${lista.length} aeronaves.`)
    }

    private static async exibirMenuPecas(): Promise<void> {
        let voltar = false
        while (!voltar) {
            console.log("\n--- GESTÃO DE PEÇAS ---")
            console.log("1. Associar Nova Peça à Aeronave")
            console.log("2. Atualizar Status de Peça")
            console.log("3. Listar Peças da Aeronave")
            console.log("9. Voltar")
            
            const opcao = await this.pedirInput("Ação")

            try {
                switch (opcao) {
                    case '1':
                        await this.associarNovaPecaPrompt()
                        break
                    case '2':
                        await this.atualizarStatusPecaPrompt()
                        break
                    case '3':
                        await this.listarPecasAeronaveMenu()
                        break
                    case '9':
                        voltar = true
                        break
                    default:
                        console.log("Opção inválida.")
                }
            } catch (error) {
                console.error(`\n❌ ERRO: ${(error as Error).message}`)
            }
        }
    }

    private static async associarNovaPecaPrompt(): Promise<void> {
        console.log("\n--- ASSOCIAR NOVA PEÇA ---")
        const codigoAeronave = await this.pedirInput("Código da Aeronave de destino")
        const nome = await this.pedirInput("Nome da Peça")
        const fornecedor = await this.pedirInput("Fornecedor")

        console.log("Status: 1. EM PRODUCAO | 2. EM TRANSPORTE | 3. PRONTA")
        const statusPeca = await this.pedirInput("1. EM PRODUCAO | 2. EM TRANSPORTE | 3. PRONTA")
        
        let status: StatusPeca
        if (statusPeca === '1') 
            { status = StatusPeca.EM_PRODUCAO }
        else if (statusPeca === '2') 
            { status = StatusPeca.EM_TRANSPORTE }
        else if (statusPeca === '3') 
            { status = StatusPeca.PRONTA }
        else { 
            throw new Error("Opção de tipo inválida. Peça não cadastrada.")
        }

        console.log("Tipos: 1. NACIONAL | 2. IMPORTADA")
        const tipoOpcao = await this.pedirInput("Tipo (1 ou 2)")
        
        let tipo: TipoPeca
        if (tipoOpcao === '1') {
            tipo = TipoPeca.NACIONAL
        } else if (tipoOpcao === '2') {
            tipo = TipoPeca.IMPORTADA
        } else {
            throw new Error("Opção de tipo inválida. Peça não cadastrada.")
        }

        PecaService.associarNovaPeca(codigoAeronave, nome, tipo, fornecedor, status)
        console.log(`\n✅ Peça '${nome}' associada à aeronave ${codigoAeronave} com status EM_PRODUCAO.`)
    }

    private static async atualizarStatusPecaPrompt(): Promise<void> {
        console.log("\n--- ATUALIZAR STATUS ---")
        const codigoAeronave = await this.pedirInput("Código da Aeronave")
        const nomePeca = await this.pedirInput("Nome da Peça")
        
        console.log("Status: 1. EM_TRANSPORTE | 2. PRONTA")
        const statusOpcao = await this.pedirInput("Novo Status (1 ou 2)")
        
        let novoStatus: StatusPeca
        if (statusOpcao === '1') {
            novoStatus = StatusPeca.EM_TRANSPORTE
        } else if (statusOpcao === '2') {
            novoStatus = StatusPeca.PRONTA
        } else {
            throw new Error("Opção de status inválida.")
        }
        PecaService.atualizarStatusPeca(codigoAeronave, nomePeca, novoStatus)
        console.log(`\n✅ Status da peça '${nomePeca}' atualizado para ${novoStatus}.`)
    }

    private static async listarPecasAeronaveMenu(): Promise<void> {
        const codigoAeronave = await this.pedirInput("Código da Aeronave")
        const aeronave = AeronaveService.carregar().find(a => a.codigo === codigoAeronave)
        if (!aeronave) {
            console.log(`\n❌ Aeronave ${codigoAeronave} não encontrada.`)
            return
        }
        if (aeronave.pecas.length === 0) {
            console.log(`\n🔎 Nenhuma peça associada à aeronave ${codigoAeronave}.`)
            return
        }
        console.log(`\n--- PEÇAS DA AERONAVE ${codigoAeronave} (${aeronave.modelo}) ---`)
        aeronave.pecas.forEach(p => {
            console.log(` - ${p.nome} | Tipo: ${p.tipo} | Fornecedor: ${p.fornecedor} | STATUS: ${p.status}`)
        })
    }

    private static async exibirMenuEtapas(): Promise<void> {
        let voltar = false
        while (!voltar) {
            console.log("\n--- GESTÃO DE ETAPAS ---")
            console.log("2. Iniciar Etapa")
            console.log("3. Finalizar Etapa")
            console.log("4. Associar Funcionário à Etapa")
            console.log("5. Listar Etapas da Aeronave")
            console.log("9. Voltar")
            
            const opcao = await this.pedirInput("Ação")

            try {
                switch (opcao) {
                    case '2':
                        await this.iniciarEtapaPrompt()
                        break
                    case '3':
                        await this.finalizarEtapaPrompt()
                        break
                    case '4':
                        await this.associarFuncionarioEtapa()
                        break
                    case '5':
                        await this.listarEtapasAeronave()
                        break
                    case '9':
                        voltar = true
                        break
                    default:
                        console.log("Opção inválida.")
                }
            } catch (error) {
                console.error(`\nERRO: ${(error as Error).message}`)
            }
        }
    }

    private static async iniciarEtapaPrompt(): Promise<void> {
        console.log("\n--- INICIAR ETAPA ---")
        const codigoAeronave = await this.pedirInput("Código da Aeronave")
        const nomeEtapa = await this.pedirInput("Nome da Etapa a iniciar")
        
        EtapaService.iniciarEtapa(codigoAeronave, nomeEtapa)
        console.log(`\nEtapa '${nomeEtapa}' da aeronave ${codigoAeronave} alterada para EM ANDAMENTO.`)
    }

    private static async finalizarEtapaPrompt(): Promise<void> {
        console.log("\n--- FINALIZAR ETAPA ---")
        const codigoAeronave = await this.pedirInput("Código da Aeronave")
        const nomeEtapa = await this.pedirInput("Nome da Etapa a finalizar")
        
        EtapaService.finalizarEtapa(codigoAeronave, nomeEtapa)
        console.log(`\n✅ Etapa '${nomeEtapa}' da aeronave ${codigoAeronave} CONCLUÍDA.`)
    }


    private static async associarFuncionarioEtapa(): Promise<void> {
        console.log("\n--- ASSOCIAR FUNCIONÁRIO ---")
        const codigoAeronave = await this.pedirInput("Código da Aeronave")
        const nomeEtapa = await this.pedirInput("Nome da Etapa")
        const idFuncionario = await this.pedirInput("ID do Funcionário (Ex: 000)")

        EtapaService.associarFuncionario(codigoAeronave, nomeEtapa, idFuncionario)
        console.log(`\n✅ Funcionário ${idFuncionario} associado à etapa '${nomeEtapa}'.`)
    }

    private static async listarEtapasAeronave(): Promise<void> {
        const codigoAeronave = await this.pedirInput("Código da Aeronave")
        const aeronave = AeronaveService.carregar().find(a => a.codigo === codigoAeronave)
        
        if (!aeronave) {
            console.log(`\nAeronave ${codigoAeronave} não encontrada.`)
            return
        }

        if (aeronave.etapas.length === 0) {
            console.log(`\nNenhuma etapa cadastrada para a aeronave ${codigoAeronave}.`)
            return
        }
        
        console.log(`\n--- ETAPAS DA AERONAVE ${codigoAeronave} (${aeronave.modelo}) ---`)
        aeronave.etapas.forEach(e => {
            const responsaveis = e.funcionarios.map(f => f.nome).join(', ') || 'Nenhum'
            console.log(`[${e.status}] ${e.nome} (Prazo: ${e.prazo} dias)`)
            console.log(`Responsáveis: ${responsaveis}`)
        })
    }

    private static async exibirMenuFuncionarios(): Promise<void> {
        let voltar = false
        while (!voltar) {
            console.log("\n--- GESTÃO DE FUNCIONÁRIOS (ADMIN) ---")
            console.log("1. Cadastrar Novo Funcionário")
            console.log("2. Listar Todos os Funcionários")
            console.log("9. Voltar")
            
            const opcao = await this.pedirInput("Ação")

            try {
                switch (opcao) {
                    case '1':
                        await this.cadastrarFuncionario()
                        break
                    case '2':
                        this.listarTodosFuncionarios()
                        break
                    case '9':
                        voltar = true
                        break
                    default:
                        console.log("Opção inválida.")
                }
            } catch (error) {
                console.error(`\nERRO: ${(error as Error).message}`)
            }
        }
    }

    private static async cadastrarFuncionario(): Promise<void> {
        console.log("\n--- CADASTRO DE NOVO FUNCIONÁRIO ---")
        
        const id = await this.pedirInput("ID Único")
        const nome = await this.pedirInput("Nome Completo")
        const telefone = await this.pedirInput("Telefone")
        const endereco = await this.pedirInput("Endereço")
        const usuario = await this.pedirInput("Nome de Usuário (Login)")
        const senha = await this.pedirInput("Senha Inicial")

        console.log("Níveis: 1. ADMINISTRADOR | 2. ENGENHEIRO | 3. OPERADOR")
        const nivelOpcao = await this.pedirInput("Nível de Permissão (1, 2 ou 3)")
        
        let nivelPermissao: NivelPermissao
        switch (nivelOpcao) {
            case '1': 
                nivelPermissao = NivelPermissao.ADMINISTRADOR 
                break;
            case '2': 
                nivelPermissao = NivelPermissao.ENGENHEIRO 
                break;
            case '3': 
                nivelPermissao = NivelPermissao.OPERADOR 
                break;
            default: 
                throw new Error("Opção de nível de permissão inválida.")
        }

        const novoFuncionario = new Funcionario(id, nome, telefone, endereco, usuario, senha, nivelPermissao)
        UsuarioService.cadastrarFuncionario(novoFuncionario)

        console.log(`\nFuncionário '${nome}' (Usuário: ${usuario}) cadastrado com sucesso!`)
    }

    private static listarTodosFuncionarios(): void {
        const lista = UsuarioService.carregarTodosFuncionarios()

        if (lista.length === 0) {
            console.log("\nNão há funcionários cadastrados.")
            return
        }

        console.log("\n--- LISTA DE FUNCIONÁRIOS ---")
        lista.forEach(f => {
            console.log(`[${f.id}] ${f.nome} (Login: ${f.usuario}) - Nível: ${f.nivelPermissao}`)
        })
        console.log(`Total: ${lista.length} funcionários.`)
    }
}