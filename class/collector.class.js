export default class Collector {
    constructor (address, username, picture, bio, websites, socials) {
        this.address = address;
        this.username = username;
        this.picture = picture;
        this.bio = bio;
        this.websites = websites;
        this.socials = socials;
        this.updatedAt = new Date();  // Automatically set/update timestamp
    }

    updateCollector(data) {
        for (let key in data) {
            if (this.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        }
        this.updatedAt = new Date();
    }
}
