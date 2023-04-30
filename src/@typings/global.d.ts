interface Contact {
    "id": string;
    "firstName": string;
    "lastName": string;
    "email"?: string;
    "phone"?: string;
}

interface ContactDetailSection {
    title: string;
    data: {
        label: string;
        data: string;
        compulsory?: boolean;
    }[];
}

interface ContactDetail {
    label: string;
    data: string;
    compulsory?: boolean;
    title: string;
}
