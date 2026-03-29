package com.automanager.autobots.dtos.resposta;

import com.automanager.autobots.dtos.requisicao.DocumentoRequisicaoDTO;
import com.automanager.autobots.dtos.requisicao.EnderecoRequisicaoDTO;
import com.automanager.autobots.dtos.requisicao.TelefoneRequisicaoDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClienteRespostaDTO {
    private String nome;
    private String nomeSocial;
    private Date dataNascimento;
    private Date dataCadastro;
    private EnderecoRequisicaoDTO endereco;
    private DocumentoRequisicaoDTO documento;
    private List<TelefoneRequisicaoDTO> telefones;
}
