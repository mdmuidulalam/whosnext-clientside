export class Helper {
    static isValidDate(day: number, month: number, year: number) {
        var daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if(month == 2 && ((year % 4 == 0 && year % 100 != 0 )|| year % 400 == 0)) {
            daysInMonth[2]++;
        }

        if(day > daysInMonth[month]) {
            return false;
        }
        else {
            return true;
        }
    }

    static queryStringBuilder(parameters: any){
        var queryString: string = "?";
        
        const objectKeys = Object.keys(parameters) as Array<keyof any>;

        for(var i =0 ; i < objectKeys.length ; i++ )
        {
            if(i != 0)
            {
                queryString += "&";
            }
            queryString += objectKeys[i].toString() + "=" + parameters[objectKeys[i]]; 
        }
        return queryString;
    }
    
    static convertDateInCurrentTimeZone(date: any){
        date = new Date(date);
        date.setHours(date.getHours() - new Date().getTimezoneOffset()/60);
        return date;
    }
}