export class TipData {
    totalUsages: number[];
    regionUsages: number[];

    constructor (totalUsages: number[], regionUsages: number[]) {
        this.totalUsages = totalUsages;
        this.regionUsages = regionUsages;
    }
}