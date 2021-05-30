export class AddEmployeeMetaData {
    EmployeeId: string;
    FirstName: string;
    LastName: string;
    Salary: number;
    Address1: string;
    Address2: string;
    CreatedDate ?:Date;
    ModifiedDate ?:Date;
}

export class BulkEmployeeDeleteMetaData {
    EmployeeId: string[];
}

export class DynamicEmployeeList {
    Count: number;
    EmployeeList: AddEmployeeMetaData[];
}