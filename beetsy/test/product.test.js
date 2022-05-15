process.env.NODE_ENV = 'test'

const chai = require('chai')
const expect = chai.expect
const should = chai.should();
const chaiHttp = require("chai-http")
const server = require("../index")



chai.use(chaiHttp);

describe("/Connection to Server",()=>{
    it('Make connection to API',(done)=>{
        chai.request(server)
        .get('/makeconnection')
        .end((err,res)=>{
            res.should.have.status(200)
            done();
        })
    })
    it('Login should have the User registered', (done) => {
        chai.request(server)
        .post('/login')
        .send({
            email: "tu3@gmail.com",
            password: "tu"
         })
        .end((err, res) => {
          comment = res.body
          expect(res.status).to.eq(200);
          expect(res.body.message).to.be.eq('User Login Successful')
          done()
        })
      })

        // it('Make connection to API',(done)=>{
        //     chai.request(server)
        //     .get('/makeconnection')
        //     .end((err,res)=>{
        //         res.should.have.status(200)
        //         done();
        //     })
        // })
        it('Shop Name should be unique', (done) => {
            chai.request(server)
            .get('/checkshopname')
            .send({
                "shopname" : "NewwName"
             })
            .end((err, res) => {
              comment = res.body
              expect(res.status).to.eq(200)
              done();
            })
          })

          it('Fetching items not in db should return empty value', (done) => {
            chai.request(server)
            .post('/fetchItem')
            .send({
                "itemid" : "8977"
             })
            .end((err, res) => {
              comment = res.body
              expect(res.status).to.eq(200)
              done();
            })
        })

        it('Getting Shop Image', (done) => {
            chai.request(server)
            .get('/getShopImage')
            .send({
                "shopname" : "Toy Shop",
             })
            .end((err, res) => {
            //console.log(err)
              comment = res.body
              expect(res.status).to.eq(200)
              done();
            })
        })

})