export class User{
    constructor(
        public name:string,
        public email:string,
        public password:string,
        public confirmPassword:string,
        public level:string
    ){}
}