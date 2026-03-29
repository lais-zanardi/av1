package com.automanager.autobots.repositorios;

import com.automanager.autobots.entidades.Telefone;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TelefoneRepositorio extends JpaRepository<Telefone, Long> {
}