import { Router } from "express";
import path from "path";
const router = Router();

router.get("^/$|/index(.html)?", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "index.html"));
});

router.get("/test(.html)?", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "test.html"));
});

export default router;
