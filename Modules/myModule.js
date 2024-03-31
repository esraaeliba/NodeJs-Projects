class Tickets{
    #ticketInfo=[];
    
    AddTicketInfo(seatNum, flightNum, departureAirports, arrivalAirports, travellingDate){
        let newItem = {
            seatNum,
            flightNum,
            departureAirports,
            arrivalAirports,
            travellingDate
        };
        this.#ticketInfo.push(newItem);
    }

    
    GetTicketInfo(){
           return this.#ticketInfo;
    }

    UpdateInfo(seatNum, newInfo) {
        const index = this.#ticketInfo.findIndex((ticket)=>ticket.seatNum == seatNum);
        if (index !== -1){
           this.#ticketInfo[index] = Object.assign({},this.#ticketInfo[index],newInfo); 
        }
    }

}
module.exports = {Tickets};