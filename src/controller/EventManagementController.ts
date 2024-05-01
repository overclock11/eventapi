import {EventManagementPersistence} from "../persistence/EventManagementPersistence";
import {QueryResult} from "mysql2";
import {Event} from "../model/Event";
import {UserEvent} from "../model/UserEvent";
import {validateXlsx} from "../utils/ValidateXlsx";

export class EventManagementController {
    private eventManagement: EventManagementPersistence;
    constructor() {
        this.eventManagement = new EventManagementPersistence();
    }
    async getEvents (): Promise<QueryResult> {
        return await this.eventManagement.getEvents();
    }

    async getEvent(eventId: string) {
        return await this.eventManagement.getEvent(eventId);
    }

    async createEvent(event: Omit<Event, "id">): Promise<void> {
        await this.eventManagement.createEvent(event);
    }

    async updateEvent(eventId: string, event: Omit<Event, "id">): Promise<QueryResult> {
        return await this.eventManagement.updateEvent(eventId, event);
    }

    async registerUsersForAnEvent (userEvent: UserEvent[]) {
        return await this.eventManagement.registerUsersForAnEvent(userEvent);
    }

    async importEvents (file: Express.Multer.File) {
        const data = await validateXlsx(file);
        const result = await this.eventManagement.importFromXlsx(data);
        return result;
    }

}