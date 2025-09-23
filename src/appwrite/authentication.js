import { Client, Account, ID } from "appwrite";
import { config } from "../config/configVariables";

class AuthService {
    client = new Client()
    account; //creating new account here is not gonna work as new client has not been setup

    constructor() {
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                return await this.login({ email, password })
            }
            else {
                return userAccount
            }
        } catch (error) {
            console.log(`Appwrite Service :: createAccount :: error : ${error}`);

        }

    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession({ email, password })
        } catch (error) {
            console.log(`Appwrite Service :: login :: error : ${error}`);
        }
    }

    async getUserDetails() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log(`Appwrite Service :: getUserDetails :: error : ${error}`);

        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log(`Appwrite Service :: logout :: error : ${error}`);
        }
    }

}

const authService = new AuthService()

export default authService