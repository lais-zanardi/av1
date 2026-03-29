package com.automanager.autobots.dtos.requisicao;


import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DocumentoRequisicaoDTO {
        @NotEmpty
        private String tipo;

        @NotEmpty
        private String numero;
}