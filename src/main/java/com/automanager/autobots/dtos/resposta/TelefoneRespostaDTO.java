package com.automanager.autobots.dtos.resposta;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TelefoneRespostaDTO {
    private String ddd;
    private String numero;
}
