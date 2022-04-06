import {GiftEntity} from "./gift.entity";

export type CreateGiftReq = Pick<GiftEntity, 'name' | 'count'>;

export interface GetSingleGiftRes {
    gift: GiftEntity;
    givenCount: number;
}