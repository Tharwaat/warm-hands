import { IUser } from "../../api/types/user.type";
import { User } from "../../entity/User";
import { getRepository } from "typeorm";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";


export const updateUser = async (newUser: IUser): Promise<User> => {
    try {
        const userRepository = getRepository(User);

        const userToSave = new User();
        userToSave.email = newUser.email;
        userToSave.firstName = newUser.firstName;
        userToSave.lastName = newUser.lastName;
        userToSave.type = newUser.type;
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

export const activateUser = async (userId: number): Promise<boolean> => {
    try {
        const userRepository = getRepository(User);

        const userToUpdate = await userRepository.findOne({
            id: userId,
        });
        
        if (userToUpdate) {
            userToUpdate.isActive = true;
            await userRepository.save(userToUpdate);
            return Promise.resolve(true);
        }
        return Promise.reject(false);
    } catch (error) {
        throw error;
    }
}

export const fetchAllUsers = async (type?: string): Promise<User[]> => {
    try {
        const userRepository = getRepository(User);
        if (type && type !== "all") return Promise.resolve(await userRepository.find({type}));
        return Promise.resolve(await userRepository.find());
    } catch (error) {
        throw error;
    }
}

export const getUser = async (id: number): Promise<User[]> => {
    try {
        const userRepository = getRepository(User);
        return Promise.resolve(await userRepository.find({id}));
    } catch (error) {
        throw error;
    }
}