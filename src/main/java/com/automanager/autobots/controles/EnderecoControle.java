package com.automanager.autobots.controles;

import com.automanager.autobots.dtos.requisicao.EnderecoRequisicaoDTO;
import com.automanager.autobots.dtos.resposta.EnderecoRespostaDTO;
import com.automanager.autobots.entidades.Endereco;
import com.automanager.autobots.mapeador.EnderecoMapeador;
import com.automanager.autobots.servicos.EnderecoServico;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/endereco")
@RequiredArgsConstructor
public class EnderecoControle {
    private final EnderecoServico service;
    private final EnderecoMapeador mapeador;

    @GetMapping("/{id}")
    public ResponseEntity<EnderecoRespostaDTO> obterPorId(@PathVariable Long id) {
        EnderecoRespostaDTO resposta =mapeador.paraResposta(service.encontrarPorId(id));
        return ResponseEntity.status(HttpStatus.OK).body(resposta);
    }

    @GetMapping()
    public ResponseEntity<List<EnderecoRespostaDTO>> obterTodos() {
        List<EnderecoRespostaDTO> resposta = mapeador.paraRespostaLista(service.encontrarTodos());
        return ResponseEntity.status(HttpStatus.OK).body(resposta);
    }

    @PostMapping()
    public ResponseEntity<EnderecoRespostaDTO> cadastrar(@RequestBody @Valid EnderecoRequisicaoDTO dto) {
        Endereco endereco = mapeador.paraEntidade(dto);
        service.salvar(endereco);
        return ResponseEntity.status(HttpStatus.CREATED).body(mapeador.paraResposta(endereco));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<EnderecoRespostaDTO> atualizar(@PathVariable Long id, @RequestBody @Valid EnderecoRequisicaoDTO atualizacao) {
        return ResponseEntity.status(HttpStatus.OK).body(mapeador.paraResposta(service.atualizar(id, atualizacao)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        service.deletarPorId(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
