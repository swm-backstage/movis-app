import axiosHost from "./axios";

const sendSms = async (phoneNumber: string): Promise<void> => {
    const { data } = await axiosHost.post('/api/v1/invitations/verify/request',
        { phoneNumber }
    );

    return data;
};

const verifySmsCode = async (phoneNumber: string, verifyCode: string): Promise<boolean> => {
    const { data } = await axiosHost.post('/api/v1/invitations/verify/check', {
        phoneNumber: phoneNumber,
        verifyCode: verifyCode
    })
    return data
};

export { sendSms, verifySmsCode };