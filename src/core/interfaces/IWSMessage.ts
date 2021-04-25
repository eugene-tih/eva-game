export interface IWSMessage {
    service: string;
    action: string;
    data: Record<string, string>;
}


// {
//     "service" : "chat",
//     "action" : "join",
//     "data" : {
//         "room" : "room1234"
//     }
// }
