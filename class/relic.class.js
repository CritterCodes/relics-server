import { v4 as uuidv4 } from 'uuid';

export default class Relic {
  constructor({ name, imageUrl, material, dimensions, weight, centerStone, accentStones, hallmark, designer, appraisalValue }) {
    this.relicID = `relic-${uuidv4().slice(0, 8)}`;  // Generate a unique ID for each Relic
    this.name = name;
    this.imageUrl = imageUrl;
    this.material = material;
    this.dimensions = dimensions;
    this.weight = weight;
    this.centerStone = centerStone;
    this.accentStones = accentStones;
    this.hallmark = hallmark;
    this.designer = designer;
    this.appraisalValue = appraisalValue;
    this.status = 'not-minted';
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // Method to update the relic's data
  updateRelic(data) {
    for (let key in data) {
      if (this.hasOwnProperty(key)) {
        this[key] = data[key];
      }
    }
    this.updatedAt = new Date();
  }
};
