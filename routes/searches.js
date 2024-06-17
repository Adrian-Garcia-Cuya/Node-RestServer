import { Router } from "express";

import { search } from "../controllers/searches.js";

const router = Router();

router.get('/:collection/:term', search);


export { router };