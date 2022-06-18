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

