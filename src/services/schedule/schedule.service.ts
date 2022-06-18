import { getRepository } from "typeorm";
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