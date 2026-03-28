package com.automanager.autobots.repositorios;

import com.automanager.autobots.entidades.Endereco;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnderecoRepositorio extends JpaRepository<Endereco, Long> {
}