import { RequestHandler } from "express";
import { getOrderBySessionIdSchema } from "../schemas/get-order-by-session-id-schema";
import { getOrderIdFromSession } from "../services/payment";
import { getUserOrders } from "../services/oder";

export const getOrderBySessionId: RequestHandler = async (req, res) => {
  const result = getOrderBySessionIdSchema.safeParse(req.query);
  if (!result.success) {
    res.status(400).json({ error: "Session ID não enviado" });
    return;
  }
  const { session_id } = result.data;
  const orderId = await getOrderIdFromSession(session_id);
  if (!orderId) {
    res.status(400).json({ error: "Ocorreu um erro" });
    return;
  }

  res.json({ error: null, orderId });
};

export const listOrders: RequestHandler = async (req, res) => {
  const userId = (req as any).userId;
  if (!userId) {
    res.status(401).json({ error: "Acesso negado" });
    return;
  }
  const orders = await getUserOrders(userId);

  res.json({ error: null, orders });
};
