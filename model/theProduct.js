import pool from "../db/dbConfig.js";

export default class theProduct {
    constructor(id, name, category, price) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
    }

    static addProduct(pName, cid, pPrice) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql1 = "insert into product(name,cid,price) values(?,?,?)";
                    con.query(sql1, [pName, cid, pPrice], (err, result) => {
                        con.release();
                        if (!err) {
                            resolve(result);
                        } else {
                            reject(err);
                        }

                    });
                } else {
                    console.log(err);
                }
            });
        });
    }


    viewProduct() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con2) => {
                if (!err) {
                    let sql = "select product.id as id, product.name as name,productcategory.category as category, product.price as price from product join productcategory on product.cid=productcategory.id";
                    con2.query(sql, (err, result) => {
                        con2.release();
                        if (!err)
                            resolve(result);
                        else
                            reject(err);
                    });
                }
                else
                    reject(err);
            })
        });
    }

    static deleteProduct(id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, conn) => {
                if (!err) {
                    let sql = "delete from product where id=?";
                    conn.query(sql, [id], (err1, result) => {
                        if (!err1) {
                            resolve(result);
                        } else {
                            reject(err1);
                        }
                    })
                } else {
                    reject(err);
                }
            });
        });
    }

    static editDetails(id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "select *from product where id = ?";
                    con.release();
                    con.query(sql, [id], (err, result) => {
                        if (!err)
                            resolve(result);
                        else
                            reject(err);
                    });
                } else {
                    reject(err);
                }

            })
        });
    }

    editProduct() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "update product set name=?, cid=?, price = ? where id = ?";
                    con.query(sql, [this.name, this.category, this.price, this.id], (err, result) => {
                        if (!err) {
                            console.log(result);
                            resolve(result);
                        } else {
                            reject(err);
                        }
                    });
                } else {
                    reject(err);
                }
            });
        });
    }
}
