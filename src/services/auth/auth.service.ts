import { IUser } from "../../api/types/user.type";
import { User } from "../../entity/User";
import { getRepository } from "typeorm";
import * as bcrypt from "bcrypt";


export const saveUser = async (newUser: IUser): Promise<User> => {
    try {
        const userRepository = getRepository(User);

        const userToSave = new User();
        userToSave.email = newUser.email;
        userToSave.firstName = newUser.firstName;
        userToSave.password = await bcrypt.hash(newUser.password, 10);
        
        const createdUser = await userRepository.save(userToSave);

        if (createdUser) {
            return Promise.resolve(createdUser);
        } else {
            return Promise.reject(null);
        }
    } catch (error) {
        throw error;
    }
}