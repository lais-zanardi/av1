package com.automanager.autobots.dtos.requisicao;


import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnderecoRequisicaoDTO {
        private String rua;
        private String bairro;
        private String numero;
        private String cidade;

        @Size(message = "Estado deve ser sigla (Ex.: SP, PA)", max = 2)
        private String estado;

        @Size(min = 8, max = 8)
        private String codigoPostal;

        @Size(max = 255)
        private String informacoesAdicionais;
}