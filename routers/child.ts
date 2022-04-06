import {Router} from "express";
import {ChildRecord} from "../records/child.record";
import {GiftRecord} from "../records/gift.record";
import {ValidationError} from "../utils/errors";

export const childRouter = Router();

childRouter
    .get('/', async (req, res) => {

        const childrenList = await ChildRecord.listAll();
        const giftsList = await GiftRecord.listAll();

        res
            .status(200)
            .json({
                childrenList,
                giftsList,
            });
    })
    .post('/', async (req, res) => {
        const newChild = new ChildRecord(req.body);
        await newChild.insert();
        res.redirect('/child');
    })
    .patch('/gift/:childId', async (req, res) => {
        const child = await ChildRecord.getOne(req.params.childId);
        if (child === null) {
            throw new ValidationError('Nie znaleziono dziecka z podanym ID!');
        }
        const gift = req.body.giftId === '' ? null : await GiftRecord.getOne(req.body.giftId);

        if (gift) {
            if (gift.count <= await gift.countGivenGifts()) {
                throw new ValidationError('Tego prezentu jest już za mało!');
            }
        }
        // child.giftId = gift === null ? null : gift.id;
        child.giftId = gift?.id ?? null;    // to samo na linijka wyżej ale w nowym zapisie!
        await child.update();
        // console.log(`Dodano (${gift.name === null || undefined ? 'Brak' : gift.name}) dla (${child.name}).`);
        // console z gory nie jeździ!
        res.redirect('/child');
    });

module.exports = {
    childRouter,
}