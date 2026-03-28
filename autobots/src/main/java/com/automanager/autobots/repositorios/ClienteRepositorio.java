package com.automanager.autobots.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;

import com.automanager.autobots.entidades.Cliente;

public interface ClienteRepositorio extends JpaRepository<Cliente, Long> {
}