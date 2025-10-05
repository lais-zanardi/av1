import { MensagensService } from './service/MensagensService'
import { UsuarioService } from './service/UsuarioService';

async function main() {
    console.log("Iniciando sistema de Gestão de Produção Aerocode...")
    // 1. Inicialização: Garante que o usuário administrador exista
    UsuarioService.inicializarSistema()

    // 2. Exibir a tela de Login
    const funcionarioLogado = await MensagensService.exibirTelaLogin()

    // 3. Iniciar o Menu Principal se o login for bem-sucedido
    if (funcionarioLogado) {
        await MensagensService.iniciarMenuPrincipal(funcionarioLogado)
    } else {
    }
    console.log("Encerrando aplicação. Até mais!")
}

// Executa a função principal para iniciar o sistema
main()