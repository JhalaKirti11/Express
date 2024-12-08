import pool from "../db/dbConfig.js";
import theProduct from "../model/theProduct.js";

export const addProductAction = (request, response, next) => {
  let { name, cid, price } = request.body;
  theProduct.addProduct(name, cid, price)
    .then(result => {
      if (result.length != 0) {
        response.render('dashboard.ejs');
      }
      else
        response.render("sign-in.ejs");
    }).catch(err => {
      console.log(err);
    });
}

export const viewproduct = (request, response, next) => {
  let { name, category, price } = request.body;
  let items = new theProduct(null, name, category, price);
  items.viewProduct()
    .then(result => {
      if (result.length != 0) {
        response.render("view-product", { product: result });
      }
      else
        response.render("sign-in.ejs");
    }).catch(err => {
      console.log(err);
    });
}

export const deleteAction = (req, res, next) => {
  let productId = req.params.productId;
  theProduct.deleteProduct(productId)
    .then(result => {
      res.redirect("/product/view-product");
    }).catch(err => {
      console.log(err);
      res.end("not work")
    });
}

export const editProductAction = (request, response, next) => {
  let { id, name, cid, price } = request.body;
  console.log(request.body);
  let item = new theProduct(id, name, cid, price);
  item.editProduct()
    .then(result => {
      response.redirect("/product/view-product");

    }).catch(err => {
      console.log(err);
      response.end("not work");
    })
}

export const editProductPage = (req, res, next) => {
  let productId = req.params.productId;
  theProduct.editDetails(productId)
    .then(result => {
      console.log(result);
      res.render('edit-product.ejs', { details: result[0] });
    }).catch(err => {
      console.log(err);
    });
}
