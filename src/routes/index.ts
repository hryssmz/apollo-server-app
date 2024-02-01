// routes/index.ts
import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();
router.get("/", async (_req: Request, res: Response) => {
  return res.redirect("/graphql");
});

export default router;
