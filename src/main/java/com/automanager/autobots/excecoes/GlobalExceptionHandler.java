package com.automanager.autobots.excecoes;

import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;

@RestControllerAdvice @RequiredArgsConstructor
public class GlobalExceptionHandler {

    private final MessageSource messageSource;

    @ExceptionHandler(NegocioException.class)
    public ResponseEntity<MensagemErro> handleNegocioException(NegocioException ex) {
        Locale locale = LocaleContextHolder.getLocale();

        String mensagem = messageSource.getMessage(ex.getCode(), ex.getArgs(), locale);

        MensagemErro erro = new MensagemErro(
                HttpStatus.BAD_REQUEST.value(),
                mensagem,
                LocalDateTime.now(),
                null
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<MensagemErro> handleValidationException(MethodArgumentNotValidException ex) {
        List<MensagemErro.CampoErro> campos = ex.getBindingResult().getFieldErrors().stream()
                .map(error -> new MensagemErro.CampoErro(error.getField(), error.getDefaultMessage()))
                .toList();

        MensagemErro erro = new MensagemErro(
                HttpStatus.UNPROCESSABLE_ENTITY.value(),
                "Erro de validação nos campos informados",
                LocalDateTime.now(),
                campos
        );

        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(erro);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<MensagemErro> handleGenericException(Exception ex) {
        ex.printStackTrace();

        MensagemErro erro = new MensagemErro(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Ocorreu um erro interno inesperado no servidor",
                LocalDateTime.now(),
                null
        );

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(erro);
    }

    @ExceptionHandler(EntidadeNaoEncontradaException.class)
    public ResponseEntity<MensagemErro> handleEntidadeNaoEncontrada(EntidadeNaoEncontradaException ex) {
        Locale locale = LocaleContextHolder.getLocale();
        String mensagem = messageSource.getMessage(ex.getCode(), ex.getArgs(), locale);

        MensagemErro erro = new MensagemErro(
                HttpStatus.NOT_FOUND.value(),
                mensagem,
                LocalDateTime.now(),
                null
        );

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erro);
    }
}