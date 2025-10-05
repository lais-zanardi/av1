import { NivelPermissao } from "../enum/NivelPermissao"
import { IFuncionario } from "../interface/IFuncionario"

export default class Funcionario implements IFuncionario {
    private _id: string
    private _nome: string
    private _telefone: string
    private _endereco: string
    private _usuario: string
    private _senha: string
    private _nivelPermissao: NivelPermissao
    
    constructor(id: string, nome: string, telefone: string, endereco: string, usuario: string, senha: string, nivelPermissao: NivelPermissao) {
        this._id = id
        this._nome = nome
        this._telefone = telefone
        this._endereco = endereco
        this._usuario = usuario
        this._senha = senha
        this._nivelPermissao = nivelPermissao
    }

    public get id(): string {
        return this._id
    }

    public get nome(): string {
        return this._nome
    }

    public get telefone(): string {
        return this._telefone
    }

    public get endereco(): string {
        return this._endereco
    }

    public get usuario(): string {
        return this._usuario
    }

    public get nivelPermissao(): NivelPermissao {
        return this._nivelPermissao
    }

    public autenticar(senhaFornecida: string): boolean {
        return this._senha === senhaFornecida;
    }
}