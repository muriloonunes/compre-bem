export type Produto = {
    id: number;
    nome: string;
    preco: number;
    categoria: string;
    descricao: string;
    imagem: string;
    quantidade: number;
};

export type CriarProdutoDTO = Omit<Produto, 'id' | 'imagem'>;