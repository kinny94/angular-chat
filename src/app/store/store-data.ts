import { Thread } from './../../../shared/model/thread';
import { Participant } from "shared/model/participant";
import { Message } from "./../../../shared/model/Message";

export interface StoreData{
	participant: { [key: number]: Participant },
	messages: {[ key: number ]: Message },
	threads: { [key: number]: Thread }
}

export const INITIAL_STORE_DATA: StoreData = {
	participant: {},
	messages: {},
	threads: {},
}
