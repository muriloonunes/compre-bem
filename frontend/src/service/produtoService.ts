import {Produto} from "../types/Produto";
import {apiFetch} from "./api";
import {Page} from "../types/api";

export function getProdutos(
    page = 0,
    size = 20,
    sort = "id,asc"
): Promise<Page<Produto>> {
    const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        sort: sort,
    });

    return apiFetch<Page<Produto>>('/api/v1/produtos?' + params.toString());
}