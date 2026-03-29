package com.automanager.autobots.repositorios;

import com.automanager.autobots.entidades.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface ClienteRepositorio extends JpaRepository<Cliente, Long> {
}