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
                return this.login(email, password);
            }   else {
                console.log("Appwrite Service :: createUser :: ", error);
            }
        } catch (error) {
            throw error;
        }
    }
    async login({email, password}) {
        try {
            const loginSession = this.account.createEmailPasswordSession(email, password);
            if(loginSession) {
                return loginSession;
            }   else {
                return null;
            }
        } catch (error) {
            console.log("Appwrite Service :: login :: ", error);
        }
    }
    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite Service :: logout :: ", error);
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
            return this.account.get();
        } catch (error) {
           console.log("Appwrite Service :: getcurrentUser :: ", error);
        }
        return null;
    }
}

const authService = new AuthService();
export default authService;