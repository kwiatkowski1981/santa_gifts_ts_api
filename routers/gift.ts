import {Router} from "express";
import {GiftRecord} from "../records/gift.record";

export const giftRouter = Router();

giftRouter
    .get('/', async (req, res) => {

        const giftsList = await GiftRecord.listAll();

        res
            .status(200)
            .render('gift/list', {
            giftsList,
        });
    })

    .post('/', async (req, res) => {
        const data = {
            ...req.body,    // kopiowanie obiektu
            count: Number(req.body.count),  // zmiana String na typ Number
        }
        const newGift = new GiftRecord(data);
        await newGift.insert();
        console.log('added new gift record');

        res.redirect('/gift');


    });
