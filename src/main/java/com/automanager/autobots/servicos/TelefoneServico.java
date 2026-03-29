package com.automanager.autobots.servicos;

import com.automanager.autobots.dtos.requisicao.TelefoneRequisicaoDTO;
import com.automanager.autobots.entidades.Telefone;
import com.automanager.autobots.excecoes.EntidadeNaoEncontradaException;
import com.automanager.autobots.repositorios.TelefoneRepositorio;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TelefoneServico {
    private TelefoneRepositorio repositorio;

    public List<Telefone> encontrarTodos() {
        return repositorio.findAll().stream().toList();
    }

    public Telefone encontrarPorId(Long id) {
        return repositorio.findById(id).orElseThrow(() -> new EntidadeNaoEncontradaException("Telefone " + id + " não encontrado :("));
    }

    public Telefone salvar(Telefone telefone) {
        return repositorio.save(telefone);
    }

    public List<Telefone> salvarTodos(List<Telefone> telefones) {
        return repositorio.saveAll(telefones);
    }

    public void deletarPorId(Long id) {
        repositorio.deleteById(id);
    }

    public Telefone atualizarPorId(Long id, TelefoneRequisicaoDTO novoTelefone) {
        Telefone telefone = encontrarPorId(id);

        if (novoTelefone.getDdd() != null) {
            telefone.setDdd(novoTelefone.getDdd());
        }
        if (novoTelefone.getNumero() != null) {
            telefone.setNumero(novoTelefone.getNumero());
        }
        return repositorio.save(telefone);
    }
}
