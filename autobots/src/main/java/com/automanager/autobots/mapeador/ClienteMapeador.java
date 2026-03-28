package com.automanager.autobots.mapeador;

import com.automanager.autobots.dtos.requisicao.ClienteRequisicaoDTO;
import com.automanager.autobots.dtos.resposta.ClienteRespostaDTO;
import com.automanager.autobots.entidades.Cliente;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ClienteMapeador {
    Cliente paraEntidade(ClienteRequisicaoDTO requisicaoDTO);

    List<Cliente> paraEntidadeLista(List<ClienteRequisicaoDTO> requisicaoDTO);

    ClienteRespostaDTO paraResposta(Cliente cliente);

    List<ClienteRespostaDTO> paraRespostaLista(List<Cliente> clientes);
}