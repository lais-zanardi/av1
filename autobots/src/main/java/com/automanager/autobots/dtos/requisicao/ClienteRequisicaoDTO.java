package com.automanager.autobots.dtos.requisicao;


import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClienteRequisicaoDTO {
        @NotNull @NotEmpty
        private String nome;

        private String nomeSocial;

        @Past
        private Date dataNascimento;

        @FutureOrPresent
        private Date dataCadastro;

        private EnderecoRequisicaoDTO endereco;
        private DocumentoRequisicaoDTO documento;
        private List<TelefoneRequisicaoDTO> telefones;
}