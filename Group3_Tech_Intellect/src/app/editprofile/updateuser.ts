export class UpdateUser{
    constructor(
        public name:string,
        public email:string,
        public password:string,
        public courses:Array<string>,
    ){}
}