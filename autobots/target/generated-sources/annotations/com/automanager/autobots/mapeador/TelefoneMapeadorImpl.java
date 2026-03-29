package com.automanager.autobots.mapeador;

import com.automanager.autobots.dtos.requisicao.TelefoneRequisicaoDTO;
import com.automanager.autobots.dtos.resposta.TelefoneRespostaDTO;
import com.automanager.autobots.entidades.Telefone;
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
public class TelefoneMapeadorImpl implements TelefoneMapeador {

    @Override
    public Telefone paraEntidade(TelefoneRequisicaoDTO requisicaoDTO) {
        if ( requisicaoDTO == null ) {
            return null;
        }

        Telefone telefone = new Telefone();

        telefone.setId( requisicaoDTO.getId() );
        telefone.setDdd( requisicaoDTO.getDdd() );
        telefone.setNumero( requisicaoDTO.getNumero() );

        return telefone;
    }

    @Override
    public List<Telefone> paraEntidadeLista(List<TelefoneRequisicaoDTO> requisicaoDTO) {
        if ( requisicaoDTO == null ) {
            return null;
        }

        List<Telefone> list = new ArrayList<Telefone>( requisicaoDTO.size() );
        for ( TelefoneRequisicaoDTO telefoneRequisicaoDTO : requisicaoDTO ) {
            list.add( paraEntidade( telefoneRequisicaoDTO ) );
        }

        return list;
    }

    @Override
    public TelefoneRespostaDTO paraResposta(Telefone telefone) {
        if ( telefone == null ) {
            return null;
        }

        TelefoneRespostaDTO telefoneRespostaDTO = new TelefoneRespostaDTO();

        telefoneRespostaDTO.setDdd( telefone.getDdd() );
        telefoneRespostaDTO.setNumero( telefone.getNumero() );

        return telefoneRespostaDTO;
    }

    @Override
    public List<TelefoneRespostaDTO> paraRespostaLista(List<Telefone> telefones) {
        if ( telefones == null ) {
            return null;
        }

        List<TelefoneRespostaDTO> list = new ArrayList<TelefoneRespostaDTO>( telefones.size() );
        for ( Telefone telefone : telefones ) {
            list.add( paraResposta( telefone ) );
        }

        return list;
    }
}
