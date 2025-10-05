import Aeronave from "../model/Aeronave"
import { IEtapa } from "../interface/IEtapa"
import { IPeca } from "../interface/IPeca"
import { ITeste } from "../interface/ITeste"
import PersistenciaService from "./PersistenciaService"

export default class RelatorioService{
     public static gerarConteudo(aeronave: Aeronave, nomeCliente: string): string {
        const dataGeracao = new Date()
        
        let conteudo = `==================================================\n`
        conteudo += `        RELATÓRIO FINAL DE ENTREGA - AEROCODE       \n`
        conteudo += `==================================================\n`
        conteudo += ` Data de Emissão:  ${dataGeracao.toLocaleString()}\n`
        conteudo += ` Cliente:          ${nomeCliente}\n`
        conteudo += ` Aeronave Código:  ${aeronave.codigo}\n`
        conteudo += ` Aeronave Modelo:  ${aeronave.modelo}\n`
        conteudo += `--------------------------------------------------\n`
        conteudo +=  "\n[1] DETALHES DA AERONAVE:\n"
        conteudo += aeronave.detalhes() 
        conteudo += "\n[2] PEÇAS UTILIZADAS:\n"
        aeronave.pecas.forEach((p: IPeca) => {
            conteudo += `  - ${p.nome} (Fornecedor: ${p.fornecedor}, Status: ${p.status})\n`
        })
        conteudo += "\n[3] ETAPAS DE PRODUÇÃO:\n"
        aeronave.etapas.forEach((e: IEtapa) => {
            const funcionarios = e.funcionarios.map(f => f.nome).join(', ')
            conteudo += `  - Etapa: ${e.nome} | Status: ${e.status} | Responsáveis: [${funcionarios || 'Nenhum'}]\n`
        })
        conteudo += "\n[4] RESULTADOS DOS TESTES:\n"
        aeronave.testes.forEach((t: ITeste) => {
            conteudo += `  - Teste ${t.tipo}: ${t.resultado}\n`
        })
        conteudo += `\n==================================================\n`
        return conteudo
    }
    public gerarRelatorio(aeronave: Aeronave, nomeCliente: string): void {
        const conteudo = RelatorioService.gerarConteudo(aeronave, nomeCliente);
        const data = new Date();
        const nomeArquivo = `relatorio_${aeronave.codigo}_${data.getTime()}.txt`;

        PersistenciaService.salvarRelatorioTexto(conteudo, nomeArquivo);
        console.log(`\nRelatório final da aeronave ${aeronave.codigo} salvo em: ${nomeArquivo}`);
    }
}