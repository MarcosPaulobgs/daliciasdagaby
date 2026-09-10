export const WHATSAPP_NUMERO = "5573981440403";
export const INSTAGRAM_USUARIO = "deliciaasdagaby";

export function linkWhatsApp(mensagem) {
  const texto = encodeURIComponent(mensagem || "Olá, Gaby! Gostaria de fazer um pedido.");
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${texto}`;
}

export function linkInstagramDM() {
  return `https://instagram.com/${INSTAGRAM_USUARIO}`;
}

export const CATEGORIAS = [
  {
    id: "bolos",
    nome: "Bolos & Bento Cakes",
    itens: [
      {
        id: "bento-cake",
        nome: "Bento Cake",
        descricao:
          "Mini bolo individual personalizado com frase ou desenho. Ideal para presentes e mesversários.",
        preco: null,
        precoLabel: "Sob consulta",
        destaque: true,
        imagem: "/img/destaques/bento-cake.webp",
      },
      {
        id: "hamburguer-de-bolo",
        nome: "Hambúrguer de Bolo",
        descricao:
          "A novidade da casa: dois discos de bolo de chocolate recheados com creme, brigadeiro e morango, no formato de hambúrguer.",
        preco: null,
        precoLabel: "Sob consulta",
        destaque: true,
        imagem: "/img/destaques/hamburguer-de-bolo.webp",
      },
      {
        id: "bolo-personalizado",
        nome: "Bolo Personalizado",
        descricao:
          "Naked cake ou decorado com recheios especiais à sua escolha. Ideal para festas e aniversários.",
        preco: null,
        precoLabel: "Sob consulta",
        destaque: true,
      },
      {
        id: "coroa-de-natal",
        nome: "Coroa Confeitada",
        descricao: "Bolo em formato de coroa decorado com frutas e brigadeiros finos.",
        preco: null,
        precoLabel: "Sob consulta",
        destaque: false,
      },
    ],
  },
  {
    id: "copos-taças",
    nome: "Copos, Taças & Sobremesas",
    itens: [
      {
        id: "sobremesa-2000",
        nome: "Sobremesa na Taça (2.000ml)",
        descricao:
          "Sabores: Ninho com morango, Chocolate, Oreo, Sensação, Uva com Ninho e Mousse de Limão.",
        preco: 38,
        precoLabel: "a partir de R$ 38",
        destaque: true,
      },
      {
        id: "mini-sobremesa",
        nome: "Mini Sobremesa",
        descricao:
          "Versão individual nos mesmos sabores da taça grande. Opção especial com recheio duplo.",
        preco: 38,
        precoLabel: "R$ 38 · Especial R$ 45–50",
        destaque: false,
      },
      {
        id: "copo-felicidade",
        nome: "Copo da Felicidade",
        descricao: "Camadas cremosas de Ninho, brigadeiro gourmet e pedaços de morango.",
        preco: null,
        precoLabel: "Sob consulta",
        destaque: true,
      },
      {
        id: "taça-morango",
        nome: "Taça de Morango",
        descricao: "Morango fresco com creme especial e cobertura de chocolate.",
        preco: null,
        precoLabel: "Sob consulta",
        destaque: false,
      },
    ],
  },
  {
    id: "trufados",
    nome: "Trufados & Cones",
    itens: [
      {
        id: "cone-trufado",
        nome: "Cone Trufado",
        descricao: "Casquinha crocante banhada no chocolate com recheio cremoso e morango.",
        preco: 12,
        precoLabel: "a partir de R$ 12",
        destaque: true,
        imagem: "/img/destaques/cone-trufado.webp",
      },
      {
        id: "brigadeiro-beijinho",
        nome: "Brigadeiros Gourmet & Docinhos",
        descricao: "Cento ou caixas de doces finos para festas e momentos especiais.",
        preco: null,
        precoLabel: "Sob consulta",
        destaque: false,
      },
    ],
  },
  {
    id: "salgados",
    nome: "Salgados & Tortas",
    itens: [
      {
        id: "empadao-frango",
        nome: "Empadão de Frango Cremoso",
        descricao: "Massa podre derretendo na boca. Tamanhos P (até 7p), M (até 12p) e G (até 18p).",
        preco: null,
        precoLabel: "P / M / G — Sob consulta",
        destaque: true,
      },
      {
        id: "batata-recheada",
        nome: "Batata Recheada",
        descricao: "Batata assada recheada e gratinada na hora.",
        preco: null,
        precoLabel: "Sob consulta",
        destaque: false,
      },
    ],
  },
  {
    id: "doces",
    nome: "Kits & Doces Personalizados",
    itens: [
      {
        id: "alfajor",
        nome: "Alfajor Artesanal",
        descricao: "Recheio generoso de doce de leite coberto com chocolate.",
        preco: null,
        precoLabel: "Sob consulta",
        destaque: true,
        imagem: "/img/destaques/alfajor.webp",
      },
      {
        id: "cupcake-personalizado",
        nome: "Cupcake Personalizado",
        descricao: "Decorado sob encomenda no tema da sua festa.",
        preco: null,
        precoLabel: "Sob consulta",
        destaque: false,
      },
      {
        id: "cesta-presente",
        nome: "Cesta Delícias da Gaby",
        descricao: "Montada especialmente com seleção de bolos, doces e mimos.",
        preco: null,
        precoLabel: "Sob consulta",
        destaque: true,
      },
    ],
  },
];

// Lista plana unificada para o app
export const PRODUTOS = CATEGORIAS.flatMap((cat) =>
  cat.itens.map((item) => ({ ...item, categoriaId: cat.id, categoriaNome: cat.nome }))
);

// Aliases para compatibilidade total com os componentes
export const produtos = PRODUTOS;
export const DESTAQUES = PRODUTOS.filter((p) => p.destaque);

const produtosData = {
  WHATSAPP_NUMERO,
  INSTAGRAM_USUARIO,
  linkWhatsApp,
  linkInstagramDM,
  CATEGORIAS,
  PRODUTOS,
  produtos,
  DESTAQUES,
};

export default produtosData;