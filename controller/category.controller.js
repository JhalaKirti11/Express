import pool from "../db/dbConfig.js";
import categoryModel from "../model/categoryModel.js";

export const addCategoryAction = (request, response, next) => {
    let { name } = request.body;
    let items = categoryModel.addCategory(name)
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

export const viewCategoryPage = (request, response, next) => {
    categoryModel.viewcategory()
        .then(result => {
            if (result != 0) {
                response.render("view-category", { product: result });
            } else
                response.render("sign-in.ejs");
        }).catch(err => {
            console.log(err);
        })
}

export const viewSpecificCategory = (request, response, next) => {
    let { category } = request.body;
    let items = new categoryModel(null, category);
    items.viewcategory()
        .then(result => {
            if (result.length != 0)
                response.redirect("/view-category", { product: result });
            else
                response.render("sign-in.ejs");
        }).catch(err => {
            console.log(err);
        })
}

export const deleteCategory = (request, response, next) => {
    let categoryId = request.params.categoryId;
    console.log(categoryId);
    categoryModel.deleteTheCategory(categoryId)
        .then(result => {
            if (result.length != 0) {
                response.redirect('/category/view-category');
            } else {
                response.render("sign-in.ejs");
            }
        }).catch(err => {
            console.log(err);
        })
}

export const editCategory = (req, res, next)=>{
    let categoryId = req.params.categoryId;   
}
