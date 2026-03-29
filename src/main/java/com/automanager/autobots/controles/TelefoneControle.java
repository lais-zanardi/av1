package com.automanager.autobots.controles;

import com.automanager.autobots.dtos.requisicao.TelefoneRequisicaoDTO;
import com.automanager.autobots.dtos.resposta.TelefoneRespostaDTO;
import com.automanager.autobots.entidades.Telefone;
import com.automanager.autobots.mapeador.TelefoneMapeador;
import com.automanager.autobots.servicos.TelefoneServico;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/telefone")
@RequiredArgsConstructor
public class TelefoneControle {
    private final TelefoneServico servico;
    private final TelefoneMapeador mapeador;

    @GetMapping("/{id}")
    public ResponseEntity<TelefoneRespostaDTO> obterPorId(@PathVariable Long id) {
        TelefoneRespostaDTO resposta =mapeador.paraResposta(servico.encontrarPorId(id));
        return ResponseEntity.status(HttpStatus.OK).body(resposta);
    }

    @GetMapping()
    public ResponseEntity<List<TelefoneRespostaDTO>> obterTodos() {
        List<TelefoneRespostaDTO> resposta = mapeador.paraRespostaLista(servico.encontrarTodos());
        return ResponseEntity.status(HttpStatus.OK).body(resposta);
    }

    @PostMapping()
    public ResponseEntity<TelefoneRespostaDTO> cadastrar(@RequestBody @Valid TelefoneRequisicaoDTO dto) {
        Telefone entidade = mapeador.paraEntidade(dto);
        servico.salvar(entidade);
        return ResponseEntity.status(HttpStatus.CREATED).body(mapeador.paraResposta(entidade));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TelefoneRespostaDTO> atualizar(@PathVariable Long id, @RequestBody @Valid TelefoneRequisicaoDTO atualizacao) {
        return ResponseEntity.status(HttpStatus.OK).body(mapeador.paraResposta(servico.atualizarPorId(id, atualizacao)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        servico.deletarPorId(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
