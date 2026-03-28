package com.automanager.autobots.servicos;

import com.automanager.autobots.dtos.requisicao.EnderecoRequisicaoDTO;
import com.automanager.autobots.entidades.Endereco;
import com.automanager.autobots.excecoes.EntidadeNaoEncontradaException;
import com.automanager.autobots.repositorios.EnderecoRepositorio;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnderecoServico {

    private EnderecoRepositorio repositorio;

    public List<Endereco> encontrarTodos() {
        return repositorio.findAll().stream().toList();
    }

    public Endereco encontrarPorId(Long id) {
        return repositorio.findById(id).orElseThrow(() -> new EntidadeNaoEncontradaException("Endereço " + id + " não encontrado :("));
    }

    public Endereco salvar(Endereco endereco) {
        return repositorio.save(endereco);
    }

    public List<Endereco> salvarTodos(List<Endereco> enderecos) {
        return repositorio.saveAll(enderecos);
    }

    public void deletarPorId(Long id) {
        repositorio.deleteById(id);
    }

    public Endereco atualizar(Long id, EnderecoRequisicaoDTO atualizacao) {
        Endereco endereco = repositorio.findById(id).orElseThrow(()-> new EntidadeNaoEncontradaException("Endereço " + id + " não encontrado :("));
        if (atualizacao.getRua() != null) {
            endereco.setRua(atualizacao.getRua());
        }
        if (atualizacao.getNumero() != null) {
            endereco.setNumero(atualizacao.getNumero());
        }
        if(atualizacao.getBairro() != null) {
            endereco.setBairro((atualizacao.getBairro()));
        }
        if(atualizacao.getCidade() != null) {
            endereco.setCidade((atualizacao.getCidade()));
        }
        if(atualizacao.getCodigoPostal() != null) {
            endereco.setCodigoPostal((atualizacao.getCodigoPostal()));
        }
        if(atualizacao.getEstado() != null) {
            endereco.setEstado((atualizacao.getEstado()));
        }
        if(atualizacao.getInformacoesAdicionais() != null) {
            endereco.setInformacoesAdicionais((atualizacao.getInformacoesAdicionais()));
        }
        repositorio.save(endereco);
        return endereco;
    }
}
