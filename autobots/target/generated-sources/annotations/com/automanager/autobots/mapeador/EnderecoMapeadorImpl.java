package com.automanager.autobots.mapeador;

import com.automanager.autobots.dtos.requisicao.EnderecoRequisicaoDTO;
import com.automanager.autobots.dtos.resposta.EnderecoRespostaDTO;
import com.automanager.autobots.entidades.Endereco;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-28T20:45:01-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.12 (Oracle Corporation)"
)
@Component
public class EnderecoMapeadorImpl implements EnderecoMapeador {

    @Override
    public Endereco paraEntidade(EnderecoRequisicaoDTO requisicaoDTO) {
        if ( requisicaoDTO == null ) {
            return null;
        }

        Endereco endereco = new Endereco();

        endereco.setEstado( requisicaoDTO.getEstado() );
        endereco.setCidade( requisicaoDTO.getCidade() );
        endereco.setBairro( requisicaoDTO.getBairro() );
        endereco.setRua( requisicaoDTO.getRua() );
        endereco.setNumero( requisicaoDTO.getNumero() );
        endereco.setCodigoPostal( requisicaoDTO.getCodigoPostal() );
        endereco.setInformacoesAdicionais( requisicaoDTO.getInformacoesAdicionais() );

        return endereco;
    }

    @Override
    public List<Endereco> paraEntidadeLista(List<EnderecoRequisicaoDTO> requisicaoDTO) {
        if ( requisicaoDTO == null ) {
            return null;
        }

        List<Endereco> list = new ArrayList<Endereco>( requisicaoDTO.size() );
        for ( EnderecoRequisicaoDTO enderecoRequisicaoDTO : requisicaoDTO ) {
            list.add( paraEntidade( enderecoRequisicaoDTO ) );
        }

        return list;
    }

    @Override
    public EnderecoRespostaDTO paraResposta(Endereco endereco) {
        if ( endereco == null ) {
            return null;
        }

        EnderecoRespostaDTO enderecoRespostaDTO = new EnderecoRespostaDTO();

        enderecoRespostaDTO.setRua( endereco.getRua() );
        enderecoRespostaDTO.setBairro( endereco.getBairro() );
        enderecoRespostaDTO.setNumero( endereco.getNumero() );
        enderecoRespostaDTO.setCidade( endereco.getCidade() );
        enderecoRespostaDTO.setEstado( endereco.getEstado() );
        enderecoRespostaDTO.setCodigoPostal( endereco.getCodigoPostal() );
        enderecoRespostaDTO.setInformacoesAdicionais( endereco.getInformacoesAdicionais() );

        return enderecoRespostaDTO;
    }

    @Override
    public List<EnderecoRespostaDTO> paraRespostaLista(List<Endereco> enderecos) {
        if ( enderecos == null ) {
            return null;
        }

        List<EnderecoRespostaDTO> list = new ArrayList<EnderecoRespostaDTO>( enderecos.size() );
        for ( Endereco endereco : enderecos ) {
            list.add( paraResposta( endereco ) );
        }

        return list;
    }
}
