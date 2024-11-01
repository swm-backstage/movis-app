import { unixToLocalDateTime } from "./unixToDate";
import { BillType } from '../constants/billType'

function parseNotification(notification: any) {
    const billType = notification.title.includes('입금') ? BillType.DEPOSIT : BillType.WITHDRAW

    // title에서 금액과 거래 유형 추출
    const title = notification.title;
    const match = title.match(/(\d{1,3}(?:,\d{3})*)원/);
    const cash = match ? match[1].replace(/,/g, '') : null; // 쉼표 제거
    const time = unixToLocalDateTime(notification.time)
    const bigText: string = notification.bigText;

    if (billType === BillType.DEPOSIT) {


        const name = bigText.toString().split(' ')[0];
        const accountNumberMatch = bigText.match(/\((\d+)\)$/);
        const accountNumber = accountNumberMatch ? accountNumberMatch[1] : '';

        console.log("deposit: ", name, accountNumber, cash, time)
        return {
            name,
            accountNumber,
            cash,
            time,
            billType
        };
    }
    else {
        console.log(bigText)
        const name = bigText.toString().split(' ').pop();
        const accountNumberMatch = bigText.match(/\d+/);
        const accountNumber = accountNumberMatch ? accountNumberMatch[0] : '';


        console.log("witdraw: ", name, accountNumber, cash, time)
        return {
            name,
            accountNumber,
            cash,
            time,
            billType
        };
    }
}

export { parseNotification };