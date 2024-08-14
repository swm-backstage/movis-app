import { RNAndroidNotificationListenerHeadlessJsName } from 'react-native-android-notification-listener'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppRegistry, AppState } from 'react-native';
import { parseNotification } from './parsingNotification'
import { FeeCreateReq } from '../types/alert/request/FeeCreateReq'
import { createFee, getClubUid } from '../api/alert';
import { BillType } from '../constants/billType';
import Toast from 'react-native-toast-message';

// 전역 상태로 앱이 포그라운드에 있는지 추적
let isAppInForeground = true;

AppState.addEventListener('change', (nextAppState) => {
    isAppInForeground = nextAppState === 'active';
});

const headlessNotificationListener = async ({ notification }: any) => {
    console.log("AppState: "+isAppInForeground)
    if (notification) {
        const noti = JSON.parse(notification);
        console.log(noti)
        if (noti.title !== "" && noti.bigText !== '') {
            
            const { name, accountNumber, cash, time, billType } = parseNotification(noti);
            try{
                const clubUid =await getClubUid(accountNumber)
                const data: FeeCreateReq = {
                    name: name,
                    clubUid: clubUid.clubId,
                    cash: cash,
                    billType: billType,
                    createdAt: time,
                }
                
                console.log({ data })
    
                try {
                    // createFee API 호출
                    await createFee(data);
                    console.log('Fee creation successful');

                    // 입금 및 출금 개수를 AsyncStorage에 업데이트
                    if (data.billType === BillType.DEPOSIT) {
                        const depositCount = parseInt(await AsyncStorage.getItem('@depositCount') || '0', 10) + 1;
                        await AsyncStorage.setItem('@depositCount', (depositCount).toString());
                    } else if (billType === BillType.WITHDRAW) {
                        const withdrawCount = parseInt(await AsyncStorage.getItem('@withdrawCount') || '0', 10) + 1;
                        await AsyncStorage.setItem('@withdrawCount', (withdrawCount).toString());
                    }
                    
                    // 마지막 알림을 AsyncStorage에 저장
                    await AsyncStorage.setItem('@lastNotification', notification);
                    // 앱이 포그라운드 상태일 때만 토스트 알림 표시
                    if (isAppInForeground) {
                        console.log("toast success")
                        Toast.show({
                            type: 'success',
                            text1: `거래내역 ${billType === BillType.DEPOSIT ? '입금' : '출금'} 발생`,
                            text2: `${cash}원이 ${accountNumber} 모임통장에 ${billType === BillType.DEPOSIT ? '입금' : '출금'}되었습니다.`,
                            position: 'bottom',
                        });
                    }


                } catch (error:any) {
                    console.error('Error creating fee:', error.response?.data);
                }
            }
            catch(error:any){
                console.error('Error find clubUid:', error.response?.data);
            }
            
        }


    }
}

/**
 * AppRegistry should be required early in the require sequence
 * to make sure the JS execution environment is setup before other
 * modules are required.
 */
AppRegistry.registerHeadlessTask(
    RNAndroidNotificationListenerHeadlessJsName,
    () => headlessNotificationListener
)



/**
     * This notification is a JSON string in the follow format:
     *  {
     *      "app": string,
     *      "title": string,
     *      "titleBig": string,
     *      "text": string,
     *      "subText": string,
     *      "summaryText": string,
     *      "bigText": string,
     *      "audioContentsURI": string,
     *      "imageBackgroundURI": string,
     *      "extraInfoText": string,
     *      "groupedMessages": Array<Object> [
     *          {
     *              "title": string,
     *              "text": string
     *          }
     *      ]
     *  }
     */
    /** 알림 형식 */
    /** {
     *      "app": "viva.republica.toss", 
     *      "audioContentsURI": "", 
     *      "bigText": "안희찬 → 내 모임통장 (5325)", 
     *      "extraInfoText": "", 
     *      "imageBackgroundURI": "", 
     *      "subText": "토스뱅크", 
     *      "summaryText": "", 
     *      "text": "안희찬 → 내 모임통장 (5325)", 
     *      "time": "1723137454965", 
     *      "title": "2원 입금", 
     *      "titleBig": ""
     * }
     * */

    //ac1f83f8-c0cd-48d2-9d1c-88e17a06526b