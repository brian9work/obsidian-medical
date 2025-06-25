const origin = "http://localhost:8080";

const Api ={
    control: {
        check: ()=> `${origin}`, 
    },
    auth: {
        login: () => {
            return `${origin}/auth/login`;
        },
        logup: () => {
            return `${origin}/auth/logup`;
        },
    },
}
export default Api;