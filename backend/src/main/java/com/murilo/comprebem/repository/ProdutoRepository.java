package com.murilo.comprebem.repository;

import com.murilo.comprebem.entity.Produto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 19/10/2026
 * @brief Interface ProdutoRepository
 */
@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    Page<Produto> findAllByNomeContainingIgnoreCase(String nome, Pageable pageable);
}
