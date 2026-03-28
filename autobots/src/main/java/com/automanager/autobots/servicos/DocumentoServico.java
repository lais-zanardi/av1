package com.automanager.autobots.servicos;

import com.automanager.autobots.dtos.requisicao.DocumentoRequisicaoDTO;
import com.automanager.autobots.entidades.Documento;
import com.automanager.autobots.excecoes.EntidadeNaoEncontradaException;
import com.automanager.autobots.repositorios.DocumentoRepositorio;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentoServico {
    private DocumentoRepositorio repositorio;

    public List<Documento> encontrarTodos() {
        return repositorio.findAll().stream().toList();
    }

    public Documento encontrarPorId(Long id) {
        return repositorio.findById(id).orElseThrow(() -> new EntidadeNaoEncontradaException("Documento " + id + " não encontrado :("));
    }

    public Documento salvar(Documento documento) {
        return repositorio.save(documento);
    }

    public List<Documento> salvarTodos(List<Documento> documentos) {
        return repositorio.saveAll(documentos);
    }

    public void deletarPorId(Long id) {
        repositorio.deleteById(id);
    }

    public Documento atualizar(Long id, DocumentoRequisicaoDTO atualizacao) {
        Documento documento = encontrarPorId(id);
        if (atualizacao.getTipo() != null) {
            documento.setTipo(atualizacao.getTipo());
        }
        if (atualizacao.getNumero() != null) {
            documento.setNumero(atualizacao.getNumero());
        }
       return repositorio.save(documento);
    }
}
