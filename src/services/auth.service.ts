import HttpService from "./http.service";

class AuthService extends HttpService {
    login = async (data: { email: string, password: string }) => {
        try {
            console.log("this data is being sent : ", data)
            const response = await this.postRequest('/auth/login', data);
            localStorage.setItem('token', response.data.detail.accessToken);
            localStorage.setItem('refToken', response.data.detail.refreshToken);
            return response.data.detail.user;


        } catch (exception) {
            console.error(exception)
            throw exception
        }
    }
}
const authSvc = new AuthService()
export default authSvc