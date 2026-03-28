package com.automanager.autobots.excecoes;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter @AllArgsConstructor
public class NegocioException extends RuntimeException {
    private final String code;
    private final Object[] args;
}