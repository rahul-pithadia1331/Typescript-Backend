class Validators {
    checkMissingValue(oValue: any, aMissingValues: string[]): boolean {
        if (!oValue.sFirstName) {
            aMissingValues.push('First name');
        }

        if (!oValue.sLastName) {
            aMissingValues.push('Last name');
        }

        if (!oValue.sWalletAddress) {
            aMissingValues.push('Wallet address');
        }

        if (!oValue.sEmail) {
            aMissingValues.push('Email');
        }

        if (!oValue.sGender) {
            aMissingValues.push('Gender');
        }

        if (!oValue.sPassword) {
            aMissingValues.push('Password');
        }

        if (!oValue.sConfirmPassword) {
            aMissingValues.push('Confirm password');
        }

        return aMissingValues.length>0 ? true : false;
    }

    checkFieldType(oValue: any, aTypeValidation: string[]) {
        if ((typeof oValue.sFirstName !== 'string') as boolean) {
            aTypeValidation.push('First name');
        }

        if ((typeof oValue.sLastName !== 'string') as boolean) {
            aTypeValidation.push('Last name');
        }

        if ((typeof oValue.sEmail !== 'string') as boolean) {
            aTypeValidation.push('Email');
        }

        if ((typeof oValue.sWalletAddress !== 'string') as boolean) {
            aTypeValidation.push('Wallet-Address');
        }

        if ((typeof oValue.sGender !== 'string') as boolean) {
            aTypeValidation.push('Age');
        }

        if ((typeof oValue.sPassword !== 'string') as boolean) {
            aTypeValidation.push('Password');
        }

        if ((typeof oValue.sConfirmPassword !== 'string') as boolean) {
            aTypeValidation.push('Confirm Password');
        }

        return aTypeValidation.length ? true : false;
    }

    signInMissingValue(oValue: any, aMissing: string[]): boolean{
        if(!oValue.sEmail){
            aMissing.push('Email')
        }

        if(!oValue.sPassword){
            aMissing.push('Password')
        }

        return aMissing.length > 0 ? true : false
    }

    editProfileMissingValue(oValue: any, aMissing: string[]): boolean{
        if(!oValue.sEmail){
            aMissing.push('Email');
        }

        if(!oValue.sFirstName){
            aMissing.push('First Name');
        }

        if(!oValue.sLastName){
            aMissing.push('Last Name');
        }
        
        return aMissing.length > 0 ? true : false 
    }
}

const validators = new Validators();

export default validators;
