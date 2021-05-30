export class URLMetadata {
    URL: string;
    MethodName: string;
    Params: any;
}

export class CityListMetaData {
    CityId: number;
    CityName: string;
    StateId: number;
}

export class StateListMetaData {
    StateId: number;
    StateName: string;
    CountryId: number;
}

export class CountryListMetaData {
    CountryId: number;
    CountryName: string;
}

export class SubscriberDetailMetaData {
    SubscriberUserId: number;
    UserName: string;
    Password: string;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    SubscriberId: number;
}