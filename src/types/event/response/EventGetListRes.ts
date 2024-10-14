import { EventGetRes } from "./EventGetRes";

type EventGetListRes = {
    eventList: EventGetRes[];
    isLast: boolean;
}

export type { EventGetListRes };