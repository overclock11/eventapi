import {EventManagementPersistence} from "../persistence/EventManagementPersistence";
import {QueryResult} from "mysql2";
import {Event} from "../model/Event";

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

}