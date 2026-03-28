package com.automanager.autobots.excecoes;

import lombok.Getter;

@Getter
public class EntidadeNaoEncontradaException extends NegocioException {
    public EntidadeNaoEncontradaException(String code, Object... args) {
        super(code, args);
    }
}
