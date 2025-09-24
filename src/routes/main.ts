import { Router } from "express";
import * as bannerController from "../controllers/banner"; // ajuste o caminho se necessário

export const routes = Router();

routes.get("/ping", (req, res) => {
  res.json({ pong: true });
});

routes.get("/banners", bannerController.getBanners);
