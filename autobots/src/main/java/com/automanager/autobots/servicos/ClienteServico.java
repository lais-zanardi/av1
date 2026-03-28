package com.automanager.autobots.servicos;

import com.automanager.autobots.dtos.requisicao.ClienteRequisicaoDTO;
import com.automanager.autobots.dtos.requisicao.TelefoneRequisicaoDTO;
import com.automanager.autobots.dtos.resposta.ClienteRespostaDTO;
import com.automanager.autobots.entidades.Cliente;
import com.automanager.autobots.entidades.Endereco;
import com.automanager.autobots.entidades.Telefone;
import com.automanager.autobots.excecoes.EntidadeNaoEncontradaException;
import com.automanager.autobots.mapeador.ClienteMapeador;
import com.automanager.autobots.repositorios.ClienteRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ClienteServico {
    private final ClienteRepositorio repositorio;
    private final EnderecoServico enderecoServico;
    private final TelefoneServico telefoneServico;
    private final DocumentoServico documentoServico;
    private final ClienteMapeador mapeador;

    public List<ClienteRespostaDTO> encontrarTodos() {
        return repositorio.findAll().stream().map(mapeador::paraResposta).toList();
    }

    public ClienteRespostaDTO encontrarPorId(Long id) {
        Cliente cliente = repositorio.findById(id).orElseThrow(() -> new EntidadeNaoEncontradaException("Cliente " + id + " não encontrado :("));
        return mapeador.paraResposta(cliente);
    }

    public ClienteRespostaDTO salvar(Cliente cliente) {
        Cliente clienteSalvo = repositorio.save(cliente);
        return mapeador.paraResposta(clienteSalvo);
    }

    public void deletarPorId(Long id) {
        repositorio.deleteById(id);
    }

    private void atualizarDados(Cliente cliente, ClienteRequisicaoDTO atualizacao) {
        if (atualizacao.getNome() != null) {
            cliente.setNome(atualizacao.getNome());
        }
        if (atualizacao.getNomeSocial() != null) {
            cliente.setNomeSocial(atualizacao.getNomeSocial());
        }
        if (atualizacao.getDataNascimento() != null) {
            cliente.setDataNascimento(atualizacao.getDataNascimento());
        }

        repositorio.save(cliente);
    }

    @Transactional
    public ClienteRespostaDTO atualizar(Long id, ClienteRequisicaoDTO dto) {
        Cliente cliente = repositorio.findById(id).orElseThrow(() -> new EntidadeNaoEncontradaException("Cliente " + id + " não encontrado :("));

        atualizarDados(cliente, dto);
        if (dto.getEndereco() != null) {
            Endereco enderecoAtualizado = enderecoServico.atualizar(cliente.getEndereco().getId(), dto.getEndereco());
            cliente.setEndereco(enderecoAtualizado);
        }
        if (dto.getTelefones() != null) {
            List<Long> telIds = dto.getTelefones().stream()
                    .map(TelefoneRequisicaoDTO::getId)
                    .filter(Objects::nonNull)
                    .toList();

            cliente.getTelefones().removeIf(tel -> !telIds.contains(tel.getId()));

            for (TelefoneRequisicaoDTO telDto : dto.getTelefones()) {
                if (telDto.getId() != null) {
                    cliente.getTelefones().stream()
                            .filter(tel -> tel.getId().equals(telDto.getId()))
                            .findFirst()
                            .ifPresent(tel -> {
                                tel.setNumero(telDto.getNumero());
                                tel.setDdd(telDto.getDdd());
                            });
                } else {
                    Telefone novoTel = new Telefone();
                    novoTel.setNumero(telDto.getNumero());
                    novoTel.setDdd(telDto.getDdd());
                    cliente.getTelefones().add(novoTel);
                }
            }
        }
        return mapeador.paraResposta(repositorio.save(cliente));
    }
}
