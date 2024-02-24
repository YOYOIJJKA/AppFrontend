export interface Product {
    id:number,
    name:string,
    storageId:string,
    number:number,
    employeeId:number,
    clientId?:number,
    dateRecieved:string,
    dateExpired?:string
}
