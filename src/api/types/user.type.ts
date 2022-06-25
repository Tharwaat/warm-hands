interface IUser {
    id?: number;
    firstName?: string;
    lastName?: string;
    gender?: string;
    avatar?: string;
    phoneNumber?: string;
    birthDate?: string;
    email?: string;
    password?: string;
    type?: string;
    fees?: number,
    country?: string,
    experience?: string,
    age?: number,
}

export {
    IUser,
}