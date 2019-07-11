export class UpdateUser{
    constructor(
        public name:string,
        public email:string,
        public old_password:string,
        public new_password:string,
        public courses:Array<string>,
    ){}
}