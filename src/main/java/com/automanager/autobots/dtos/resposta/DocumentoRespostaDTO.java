package com.automanager.autobots.dtos.resposta;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DocumentoRespostaDTO {
    private String tipo;
    private String numero;
}
