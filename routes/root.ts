import { Router } from "express";
import path from "path";
const router = Router();

router.get("^/$|/index(.html)?", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("/new-page(.html)?", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "new-page.html"));
});

router.get("/old-page(.html)?", (_req, res) => {
  res.redirect(301, "/new-page.html");
});

export default router;
