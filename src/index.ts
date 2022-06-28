import * as express from "express";
import * as bodyParser from "body-parser";
import * as userService from "./services/user/user.service";
import * as scheduleService from "./services/schedule/schedule.service";
import { createConnection } from "typeorm";
import { authRoutes } from "./api/auth/auth.routes";
import { userRoutes } from "./api/user/user.routes";
import { scheduleRoutes } from "./api/schedule/schedule.routes";
import { port } from "./config/config";
import { errors } from "celebrate";

async function initDB() {
    try {
        await createConnection();
        console.log("Connected To DB");
    } catch (error) {
        throw error;
    }

}

function startServer() {
    try {
        const app = express();
        const router = express.Router();

        router.use("/auth", authRoutes);
        router.use("/users", userRoutes);
        router.use("/schedule", scheduleRoutes);

        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(errors());
        app.use("/api", router);
        app.use(express.static("public"));

        app.set('view engine', 'ejs');

        app.get('/signup', (req, res) => {
            res.render('signup');
        });

        app.get('/signup/serviceprovider', (req, res) => {
            res.render('serviceprovider');
        });

        app.get('/signup/serviceprovider/daycare', (req, res) => {
            res.render('registerdaycare');
        });

        app.get('/signup/serviceprovider/caregiver', (req, res) => {
            res.render('registercaregiver');
        });

        app.get('/signup/registerp', (req, res) => {
            res.render('registerp');
        });

        app.get('/signup/registerv', (req, res) => {
            res.render('registerv');
        });

        app.get('/signin', (req, res) => {
            const isWrongCredentials = req.app.get("wrongCredentials");
            res.render('signin', { isWrongCredentials });
        });

        app.get('/signout', (req, res) => {
            req.app.set("user", null);
            res.redirect('/signin');
        });

        app.get('/patient/home', async (req, res) => {
            const user = req.app.get("user");
            if (!user) res.redirect('/signin');
            const caregivers = await userService.fetchAllUsers("caregiver");
            const daycares = await userService.fetchAllUsers("daycare");
            const volunteers = await userService.fetchAllUsers("volunteer");
            //console.log("CG: ", caregivers, " DC: ", daycares, " V: ", volunteers);
            res.render('patienthome', { caregivers, daycares, volunteers, user });
        });

        app.get('/user/home', async (req, res) => {
            const user = req.app.get("user");
            if (!user) {
                res.redirect('/signin');
            } else {
                const updatedUser = await userService.getUser(user.id);

                res.render('servicehome', { user: updatedUser[0] });
            }
        });

        app.get('/user/schedules', async (req, res) => {
            const user = req.app.get("user");
            if (!user) {
                res.redirect('/signin');
            } else {
                const relatedUser = await userService.getUser(Number(req.query.id));

                res.render('userschedule', { user: relatedUser[0] });
            }
        });

        app.get('/user/bookings', async (req, res) => {
            const user = req.app.get("user");
            if (!user) {
                res.redirect('/signin');
            } else {
                const relatedUser = await userService.getUser(user.id);
                let bookings = [];
                for (let i = 0; i < relatedUser[0].schedule.length; i++) {
                    const schedule = relatedUser[0].schedule[i];
                    if (schedule.isBooked) {
                        const patient = await scheduleService.getPatients(schedule.id);

                        bookings.push({schedule, patient: patient.user});
                    }
                }

                res.render('servicebooking', { user: relatedUser[0], bookings });
            }
        });

        app.get('/patient/bookings', async (req, res) => {
            const user = req.app.get("user");
            if (!user) {
                res.redirect('/signin');
            } else {
                const relatedUser = await userService.getUser(user.id);
                let bookings = [];
                for (let i = 0; i < relatedUser[0].booking.length; i++) {
                    const booking = relatedUser[0].booking[i];
                    const serviceProvider = await scheduleService.getScheduleWithUser(booking.schedule.id)
                    bookings.push(serviceProvider);
                }
                res.render('patientbooking', {user: relatedUser[0], bookings});
            }
        });

        app.get('/add/schedule', (req, res) => {
            const user = req.app.get("user");
            if (!user) {
                res.redirect('/signin');
            } else {
                if (user.type === 'volunteer' || user.type === 'daycare') {
                    res.render('schedule', { user });
                } else res.render('caregiverschedule', { user });
            }
        });

        app.get('/book/schedule/pay', async (req, res) => {
            const user = req.app.get("user");
            if (!user) res.redirect('/signin');
            const scheduleId = Number(req.query.id);
            const schedule = await scheduleService.getSchedule(scheduleId);
            res.render('payment', { schedule });
        });

        app.get('/book/schedule', async (req, res) => {
            const user = req.app.get("user");
            if (!user) res.redirect('/signin');
            const scheduleId = Number(req.query.id);
            await scheduleService.bookSchedule(user.id, scheduleId);
            res.redirect('/patient/home');
        });

        app.get('/delete/schedule', async (req, res) => {
            const user = req.app.get("user");
            if (!user) res.redirect('/signin');
            const scheduleId = Number(req.query.id);
            await scheduleService.deleteSchedule(scheduleId);
            res.redirect('/user/home');
        });

        app.get('/', async (req, res) => {
            res.render('home');
        });

        app.get('/aboutus', async (req, res) => {
            res.render('aboutus');
        });

        app.get('/contactus', async (req, res) => {
            res.render('contactus');
        });

        app.get('/faqs', async (req, res) => {
            res.render('faqs');
        });

        app.get('/services', async (req, res) => {
            res.render('services');
        });

        app.get('/admin', async (req, res) => {
            const patients = await userService.fetchAllUsers('patient');
            const volunteers = await userService.fetchAllUsers('volunteer');
            const caregivers = await userService.fetchAllUsers('caregiver');
            const daycares = await userService.fetchAllUsers('daycare');
            const counts = {
                patientsCount: patients.length,
                volunteersCount: volunteers.length,
                caregiversCount: caregivers.length,
                daycaresCount: daycares.length,
            }
            //
            let detailedBookings = [];
            const bookings = await scheduleService.getDetailedBookings();
            for (let i = 0; i < bookings.length; i++) {
                const schedule = await scheduleService.getScheduleWithUser(bookings[i].schedule.id);
                detailedBookings.push({
                    booking: bookings[i],
                    schedule
                })
                
            }
            const schedules = await scheduleService.getDetailedSchedules();
            res.render('admin', {counts, bookings: detailedBookings, schedules});
        });

        app.listen(port, () => {
            console.log("Server is running on port:", port);
        });
    } catch (error) {
        throw error;
    }
}

initDB().then(() => {
    startServer();
});