package com.automanager.autobots.mapeador;

import com.automanager.autobots.dtos.requisicao.TelefoneRequisicaoDTO;
import com.automanager.autobots.dtos.resposta.TelefoneRespostaDTO;
import com.automanager.autobots.entidades.Telefone;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TelefoneMapeador {
    Telefone paraEntidade(TelefoneRequisicaoDTO requisicaoDTO);

    List<Telefone> paraEntidadeLista(List<TelefoneRequisicaoDTO> requisicaoDTO);

    TelefoneRespostaDTO paraResposta(Telefone telefone);

    List<TelefoneRespostaDTO> paraRespostaLista(List<Telefone> telefones);
}