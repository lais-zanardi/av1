import { StatusEtapa } from "../enum/StatusEtapa"
import Funcionario from "./Funcionario"

export default class Etapa {
    private nome: string
    private prazo: string
    private status: StatusEtapa
    public funcionarios: Funcionario[]
    
    constructor(nome: string, prazo: string, status: StatusEtapa, funcionarios: Funcionario[]) {
        this.nome = nome
        this.prazo = prazo
        this.funcionarios = funcionarios
        this.status = StatusEtapa.PENDENTE //por default inicializar etapa como PENDENTE
    }

    public get getNome(): string {
        return this.nome
    }

    public get getPrazo(): string {
        return this.prazo
    }

    public get getStatus(): StatusEtapa {
        return this.status
    }
    
    public iniciar(): void {
        if (this.status === StatusEtapa.PENDENTE) {
            this.status = StatusEtapa.ANDAMENTO
            console.log(`Etapa '${this.nome}' iniciada e em andamento.`)
        } else {
            throw new Error(`A etapa '${this.nome}' já está em andamento ou concluída.`)
        }
    }

    public finalizar(): void {
        if (this.status === StatusEtapa.ANDAMENTO) {
            this.status = StatusEtapa.CONCLUIDA
            console.log(`Etapa '${this.nome}' concluída com sucesso.`)
        } else {
            throw new Error(`A etapa '${this.nome}' não pode ser finalizada se não estiver em andamento.`)
        }
    }

    public associarFuncionario(funcionario: Funcionario): void {
        let jaAssociado = false
        for (let i = 0; i < this.funcionarios.length; i++) {
            const funcionarioAtual = this.funcionarios[i]

            if (funcionarioAtual.getId === funcionario.getId) {
                jaAssociado = true
                break 
            }
        }

        if (jaAssociado) {
            throw new Error(`Funcionário ${funcionario.getNome} já está associado a esta etapa.`)
        }
        
        this.funcionarios.push(funcionario);
        console.log(`Funcionário ${funcionario.getNome} associado à etapa.`)
    }

    
    public listarFuncionarios(): string {
        if (this.funcionarios.length === 0) {
            return `Nenhum funcionário designado para a etapa '${this.nome}'.`
        }
        const lista = this.funcionarios.map(f => `  - ${f.getNome} (ID: ${f.getId})`).join('\n');
        return `Funcionários na etapa '${this.nome}':\n${lista}`;
    }
}