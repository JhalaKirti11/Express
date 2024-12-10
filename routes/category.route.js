import express from "express";
import { addCategoryAction, viewCategoryPage, deleteCategory} from "../controller/category.controller.js";
import { verify } from "../middleware/auth.js";

const router = express.Router();

router.post("/add-category", verify, addCategoryAction);
router.get("/view-category",verify,viewCategoryPage);
router.get("/delete-category/:categoryId", verify, deleteCategory);

export default router;
