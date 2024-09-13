import { v4 as uuidv4 } from 'uuid';

export default class Sub {
    constructor(email) {
        this.subID = uuidv4();
        this.email = email;
    }

    updateSub(data) {
        for (let key in data) {
            if (this.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        }
        this.updatedAt = new Date();
    }
}