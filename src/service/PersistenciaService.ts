import * as fs from 'fs'
import * as path from 'path'

export default class PersistenciaService {
    private static DADOS_DIR = path.join(process.cwd(), 'data')
    private static RELATORIOS_DIR = path.join(this.DADOS_DIR, 'relatorios')

    private static garantirDiretorios(): void {
        if (!fs.existsSync(this.DADOS_DIR)) {
            fs.mkdirSync(this.DADOS_DIR, { recursive: true })
        }
        if (!fs.existsSync(this.RELATORIOS_DIR)) {
            fs.mkdirSync(this.RELATORIOS_DIR, { recursive: true })
        }
    }

    public static salvar(dados: any[], nomeArquivo: string): void {
        this.garantirDiretorios()
        
        const caminhoCompleto = path.join(this.DADOS_DIR, nomeArquivo)
        
        try {
            const dadosJson = JSON.stringify(dados, null, 2)
            fs.writeFileSync(caminhoCompleto, dadosJson, 'utf-8')
            
        } catch (error) {
            console.error(`ERRO de Persistência: Falha ao salvar ${nomeArquivo}.`, error)
        }
    }

    public static carregar(nomeArquivo: string): any[] {
        this.garantirDiretorios()
        
        const caminhoCompleto = path.join(this.DADOS_DIR, nomeArquivo)
        
        if (!fs.existsSync(caminhoCompleto)) {
            return [] // Retorna array vazio se o arquivo não existir
        }

        try {
            const dadosBuffer = fs.readFileSync(caminhoCompleto, 'utf-8')
            
            if (!dadosBuffer.trim()) {
                return [] // Se o arquivo estiver vazio após remover espaços em branco, retorna array vazio
            }

            return JSON.parse(dadosBuffer)
            
        } catch (error) {
            console.error(`ERRO de Persistência: Falha ao carregar/parsear dados de ${nomeArquivo}.`, error)
            return [] // Retorna array vazio em caso de erro
        }
    }

    public static salvarRelatorioTexto(conteudo: string, nomeArquivo: string): void {
        this.garantirDiretorios()
        const caminhoCompleto = path.join(this.RELATORIOS_DIR, nomeArquivo)

        try {
            fs.writeFileSync(caminhoCompleto, conteudo, 'utf-8')
        } catch (error) {
            console.error(`ERRO de Persistência: Falha ao salvar o relatório ${nomeArquivo}.`, error)
        }
    }
}