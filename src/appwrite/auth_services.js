import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client.setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }
    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount) {
                // directly login
                const session = await this.login({email, password});
                if(session) {
                    return session;
                }
            }
        } catch (error) {
            return {success: false, message: error.message};
        }
    }
    async login({email, password}) {
        try {
            const loginSession = await this.account.createEmailPasswordSession(email, password);
            return {success: true, message: "Successfully Login..."};
        } catch (error) {
            console.log("Appwrite Service :: login :: ", error);
            return {success: false, message: error.message};
        }
    }
    async logout() {
        try {
            const response = await this.account.deleteSessions();
            return {success: true, message: "Successfully Logout"};
        } catch (error) {
            console.log("Appwrite Service :: logout :: ", error);
            return {success: false, message: error.message};
        }
    }
    async forgetPassword({userId, oldPass, newPass}) {
        try {
            return this.account.updateRecovery(
                userId,
                oldPass,
                newPass
            )
        } catch (error) {
            console.log("Appwrite Service :: forgetPassword :: ", error);
        }
    }
    async getcurrentUser() {
        try {
            const account = await this.account.get();
            if(account) {
                return account;
            }   else {
                return null;
            }
        } catch (error) {
           console.log("Appwrite Service :: getcurrentUser :: ", error);
            return null;
        }
    }
}

const authService = new AuthService();
export default authService;