export class SearchValidationService {

    validateTerm(string: string) {
        let termsArray = string.trim().split(/[ ]+/);
        const MAX_AGE = 120;
        let termsObj:any = {valid:true};

        if(termsArray.length>0 && termsArray.length<=3){
            termsArray.forEach(function (term: any) {
                switch (true){
                    //validate name
                    case (/^[a-zA-Z\.]+$/).test(term):
                        termsObj.name = term;
                        break;
                    //validate age
                    case (term <= MAX_AGE && term > 0):
                        termsObj.age = term;
                        break;
                    //validate phone
                    case (term > MAX_AGE && term.length >= 3):
                        termsObj.phone = term;
                        break;
                    case term == "":
                    //ignore empty strings
                        termsObj.valid = false;
                        break;
                    default:
                        termsObj.valid = false;
                        termsObj.message = 'Search term is not valid';
                        break;
                }
            })
        } else {
            termsObj.valid = false;
            termsObj.message = 'More than 3 search terms: name/age/phone';
        }
        return termsObj
    }

}