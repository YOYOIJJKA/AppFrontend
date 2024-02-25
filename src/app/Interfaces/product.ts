export interface Product {
    id:number,
    name:string,
    storageId:string,
    number:number,
    employeeId:string,
    clientId?:string,
    dateRecieved:string,
    dateExpired?:string
}
