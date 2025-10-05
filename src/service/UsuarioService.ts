import Funcionario from '../model/Funcionario'
import { NivelPermissao } from '../enum/NivelPermissao'
import PersistenciaService from './PersistenciaService'

export class UsuarioService {

    private static NOME_ARQUIVO = 'funcionarios.txt'

    public static carregarTodosFuncionarios(): Funcionario[] {
        const dadosBrutos = PersistenciaService.carregar(this.NOME_ARQUIVO)

        return dadosBrutos.map((dados: any) =>
            new Funcionario(
                dados._id,
                dados._nome,
                dados._telefone,
                dados._endereco,
                dados._usuario,
                dados._senha, 
                dados._nivelPermissao
            )
        )
    }

    public static autenticar(usuario: string, senha: string): Funcionario | null {
        const listaFuncionarios = this.carregarTodosFuncionarios()
        const funcionarioEncontrado = listaFuncionarios.find(f => f.usuario === usuario)

        if (!funcionarioEncontrado) {
            return null // Usuário não encontrado
        }

        if (funcionarioEncontrado.autenticar(senha)) {
            return funcionarioEncontrado // Autenticação bem-sucedida
        } else {
            return null // Senha incorreta
        }
    }

    public static cadastrarFuncionario(novoFuncionario: Funcionario): void {
        const listaAtual = this.carregarTodosFuncionarios()
        const idDuplicado = listaAtual.some(f => f.id === novoFuncionario.id)
        if (idDuplicado) {
            throw new Error(`ID de funcionário '${novoFuncionario.id}' já existe.`)
        }
        listaAtual.push(novoFuncionario)
        PersistenciaService.salvar(listaAtual, this.NOME_ARQUIVO)
    }

    public static inicializarSistema(): void {
        const listaAtual = this.carregarTodosFuncionarios()

        if (listaAtual.length === 0) {
            console.log("Nenhum funcionário encontrado. Criando usuário ADMINISTRADOR padrão...")
            const adminPadrao = new Funcionario(
                '000', 
                'Admin Inicial',
                '0000-0000',
                'Rua Principal',
                'admin', 
                'admin123', 
                NivelPermissao.ADMINISTRADOR
            )

            PersistenciaService.salvar([adminPadrao], this.NOME_ARQUIVO)
            console.log("Usuário 'admin' com senha 'admin123' criado com sucesso.")
        }
    }
}