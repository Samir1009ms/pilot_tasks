export type ITableData = IData[]

export interface IData {
    id: number
    len: number
    wkt: string
    status: number
    geoType: string
}