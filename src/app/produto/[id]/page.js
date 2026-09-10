import produtosData from "@/data/produtos";
import { notFound } from "next/navigation";
import ProdutoClient from "./ProdutoClient";

// Metadados dinâmicos para SEO
export async function generateMetadata({ params }) {
  const { id } = await params;
  const todosProdutos = produtosData.CATEGORIAS?.flatMap((cat) => cat.itens || cat.produtos || []) || [];
  const produto = todosProdutos.find((p) => String(p.id) === String(id));

  if (!produto) return { title: "Produto não encontrado | Delícias da Gaby" };

  return {
    title: `${produto.nome} | Delícias da Gaby`,
    description: produto.descricao,
  };
}

export default async function ProdutoPage({ params }) {
  const { id } = await params;
  const todosProdutos = produtosData.CATEGORIAS?.flatMap((cat) => cat.itens || cat.produtos || []) || [];
  const produto = todosProdutos.find((p) => String(p.id) === String(id));

  if (!produto) {
    notFound();
  }

  return <ProdutoClient produto={produto} />;
}