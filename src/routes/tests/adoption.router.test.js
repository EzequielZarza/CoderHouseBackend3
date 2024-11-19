import supertest from 'supertest';
import chai from 'chai';
import mongoose from 'mongoose';

const expect = chai.expect;

const requester = supertest('http://localhost:8080');

describe('AdoptMe Testing', () => {
  describe('Adoption router testing', () => {
    let userMock = {};
    let petMock = {};
    let adoptionTestId = '';

    before( async () => {
       const {statusCode, ok, _body } = await requester.post(`/api/mocks/generateData`).send({
        "users": 1,
        "pets": 1
      });

    const userData = await requester.get('/api/users')
    const petData = await requester.get('/api/pets')
    userMock = JSON.parse(await userData.res.text).payload[0]
    petMock = JSON.parse(await petData.res.text).payload[0]
    })

    it('Enpoint POST /api/:uid/:pid creates a new adoption successfully', async () => {
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

    it('Enpoint GET / gets all adoptions successfully, after POST has been done', async () => {

      const {statusCode, ok, _body } = await requester.get(`/api/adoptions/`);

      expect(statusCode).to.equal(200);
      expect(ok).to.be.true;
      expect(_body).to.have.property('status').to.equal('success');
      expect(_body).to.have.property('payload');
      expect(Array.isArray(_body.payload)).to.be.true;

      console.log(_body.payload);

      adoptionTestId = _body.payload[0]._id;
    });

    it('Enpoint GET /:aid gets all specific successfully, after GET / has been done', async () => {

      const {statusCode, ok, _body } = await requester.get(`/api/adoptions/${adoptionTestId}`);

      expect(statusCode).to.equal(200);
      expect(ok).to.be.true;
      expect(_body).to.have.property('status').to.equal('success');
      expect(_body).to.have.property('payload');
      expect(_body.payload).to.have.property('_id').to.equal(adoptionTestId);
      // expect(_body.payload).to.have.property('owner').to.equal(userMock._id);
      // expect(_body.payload).to.have.property('pet').to.equal(petMock._id);

    });


    after(async () => {
      const { message } = await requester.delete(`/api/users/${userMock._id}`);
      console.log(message);
      await requester.delete(`/api/pets/${petMock._id}`);
      await mongoose.disconnect()
    });
  })
})