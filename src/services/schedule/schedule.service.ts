import { getRepository } from "typeorm";
import { Booking } from "../../entity/Booking";
import { Schedule } from "../../entity/Schedule";
import { User } from "../../entity/User";


export const addSchedule = async (newSchedule: any): Promise<void> => {
    try {
        const scheduleRepository = getRepository(Schedule);

        const scheduleToSave = new Schedule();
        const user = new User();
        user.id = newSchedule.userId;

        scheduleToSave.day = newSchedule.day;
        scheduleToSave.hourFrom = newSchedule.hourFrom;
        scheduleToSave.hourTo = newSchedule.hourTo;
        scheduleToSave.dayFrom = newSchedule.dayFrom;
        scheduleToSave.dayTo = newSchedule.dayTo;
        scheduleToSave.user = user;
        
        const createdSchedule = await scheduleRepository.save(scheduleToSave);

        if (createdSchedule) {
            
        } else {
            return Promise.reject(null);
        }
    } catch (error) {
        throw error;
    }
}

export const deleteSchedule = async (scheduleId: number) => {
    try {
        const scheduleRepository = getRepository(Schedule);
        const deletedSchedule =  (await scheduleRepository.delete(scheduleId)).affected;
        if (deletedSchedule == 0) return Promise.reject(new Error("Schedule Not Found"));
        return Promise.resolve(true);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const fetchSchedules = async (userId?: number) => {
    try {
        const scheduleRepository = getRepository(Schedule);
        if (userId) Promise.resolve(await scheduleRepository.find({user:{id: userId}}));
        return Promise.resolve(await scheduleRepository.find());
    } catch (error) {
        return Promise.reject(error);
    }
}

export const bookSchedule = async (patientId: number, scheduleId: number) => {
    try {
        const scheduleRepository = getRepository(Schedule);
        const userRepository = getRepository(User);
        const bookingRepository = getRepository(Booking);

        const scheduleToBook = await scheduleRepository.findOne(scheduleId);
        if (!scheduleToBook) throw new Error("Schedule is not found");

        const patient = await userRepository.findOne(patientId);
        if (!patient) throw new Error("Patient is not found");

        const booking = new Booking();
        booking.schedule = scheduleToBook;
        booking.user = patient;
        await bookingRepository.save(booking);
        
        scheduleToBook.isBooked = true;
        await scheduleRepository.save(scheduleToBook);
        return Promise.resolve(true);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getSchedule = async (scheduleId: number) => {
    try {
        const scheduleRepository = getRepository(Schedule);
        return Promise.resolve(await scheduleRepository.findOne({
            where: {
                id: scheduleId
            }
        }));
    } catch (error) {
        return Promise.reject(error);
    }
}
