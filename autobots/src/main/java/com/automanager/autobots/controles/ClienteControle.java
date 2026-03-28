package com.automanager.autobots.controles;

import com.automanager.autobots.dtos.requisicao.ClienteRequisicaoDTO;
import com.automanager.autobots.dtos.resposta.ClienteRespostaDTO;
import com.automanager.autobots.entidades.Cliente;
import com.automanager.autobots.mapeador.ClienteMapeador;
import com.automanager.autobots.servicos.ClienteServico;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/cliente")
public class ClienteControle {
	private final ClienteServico servico;
	private final ClienteMapeador mapeador;

	@GetMapping("/{id}")
	public ResponseEntity<ClienteRespostaDTO> obterPorId(@PathVariable Long id) {
		ClienteRespostaDTO resposta =servico.encontrarPorId(id);
		return ResponseEntity.status(HttpStatus.OK).body(resposta);
	}

	@GetMapping()
	public ResponseEntity<List<ClienteRespostaDTO>> obterTodos() {
		List<ClienteRespostaDTO> resposta = servico.encontrarTodos();
		return ResponseEntity.status(HttpStatus.OK).body(resposta);
	}

	@PostMapping()
	public ResponseEntity<ClienteRespostaDTO> cadastrar(@RequestBody @Valid ClienteRequisicaoDTO dto) {
		Cliente resposta = mapeador.paraEntidade(dto);
		servico.salvar(resposta);
		return ResponseEntity.status(HttpStatus.CREATED).body(mapeador.paraResposta(resposta));
	}


	@PatchMapping("/{id}")
	public ResponseEntity<ClienteRespostaDTO> atualizar(@PathVariable Long id, @RequestBody @Valid ClienteRequisicaoDTO atualizacao) {
		return ResponseEntity.status(HttpStatus.OK).body(servico.atualizar(id, atualizacao));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> excluirCliente(@PathVariable Long id) {
		servico.deletarPorId(id);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
}
