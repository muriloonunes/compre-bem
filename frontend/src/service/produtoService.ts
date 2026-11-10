import {CriarProdutoDTO, Produto} from "../types/Produto";
import {apiFetch} from "./api";
import {Page} from "../types/api";

export function getProdutos(
    page = 0,
    size = 20,
    sort = "id,desc",
    filtro?: string
): Promise<Page<Produto>> {
    const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        sort: sort,
    });

    if (filtro && filtro.trim() !== "") {
        params.append("filtro", filtro);
    }

    return apiFetch<Page<Produto>>(`/api/v1/produtos?${params.toString()}`);
}

export function getProdutoById(produtoId: number): Promise<Produto> {
    return apiFetch<Produto>(`/api/v1/produtos/${produtoId}`);
}

export function createProduto(produto: CriarProdutoDTO): Promise<Produto> {
    return apiFetch<Produto>(`/api/v1/produtos`, {
        method: 'POST',
        body: JSON.stringify(produto),
    })
}

export function updateProduto(produtoId: number, produto: CriarProdutoDTO): Promise<Produto> {
    return apiFetch<Produto>(`/api/v1/produtos/${produtoId}`, {
        method: 'PUT',
        body: JSON.stringify(produto),
    })
}

export function deleteProduto(produtoId: number): Promise<void> {
    return apiFetch<void>(`/api/v1/produtos/${produtoId}`, {
        method: 'DELETE',
    })
}