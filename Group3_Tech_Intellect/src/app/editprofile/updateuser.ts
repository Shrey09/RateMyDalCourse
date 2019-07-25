export class UpdateUser{
    constructor(
        public name:string,
        public email:string,
        public old_password:string,
        public password:string,
        public courses:Array<string>,
    ){}
}