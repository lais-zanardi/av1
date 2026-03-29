package com.automanager.autobots.mapeador;

import com.automanager.autobots.dtos.requisicao.DocumentoRequisicaoDTO;
import com.automanager.autobots.dtos.resposta.DocumentoRespostaDTO;
import com.automanager.autobots.entidades.Documento;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-28T21:15:19-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.12 (Oracle Corporation)"
)
@Component
public class DocumentoMapeadorImpl implements DocumentoMapeador {

    @Override
    public Documento paraEntidade(DocumentoRequisicaoDTO requisicaoDTO) {
        if ( requisicaoDTO == null ) {
            return null;
        }

        Documento documento = new Documento();

        documento.setTipo( requisicaoDTO.getTipo() );
        documento.setNumero( requisicaoDTO.getNumero() );

        return documento;
    }

    @Override
    public List<Documento> paraEntidadeLista(List<DocumentoRequisicaoDTO> requisicaoDTO) {
        if ( requisicaoDTO == null ) {
            return null;
        }

        List<Documento> list = new ArrayList<Documento>( requisicaoDTO.size() );
        for ( DocumentoRequisicaoDTO documentoRequisicaoDTO : requisicaoDTO ) {
            list.add( paraEntidade( documentoRequisicaoDTO ) );
        }

        return list;
    }

    @Override
    public DocumentoRespostaDTO paraResposta(Documento documento) {
        if ( documento == null ) {
            return null;
        }

        DocumentoRespostaDTO documentoRespostaDTO = new DocumentoRespostaDTO();

        documentoRespostaDTO.setTipo( documento.getTipo() );
        documentoRespostaDTO.setNumero( documento.getNumero() );

        return documentoRespostaDTO;
    }

    @Override
    public List<DocumentoRespostaDTO> paraRespostaLista(List<Documento> documentos) {
        if ( documentos == null ) {
            return null;
        }

        List<DocumentoRespostaDTO> list = new ArrayList<DocumentoRespostaDTO>( documentos.size() );
        for ( Documento documento : documentos ) {
            list.add( paraResposta( documento ) );
        }

        return list;
    }
}
