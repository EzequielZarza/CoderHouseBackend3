import { petsService, usersService } from "../services/index.js";
import MockingService from "../services/mocking.js";

const getMockingPets = async (req, res) => {
    const pets = await MockingService.generateMockingPets(50); 
    res.send({status: "success", payload: pets}); 
}

const getMockingUsers = async (req, res) => {
  const users = await MockingService.generateMockingUsers(50); 
  res.send({status: "success", payload: users}); 
}

const generateData = async ({body: { users, pets }}, res) => {

  try{
    const mockedUsers = await MockingService.generateMockingUsers(users);
    const mockedPets = await MockingService.generateMockingPets(pets);

    await Promise.all(
      mockedUsers.map(async user => await usersService.create(user)),
      mockedPets.map(async pet => await petsService.create(pet))
    );

    res.status(200).send({
      status: 'Success',
      message: 'Data generated successfully'
    })

  }catch(error){
    console.log(error);
    res.status(500).send(`Couldn't generate data :/`)
  }
}

export default {
    getMockingPets,
    getMockingUsers,
    generateData
}