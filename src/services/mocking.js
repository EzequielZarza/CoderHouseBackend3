import {faker} from "@faker-js/faker"; 
import { createHash } from "../utils/index.js";

class MockingService {

    static async generateMockingUsers(amount){
        const users = [];
        for (let i = 0; i < amount; i++) {
            const  firstName = faker.person.firstName();
            const lastName= faker.person.lastName();
            const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${faker.helpers.arrayElement(['hotmail','gmail','outlook','yahoo'])}.com`

            users.push({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: await createHash('coder123'),
                role: faker.helpers.arrayElement(['user','admin']),
                pets: []
            })
        }
        return users; 

    }

    static async generateMockingPets(amount){
        const pets = [];
        const dogBreed = ['Kombai', 'African', 'Eskimo', 'rottweiler', 'Beagle', 'Husky', 'Bluetick', 'Boxer', 'Pitbull'];
        const catBreed = ['NorthenCat','Orange', 'Tuxedo', 'Blackcat', 'burrito', 'calico', 'caracal', 'Norwegian'];

        const getDogPicture = async breed => {
            const dog = await fetch(`https://dog.ceo/api/breed/${breed.toLowerCase()}/images/random`);
            const { message } = await dog.json()
            return message
        }

        const getCatPicture = breed => `https://cataas.com/cat/${breed}`;

        for (let i = 0; i < amount; i++) {
            const specie = faker.helpers.arrayElement(['Dog','Cat']);
            const breed = specie === 'Dog' ? faker.helpers.arrayElement(dogBreed) : faker.helpers.arrayElement(catBreed);
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