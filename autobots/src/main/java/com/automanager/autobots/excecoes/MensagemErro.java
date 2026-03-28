package com.automanager.autobots.excecoes;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;
import java.util.List;

public record MensagemErro(
        int status,
        String mensagem,
        @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
        LocalDateTime dataHora,
        List<CampoErro> campos
) {
    record CampoErro(String campo, String mensagem) {}
}
