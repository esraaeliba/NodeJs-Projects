const myMod = require('./Modules/myModule');

let Ticket = myMod.Tickets; 

let Ticket1 = new Ticket();
let Ticket2 = new Ticket();

Ticket1.AddTicketInfo(1, 2, "Dubai", "Egypt", "03/12/2024");
Ticket2.AddTicketInfo(2, 5, "Dubai", "Paris", "03/12/2024");

// console.log(Ticket1.GetTicketInfo());
// console.log(Ticket2.GetTicketInfo());

console.log('Updating Ticket Info:');
Ticket2.UpdateInfo(2,{departureAirports:'Egypt'}
);

console.log(Ticket2.GetTicketInfo());