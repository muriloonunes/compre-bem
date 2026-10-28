import {Produto} from "../types/Produto";
import {apiFetch} from "./api";
import {Page} from "../types/api";

export function getProdutos(
    page = 0,
    size = 20,
    sort = "id,asc",
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