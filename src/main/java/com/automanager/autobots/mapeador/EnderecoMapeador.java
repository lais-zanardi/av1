package com.automanager.autobots.mapeador;

import com.automanager.autobots.dtos.requisicao.EnderecoRequisicaoDTO;
import com.automanager.autobots.dtos.resposta.EnderecoRespostaDTO;
import com.automanager.autobots.entidades.Endereco;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EnderecoMapeador {
    Endereco paraEntidade(EnderecoRequisicaoDTO requisicaoDTO);

    List<Endereco> paraEntidadeLista(List<EnderecoRequisicaoDTO> requisicaoDTO);

    EnderecoRespostaDTO paraResposta(Endereco endereco);

    List<EnderecoRespostaDTO> paraRespostaLista(List<Endereco> enderecos);
}