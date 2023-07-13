import { Router } from 'express';

const router = Router();
import { shortUrl, getUrl } from '../controller/shortener.js';

router.post("/url", shortUrl); 
router.get("/:urlId", getUrl);

export default router;
