import {Produto} from "../types/Produto";

export const produtosMock: Produto[] = [
    {
        id: 1,
        nome: 'Cadeira Confort Plus',
        preco: 349.9,
        categoria: 'Móveis',
        descricao: 'Cadeira ergonômica com apoio lombar, ideal para home office.',
        imagem: 'https://picsum.photos/100',
    },
    {
        id: 2,
        nome: 'Mesa para Escritório',
        preco: 589.0,
        categoria: 'Móveis',
        descricao: 'Mesa compacta com acabamento em madeira, cabe em espaços pequenos.',
        imagem: 'https://picsum.photos/100',
    },
    {
        id: 3,
        nome: 'Luminária de Mesa LED',
        preco: 79.9,
        categoria: 'Iluminação',
        descricao: 'Luminária LED com intensidade ajustável e braço flexível.',
        imagem: 'https://picsum.photos/100',
    },
    {
        id: 4,
        nome: 'Suporte para Notebook',
        preco: 129.9,
        categoria: 'Acessórios',
        descricao: 'Suporte ergonômico em alumínio, melhora a ventilação do notebook.',
        imagem: 'https://picsum.photos/100',
    },
];
