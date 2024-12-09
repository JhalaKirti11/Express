import pool from "../db/dbConfig.js";

export default class categoryModel{
    constructor(id, category){
        this.id = id;
        this.category = category;
    }

    static addCategory(cName) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "insert into productcategory(category) values(?)";
                    con.query(sql, [cName], (err2, result) => {
                        con.release();
                        if (!err2) {
                            resolve(result);
                        } else {
                            reject(err2);
                        }
                    })
                } else {
                    reject(err);
                }
            })
        });
    }

    static specificID(category){
        return new Promise((resolve, reject)=>{
            pool.getConnection((err, con)=>{
                if(!err){
                    let sql = "select* id from productcategory where category=?";
                    con.query(sql,(err, result)=>{
                        con.release();
                        if(!err){
                            resolve(result);
                        }else{
                            reject(err);
                        }
                    });
                }else{
                    reject(err);
                }
            })
        })
    }

    static viewcategory(){
        return new Promise((resolve, reject)=>{
            pool.getConnection((err, con)=>{
                if(!err){
                    let sql = "select * from productcategory";
                    con.query(sql,(err, result)=>{
                        con.release();
                        if(!err){
                            resolve(result);
                        }else{
                            reject(err);
                        }
                    });
                }else{
                    reject(err);
                }
            })
        })
    }

    static deleteTheCategory(id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, conn) => {
                if (!err) {
                    let sql = "delete from productcategory where id=?";
                    conn.query(sql, [id], (err1, result) => {
                        if (!err1) {
                            console.log("delete the category : "+result)
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
}
