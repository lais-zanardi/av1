package com.automanager.autobots.controles;

import com.automanager.autobots.dtos.requisicao.DocumentoRequisicaoDTO;
import com.automanager.autobots.dtos.resposta.DocumentoRespostaDTO;
import com.automanager.autobots.entidades.Documento;
import com.automanager.autobots.mapeador.DocumentoMapeador;
import com.automanager.autobots.servicos.DocumentoServico;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/documento")
@RequiredArgsConstructor
public class DocumentoControle {
    private final DocumentoServico servico;
    private final DocumentoMapeador mapeador;

    @GetMapping("/{id}")
    public ResponseEntity<DocumentoRespostaDTO> obterPorId(@PathVariable Long id) {
        DocumentoRespostaDTO resposta =mapeador.paraResposta(servico.encontrarPorId(id));
        return ResponseEntity.status(HttpStatus.OK).body(resposta);
    }

    @GetMapping()
    public ResponseEntity<List<DocumentoRespostaDTO>> obterTodos() {
        List<DocumentoRespostaDTO> resposta = mapeador.paraRespostaLista(servico.encontrarTodos());
        return ResponseEntity.status(HttpStatus.OK).body(resposta);
    }

    @PostMapping()
    public ResponseEntity<DocumentoRespostaDTO> cadastrar(@RequestBody @Valid DocumentoRequisicaoDTO dto) {
        Documento entidade = mapeador.paraEntidade(dto);
        servico.salvar(entidade);
        return ResponseEntity.status(HttpStatus.CREATED).body(mapeador.paraResposta(entidade));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<DocumentoRespostaDTO> atualizar(@PathVariable Long id, @RequestBody @Valid DocumentoRequisicaoDTO atualizacao) {
        return ResponseEntity.status(HttpStatus.OK).body(mapeador.paraResposta(servico.atualizar(id, atualizacao)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        servico.deletarPorId(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
