package com.murilo.comprebem.controller;

import com.murilo.comprebem.entity.dto.CriarProdutoDTO;
import com.murilo.comprebem.entity.dto.ProdutoResponseDTO;
import com.murilo.comprebem.service.ProdutoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 19/10/2026
 * @brief Class ProdutoController
 */
@RestController
@RequestMapping("api/v1/produtos")
@RequiredArgsConstructor
public class ProdutoController {
    private final ProdutoService produtoService;

    @PostMapping
    public ResponseEntity<ProdutoResponseDTO> criar(@RequestBody @Valid CriarProdutoDTO dto) {
        ProdutoResponseDTO novoProduto = produtoService.criar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoProduto);
    }

    @GetMapping
    public ResponseEntity<Page<ProdutoResponseDTO>> listar(
            @RequestParam(required = false) String busca,
            @PageableDefault(size = 20) Pageable pageable
    ) {
        if (pageable.getPageSize() > 50) {
            pageable = PageRequest.of(pageable.getPageNumber(), 50, pageable.getSort());
        }

        Page<ProdutoResponseDTO> produtos;

        if (busca != null && !busca.trim().isEmpty()) {
            produtos = produtoService.buscarPorNome(busca.toLowerCase(), pageable);
        } else {
            produtos = produtoService.listarTodos(pageable);
        }

        return ResponseEntity.ok().body(produtos);
    }
    @GetMapping("/{id}")
    public ResponseEntity<ProdutoResponseDTO> obterPorId(@PathVariable Long id) {
        var produto = produtoService.buscar(id);
        return ResponseEntity.ok().body(produto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        produtoService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProdutoResponseDTO> atualizar(@RequestBody @Valid CriarProdutoDTO dto, @PathVariable Long id) {
        ProdutoResponseDTO produtoAtualizado = produtoService.atualizar(id, dto);
        return ResponseEntity.ok().body(produtoAtualizado);
    }
}