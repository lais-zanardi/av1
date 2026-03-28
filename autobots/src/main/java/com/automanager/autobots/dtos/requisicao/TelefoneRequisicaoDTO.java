package com.automanager.autobots.dtos.requisicao;


import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TelefoneRequisicaoDTO {
        private Long id;

        @Size(min = 2, max = 2)
        private String ddd;

        @Size(min = 9, max = 9)
        private String numero;
}
