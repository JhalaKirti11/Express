import express from "express";
import { addProductAction, viewproduct, deleteAction, editProductPage, editProductAction} from "../controller/product.controller.js";
import { verify } from "../middleware/auth.js";

const router = express.Router();

router.post("/add-product",verify,addProductAction);
router.get("/view-product",verify,viewproduct);
router.post("/delete-product",verify, deleteAction);
router.get("/delete-product/:productId",verify,deleteAction);
router.post("/edit-product",verify,editProductAction);
router.get("/edit-product/:productId",verify,editProductPage);

export default router;
