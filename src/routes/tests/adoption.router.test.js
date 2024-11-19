import supertest from 'supertest';
import chai from 'chai';

const expect = chai.expect;

const requester = supertest('http://localhost:8080');

describe('AdoptMe Testing', () => {
  describe('Adoption router testing', () => {
    let userMock = {};
    let petMock = {};
    let adoptionTestId = '';

    before( async () => {
       await requester.post(`/api/mocks/generateData`).send({
        "users": 1,
        "pets": 1
      });

    const userData = await requester.get('/api/users')
    const petData = await requester.get('/api/pets')
    userMock = JSON.parse(await userData.res.text).payload[0]
    petMock = JSON.parse(await petData.res.text).payload[0]
    })

    describe('Endpoind POST /api/:uid/:pid', async () => {
      it('fails when user is not in database', async () => {
        const adoptionMock = {
          owner: "673beb9dc53dcb2d396a0000",
          pet: petMock._id
        }
  
        const {statusCode, ok, _body } = await requester.post(`/api/adoptions/${adoptionMock.owner}/${petMock._id}`).send(adoptionMock);
  
        expect(statusCode).to.equal(404);
        expect(ok).to.be.false;
        expect(_body).to.have.property('status').to.equal('error');
        expect(_body).to.have.property('error').to.equal('user Not found');
  
      });
  
      it('fails when pet is not in database', async () => {
        const adoptionMock = {
          owner: userMock._id,
          pet: "673beb9dc53dcb2d396a0000"
        }
  
        const {statusCode, ok, _body } = await requester.post(`/api/adoptions/${adoptionMock.owner}/${adoptionMock.pet}`).send(adoptionMock);
  
        expect(statusCode).to.equal(404);
        expect(ok).to.be.false;
        expect(_body).to.have.property('status').to.equal('error');
        expect(_body).to.have.property('error').to.equal('Pet not found');
  
      });
  
      it('creates a new adoption successfully', async () => {
        const adoptionMock = {
          owner: userMock._id,
          pet: petMock._id
        }
  
        const {statusCode, ok, _body } = await requester.post(`/api/adoptions/${userMock._id}/${petMock._id}`).send(adoptionMock);
  
        expect(statusCode).to.equal(200);
        expect(ok).to.be.true;
        expect(_body).to.have.property('status').to.equal('success');
        expect(_body).to.have.property('message').to.equal('Pet adopted');
      });
  
    })
    
    describe('Endpoint GET /', async () => {
      it('gets all adoptions successfully, after POST has been done', async () => {

        const {statusCode, ok, _body } = await requester.get(`/api/adoptions/`);
  
        expect(statusCode).to.equal(200);
        expect(ok).to.be.true;
        expect(_body).to.have.property('status').to.equal('success');
        expect(_body).to.have.property('payload');
        expect(Array.isArray(_body.payload)).to.be.true;
    
        adoptionTestId = _body.payload[0]._id;
      });
    });

    describe('Endpoint GET /:aid', async () => {
      it('Enpoint GET /:aid gets specific adoption successfully, after GET / has been done', async () => {

        const {statusCode, ok, _body } = await requester.get(`/api/adoptions/${adoptionTestId}`);
  
        expect(statusCode).to.equal(200);
        expect(ok).to.be.true;
        expect(_body).to.have.property('status').to.equal('success');
        expect(_body).to.have.property('payload');
        expect(_body.payload).to.have.property('_id').to.equal(adoptionTestId);
        expect(_body.payload).to.have.property('owner').to.equal(userMock._id);
        expect(_body.payload).to.have.property('pet').to.equal(petMock._id);
  
      });
  
      it('Enpoint GET /:aid fails when adoption is not in database', async () => {
        const unexistingAdoptionId = "673beb9dc53dcb2d396a0000"
  
        const {statusCode, ok, _body } = await requester.get(`/api/adoptions/${unexistingAdoptionId}`);
  
        expect(statusCode).to.equal(404);
        expect(ok).to.be.false;
        expect(_body).to.have.property('status').to.equal('error');
        expect(_body).to.have.property('error');
        expect(_body).to.have.property('error').to.equal('Adoption not found');
  
      });
    })
    
    after(async () => {
      await requester.delete(`/api/pets/${petMock._id}`);
      await requester.delete(`/api/users/${userMock._id}`);
      await requester.delete(`/api/adoptions/${adoptionTestId}`);
    });
  })
})