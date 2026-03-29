package com.automanager.autobots.mapeador;

import com.automanager.autobots.dtos.requisicao.ClienteRequisicaoDTO;
import com.automanager.autobots.dtos.requisicao.EnderecoRequisicaoDTO;
import com.automanager.autobots.dtos.requisicao.TelefoneRequisicaoDTO;
import com.automanager.autobots.dtos.resposta.ClienteRespostaDTO;
import com.automanager.autobots.entidades.Cliente;
import com.automanager.autobots.entidades.Endereco;
import com.automanager.autobots.entidades.Telefone;
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
public class ClienteMapeadorImpl implements ClienteMapeador {

    @Override
    public Cliente paraEntidade(ClienteRequisicaoDTO requisicaoDTO) {
        if ( requisicaoDTO == null ) {
            return null;
        }

        Cliente cliente = new Cliente();

        cliente.setNome( requisicaoDTO.getNome() );
        cliente.setNomeSocial( requisicaoDTO.getNomeSocial() );
        cliente.setDataNascimento( requisicaoDTO.getDataNascimento() );
        cliente.setDataCadastro( requisicaoDTO.getDataCadastro() );
        cliente.setEndereco( enderecoRequisicaoDTOToEndereco( requisicaoDTO.getEndereco() ) );
        cliente.setTelefones( telefoneRequisicaoDTOListToTelefoneList( requisicaoDTO.getTelefones() ) );

        return cliente;
    }

    @Override
    public List<Cliente> paraEntidadeLista(List<ClienteRequisicaoDTO> requisicaoDTO) {
        if ( requisicaoDTO == null ) {
            return null;
        }

        List<Cliente> list = new ArrayList<Cliente>( requisicaoDTO.size() );
        for ( ClienteRequisicaoDTO clienteRequisicaoDTO : requisicaoDTO ) {
            list.add( paraEntidade( clienteRequisicaoDTO ) );
        }

        return list;
    }

    @Override
    public ClienteRespostaDTO paraResposta(Cliente cliente) {
        if ( cliente == null ) {
            return null;
        }

        ClienteRespostaDTO clienteRespostaDTO = new ClienteRespostaDTO();

        clienteRespostaDTO.setNome( cliente.getNome() );
        clienteRespostaDTO.setNomeSocial( cliente.getNomeSocial() );
        clienteRespostaDTO.setDataNascimento( cliente.getDataNascimento() );
        clienteRespostaDTO.setDataCadastro( cliente.getDataCadastro() );
        clienteRespostaDTO.setEndereco( enderecoToEnderecoRequisicaoDTO( cliente.getEndereco() ) );
        clienteRespostaDTO.setTelefones( telefoneListToTelefoneRequisicaoDTOList( cliente.getTelefones() ) );

        return clienteRespostaDTO;
    }

    @Override
    public List<ClienteRespostaDTO> paraRespostaLista(List<Cliente> clientes) {
        if ( clientes == null ) {
            return null;
        }

        List<ClienteRespostaDTO> list = new ArrayList<ClienteRespostaDTO>( clientes.size() );
        for ( Cliente cliente : clientes ) {
            list.add( paraResposta( cliente ) );
        }

        return list;
    }

    protected Endereco enderecoRequisicaoDTOToEndereco(EnderecoRequisicaoDTO enderecoRequisicaoDTO) {
        if ( enderecoRequisicaoDTO == null ) {
            return null;
        }

        Endereco endereco = new Endereco();

        endereco.setEstado( enderecoRequisicaoDTO.getEstado() );
        endereco.setCidade( enderecoRequisicaoDTO.getCidade() );
        endereco.setBairro( enderecoRequisicaoDTO.getBairro() );
        endereco.setRua( enderecoRequisicaoDTO.getRua() );
        endereco.setNumero( enderecoRequisicaoDTO.getNumero() );
        endereco.setCodigoPostal( enderecoRequisicaoDTO.getCodigoPostal() );
        endereco.setInformacoesAdicionais( enderecoRequisicaoDTO.getInformacoesAdicionais() );

        return endereco;
    }

    protected Telefone telefoneRequisicaoDTOToTelefone(TelefoneRequisicaoDTO telefoneRequisicaoDTO) {
        if ( telefoneRequisicaoDTO == null ) {
            return null;
        }

        Telefone telefone = new Telefone();

        telefone.setId( telefoneRequisicaoDTO.getId() );
        telefone.setDdd( telefoneRequisicaoDTO.getDdd() );
        telefone.setNumero( telefoneRequisicaoDTO.getNumero() );

        return telefone;
    }

    protected List<Telefone> telefoneRequisicaoDTOListToTelefoneList(List<TelefoneRequisicaoDTO> list) {
        if ( list == null ) {
            return null;
        }

        List<Telefone> list1 = new ArrayList<Telefone>( list.size() );
        for ( TelefoneRequisicaoDTO telefoneRequisicaoDTO : list ) {
            list1.add( telefoneRequisicaoDTOToTelefone( telefoneRequisicaoDTO ) );
        }

        return list1;
    }

    protected EnderecoRequisicaoDTO enderecoToEnderecoRequisicaoDTO(Endereco endereco) {
        if ( endereco == null ) {
            return null;
        }

        EnderecoRequisicaoDTO enderecoRequisicaoDTO = new EnderecoRequisicaoDTO();

        enderecoRequisicaoDTO.setRua( endereco.getRua() );
        enderecoRequisicaoDTO.setBairro( endereco.getBairro() );
        enderecoRequisicaoDTO.setNumero( endereco.getNumero() );
        enderecoRequisicaoDTO.setCidade( endereco.getCidade() );
        enderecoRequisicaoDTO.setEstado( endereco.getEstado() );
        enderecoRequisicaoDTO.setCodigoPostal( endereco.getCodigoPostal() );
        enderecoRequisicaoDTO.setInformacoesAdicionais( endereco.getInformacoesAdicionais() );

        return enderecoRequisicaoDTO;
    }

    protected TelefoneRequisicaoDTO telefoneToTelefoneRequisicaoDTO(Telefone telefone) {
        if ( telefone == null ) {
            return null;
        }

        TelefoneRequisicaoDTO telefoneRequisicaoDTO = new TelefoneRequisicaoDTO();

        telefoneRequisicaoDTO.setId( telefone.getId() );
        telefoneRequisicaoDTO.setDdd( telefone.getDdd() );
        telefoneRequisicaoDTO.setNumero( telefone.getNumero() );

        return telefoneRequisicaoDTO;
    }

    protected List<TelefoneRequisicaoDTO> telefoneListToTelefoneRequisicaoDTOList(List<Telefone> list) {
        if ( list == null ) {
            return null;
        }

        List<TelefoneRequisicaoDTO> list1 = new ArrayList<TelefoneRequisicaoDTO>( list.size() );
        for ( Telefone telefone : list ) {
            list1.add( telefoneToTelefoneRequisicaoDTO( telefone ) );
        }

        return list1;
    }
}
