export class WaterUsageDataListDto {
    data: WaterUsageDataDto[];

    constructor(data: WaterUsageDataDto[]) {
        this.data = data;
    }
}

export class WaterUsageDataDto {
	id: number;
    houseId: number;
    timestamp: number;
    datetime: Date;
    totalConsumption: number;
    mainSensor: number;
    showerSensor: number;
    irrigationSensor: number;

    constructor(id: number, houseId: number, timestamp: number, datetime: Date, totalConsumption: number, mainSensor: number, showerSensor: number, irrigationSensor: number) {
        this.id = id;
        this.houseId = houseId;
        this.timestamp = timestamp;
        this.datetime = datetime;
        this.totalConsumption = totalConsumption;
        this.mainSensor = mainSensor;
        this.showerSensor = showerSensor;
        this.irrigationSensor = irrigationSensor;
    }
}