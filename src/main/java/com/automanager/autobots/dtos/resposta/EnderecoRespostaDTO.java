package com.automanager.autobots.dtos.resposta;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnderecoRespostaDTO {
    private String rua;
    private String bairro;
    private String numero;
    private String cidade;
    private String estado;
    private String codigoPostal;
    private String informacoesAdicionais;
}