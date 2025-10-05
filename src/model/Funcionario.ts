import { NivelPermissao } from "../enum/NivelPermissao"

export default class Funcionario {
    private id: string
    private nome: string
    private telefone: string
    private endereco: string
    private usuario: string
    private senha: string
    private nivelPermissao: NivelPermissao
    
    constructor(id: string, nome: string, telefone: string, endereco: string, usuario: string, senha: string, nivelPermissao: NivelPermissao) {
        this.id = id
        this.nome = nome
        this.telefone = telefone
        this.endereco = endereco
        this.usuario = usuario
        this.senha = senha
        this.nivelPermissao = nivelPermissao
    }

    public get getId(): string {
        return this.id
    }

    public get getNome(): string {
        return this.nome
    }

    public get getTelefone(): string {
        return this.telefone
    }

    public get getEndereco(): string {
        return this.endereco
    }

    public get getUsuario(): string {
        return this.usuario
    }

    public get getNivelPermissao(): NivelPermissao {
        return this.nivelPermissao
    }

    public autenticar(senhaFornecida: string): boolean {
        return this.senha === senhaFornecida;
    }
}