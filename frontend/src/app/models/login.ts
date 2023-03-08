export class Login {
    constructor(
        public nickname: string,
        public password: string,
        public rol: string
    ) { }

    reset(){
        this.nickname = ""
        this.password = ""
        this.rol = ""
    }
}