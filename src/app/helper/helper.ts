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
}