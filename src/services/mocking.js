import {faker} from "@faker-js/faker"; 
import { createHash } from "../utils/index.js";
import { MAIL_SERVER, ENTITILEMENT, DOG_BREED, CAT_BREED} from './constants.js'

class MockingService {

    static async generateMockingUsers(amount){
        const users = [];
        for (let i = 0; i < amount; i++) {
            const  firstName = faker.person.firstName();
            const lastName= faker.person.lastName();
            const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${faker.helpers.arrayElement(MAIL_SERVER)}.com`

            users.push({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: await createHash('coder123'),
                role: faker.helpers.arrayElement(ENTITILEMENT),
                pets: []
            })
        }
        return users; 

    }

    static async generateMockingPets(amount){
        const pets = [];

        const getDogPicture = async breed => {
            const dog = await fetch(`https://dog.ceo/api/breed/${breed.toLowerCase()}/images/random`);
            const { message } = await dog.json()
            return message
        }

        const getCatPicture = breed => `https://cataas.com/cat/${breed}`;

        for (let i = 0; i < amount; i++) {
            const specie = faker.helpers.arrayElement(['Dog','Cat']);
            const breed = specie === 'Dog' ? faker.helpers.arrayElement(DOG_BREED) : faker.helpers.arrayElement(CAT_BREED);
            const picture = specie === 'Dog' ? await getDogPicture(breed) : getCatPicture(breed);

            pets.push({
                name: faker.helpers.arrayElement([faker.animal.dog(), faker.animal.cat()]),
                specie: specie,
                breed: breed,
                adopted: false,
                birthDate: faker.date.birthdate(),
                picture: picture
            })
        }
        return pets; 
    } 
}

export default MockingService; 