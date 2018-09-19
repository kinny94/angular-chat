import { Thread } from './../../../shared/model/thread';
import { Participant } from "shared/model/participant";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";

export interface StoreData{
	participant: { [key: number]: Participant },
	threads: { [key: number]: Thread },
	messages: {[ key: number ]: Message }
}
