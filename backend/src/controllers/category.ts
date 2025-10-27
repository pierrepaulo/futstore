import { RequestHandler } from "express";
import { getCategoryMetadata, getGategoryBySlug } from "../services/category";

export const getCategoryWhitMetadata: RequestHandler = async (req, res) => {
  const { slug } = req.params;

  const category = await getGategoryBySlug(slug);
  if (!category) {
    res.json({ error: "categoria nao encontrada" });
    return;
  }

  const metadata = await getCategoryMetadata(category.id);

  res.json({ error: null, category, metadata });
};
