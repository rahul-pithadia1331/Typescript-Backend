import otpGenerator from 'otp-generator';
import nodemailer from './../utils/index';

class Helper {
    isValidEmail(sEmail: string): boolean {
        const regeX = /[a-z0-9._%+-]+@[a-z0-9-]+[.]+[a-z]{2,5}$/;
        return !regeX.test(sEmail);
    }

    errorMessage(oError: any) {
        let aError = oError.message;
        aError = aError.split(': ').join(', ').split(', ');
        aError.shift();
        let sErrorMessage = '';
        for (let i = 1; i < aError.length; i = i + 2) {
            sErrorMessage += (sErrorMessage.length ? ', ' : '') + aError[i];
        }
        return sErrorMessage.trim();
    }

    sendAccessCode = async (sEmail: string) => {
     
            const nOtp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
                digits: true,
            });

            const nOtpExpire = Date.now() + 36000000;

            

            await nodemailer.send(
                'forgot_password.html',
                {
                    SITE_NAME: `${process.env.SITE_NAME}`,
                    sUserName: sEmail,
                    nOTP: nOtp,
                },
                {
                    from: `${process.env.PLATFORM_NAME} ${process.env.SMTP_USERNAME}` as string,
                    to: sEmail,
                    subject: 'Access Code for Reset Password',
                }
            );
           
            return { nOtp, nOtpExpire };
    };
}

const _ = new Helper();

export default _;
