import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server.js";
import { expect } from "chai";
import e from "express";
chai.use(chaiHttp)



describe("Admin test case", () => {
    it("it should admin login successfully", function (done) {
        let admin = {
            email: "muskanverma99765@gmail.com",
            password: "Muskan@123",
        };
        this.timeout(5000);
        chai
            .request(server)
            .post("/admin/AdminLogin")
            .send(admin)
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }
                try {
                    expect(res.body.status).to.be.equal(200);
                    expect(res.body.message).to.be.equal("admin login successfully");
                    expect(res.body).to.have.all.keys("status", "message", "data", "token");
                    done();
                } catch (e) {
                    done(e);
                }
            });
    });

    it("login failed", function (done) {
        let admin = {
            email: "muskanverma199765@gmail.com",
            password: "Muskan@123",
        };
        chai.request(server).post("/admin/AdminLogin").send(admin)
            .end((err, res) => {
                if (err) {
                    done(err)
                    return;
                }
                try {
                    expect(res.body.status).to.be.equal(404);
                    expect(res.body.message).to.be.equal("admin is not found")
                    expect(res.body).to.have.all.keys("status", "message", "data");
                    done()
                } catch (error) {
                    done(error)
                }
            })
    })


    it("incorrect password", function (done) {
        let admin = {
            email: "muskanverma99765@gmail.com",
            password: "Muskan@1234",
        };
        chai.request(server).post("/admin/AdminLogin").send(admin)
            .end((err, res) => {
                if (err) {
                    done(err)
                    return;
                }
                try {
                    expect(res.body.status).to.be.equal(401);
                    expect(res.body.message).to.be.equal("password not  match")
                    expect(res.body).to.have.all.keys("status", "message", "data");
                    done()
                } catch (error) {
                    done(error)
                }
            })
    })



    it("internal server error", function (done) {
        let admin = {
            email: "muskanverma99765@gmail.com",
            password: null,
        };
        chai.request(server).post("/admin/AdminLogin").send(admin)
            .end((err, res) => {
                if (err) {
                    done(err)
                    return;
                }
                expect(res.body.status).to.be.equal(500);
                expect(res.body.message).to.be.equal("internal server error")
                done()
            })
    })
});

describe("User test case", () => {
    it("get all users", function (done) {
        chai.request(server)
            .get("/user/getAllUser")
            .end((err, res) => {
                if (err) {
                    done(err)
                    return;
                }
                try {
                    expect(res.body.status).to.be.equal(200);
                    expect(res.body).to.have.all.keys("status", "message", "data");
                    done()
                } catch (error) {
                    done(error)
                }
            })
    })


    it("user login test ", function (done) {
        let user = {
            email: "kashvi@gmail.com",
            password: "kashvi@123"
        };
        this.timeout(5000);
        chai
            .request(server)
            .post("/user/userLogin")
            .send(user)
            .end((err, res) => {
                if (err) {
                    done(err)
                    return;
                } try {
                    expect(res.body.status).to.be.equal(200)
                    expect(res.body.message).to.be.equal("User login successfully")
                    expect(res.body).to.have.all.keys("status", "message", "data", "token")
                    done()
                } catch (error) {
                    done(error)
                }
            })
    })

    it("user login fail test case", function (done) {
        const user = {
            email: "kashvi12@gmail.com",
            password: "kashvi@123"
        };
        chai
            .request(server)
            .post("/user/userLogin")
            .send(user)
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }
                try {
                    expect(res.body.status).to.be.equal(404);
                    expect(res.body.message).to.be.equal("Email not found");
                    expect(res.body).to.have.all.keys("status", "message", "data");
                    done();
                } catch (error) {
                    done(error);
                }
            });
    });

    it("password not match", (done) => {
        let user = {
            email: "kashvi@gmail.com",
            password: "kashvi@12399"
        }
        chai
            .request(server)
            .post("/user/userLogin")
            .send(user)
            .end((err, res) => {
                if (err) {
                    done(err)
                } try {
                    expect(res.body.status).to.be.equal(401)
                    expect(res.body.message).to.be.equal("Password does not match")
                    done()
                } catch (error) {
                    done(error)
                }
            })
    })

    it("internal server error", (done) => {
        let user = {
            email: "kashvi@gmail.com",
            password: null
        }
        chai
            .request(server)
            .post("/user/userLogin")
            .send(user)
            .end((err, res) => {
                if (err) {
                    done(err)
                }
                try {
                    expect(res.body.status).to.be.equal(500)
                    expect(res.body.message).to.to.equal("Internal server error")
                    done()
                } catch (error) {
                    done(error)
                }
            })

    })

    it("user register successfully", (done) => {
        let user = {
            "name": "kashviw",
            "email": "kashviw@gmail.com",
            "number": 9898545367,
            "password": "kashvi@123"
        }

        chai
            .request(server)
            .post("/user/userRegister")
            .send(user)
            .end((err, res) => {
                if (err) {
                    done(err)
                }
                else {
                    console.log("req.body",res.body)
                    try {
                        expect(res.body.status).to.be.equal(201)
                        expect(res.body.message).to.be.equal("User register successfully")
                        expect(res.body).to.have.all.keys("status", "message", "data")
                        done()
                    } catch (error) {
                        done(error)
                    }
                }
            })
    })

})


describe("sub admin test case",()=>{
    it("delete subadmin test case successfull",(done)=>{
        console.log("888888888888888888888888888888888888")

      
        //  let  subadmin = {
        //     "id":"67c04692645fcc70247ba535"
        //  }
         chai
         .request(server)
         .delete("/admin/deleteSubadminById/67c04692645fcc70247ba535")
         .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11c2thbnZlcm1hOTk3NjVAZ21haWwuY29tIiwiaWQiOiI2N2I0NzdjOWRlMjRhYzZiYjljZDQ3NGMiLCJhZG1pbnJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzQxMjQ0NjI3LCJleHAiOjE3NDEyNTE4Mjd9.mQJMUw4-sQxKfY7Ztil4EuVuiTdBJqrBMzX58Ln2M2k")
        //  .delete("/admin/deleteSubadminById")
         .end((err,res)=>{
              if(err){
                console.log("usju")
                return done(err)
              }else{
                try{
                    expect(res.body.status).to.be.equal(200)
                    expect(res.body.message).to.be.equal("delete  subadmin data successfully")
                    done()
                }catch(error){
                  done(error)
                }
              }
         })
    })

    // it("update subadmin test case successfull",(done)=>{
        
    //      let  subadmin = {
    //         "id": "67befd9e6bd3774951875992",
    //         "number" :1234456678
    //      }
    //      chai
    //      .request(server)
    //      .put("/admin/updateSubadminById")
   
    //      .send(subadmin)
    //      .end((err,res)=>{
    //           if(err){
    //             return done(err)
    //           }else{
    //             try{
    //                 expect(res.body.status).to.be.equal(200)
    //                 expect(res.body.message).to.be.equal("update subadmin data successfully")
    //                 done()
    //             }catch(error){
    //               done(error)
    //             }
    //           }
    //      })
    // })

})







