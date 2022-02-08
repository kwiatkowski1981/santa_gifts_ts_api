import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";
import {ChildEntity} from "../interfaces/ChildEntity";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";


type ChildRecordResults = [ChildRecord[], FieldPacket[]];

export class ChildRecord implements ChildEntity {
    public id?: string;
    public name: string;
    public giftId: string;

    // Można by było zamiast tworzenia interface podać jako typ nazwę klasy ChildRecord,
    // która ma w sobie w sumie tylko te 3 rzeczy (id, name, giftId)
    constructor(obj: ChildEntity) {
        if (!obj.name || obj.name.length < 3 || obj.name.length > 25) {
            throw new ValidationError('Imię dziecka musi mieć między 3 a 25 znaków!');
        }
        this.id = obj.id;
        this.name = obj.name;
        this.giftId = obj.giftId;
    }

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        }
        await pool.execute("INSERT INTO children(id, name) VALUES(:id, :name)", {
            id: this.id,
            name: this.name,
        });
        return this.id;
    }

    static async listAll(): Promise<ChildRecord[]> {
        const [results] =
            (await pool.execute("SELECT * FROM `children` ORDER BY `name` ASC")) as ChildRecordResults;

        return results.map(obj => new ChildRecord(obj));
    }

    static async getOne(id: string): Promise<ChildRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `children` WHERE `id` = :id", {
            id,
        }) as ChildRecordResults;
        // jeśli długość rezultatu zapytania jest zero to zwracam null a jak nie to pierwsze z tablicy rezultatów
        // pierwsze bo zapytanie zwraca wszystko* w postaci tablicy.
        return results.length === 0? null: new ChildRecord(results[0]);
    }

    async update(): Promise<void> {
        await pool.execute("UPDATE children SET name = :name, giftId = :giftId WHERE id = :id", {
            id: this.id,
            name: this.name,
            giftId: this.giftId,
        });
    }

}
