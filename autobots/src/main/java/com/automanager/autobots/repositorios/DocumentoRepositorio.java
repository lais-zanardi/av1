package com.automanager.autobots.repositorios;

import com.automanager.autobots.entidades.Documento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentoRepositorio extends JpaRepository<Documento, Long> {
}