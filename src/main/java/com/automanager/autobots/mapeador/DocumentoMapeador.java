package com.automanager.autobots.mapeador;

import com.automanager.autobots.dtos.requisicao.DocumentoRequisicaoDTO;
import com.automanager.autobots.dtos.resposta.DocumentoRespostaDTO;
import com.automanager.autobots.entidades.Documento;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DocumentoMapeador {
    Documento paraEntidade(DocumentoRequisicaoDTO requisicaoDTO);

    List<Documento> paraEntidadeLista(List<DocumentoRequisicaoDTO> requisicaoDTO);

    DocumentoRespostaDTO paraResposta(Documento documento);

    List<DocumentoRespostaDTO> paraRespostaLista(List<Documento> documentos);
}