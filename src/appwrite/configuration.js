import { Client, Databases, Storage, Query, ID } from "appwrite";
import { config } from "../config/configVariables";




class Service {
    client = new Client()
    database
    storage

    constructor() {
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectId)

        this.database = new Databases(this.client)
        this.storage = new Storage(this.client)

    }

    async createPost({slug, title, content, featuredImage, status, userId}) {
        try {
            return await this.database.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log(`Appwrite Service :: createDocument :: error : ${error}`);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status, userId }) { //document id is provided separetely because it is provided from the database directly and not from the fields and also because we don't update it.
        try {
            return await this.database.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log(`Appwrite Service :: updatePost :: error : ${error}`);
        }

    }

    async getPost(slug) {
        try {
            return await this.database.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log(`Appwrite Service :: getPost :: error : ${error}`);

        }
    }

    async getPosts(queries = Query.equal("status", "active")) {
        try {
            return await this.database.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log(`Appwrite Service :: getPosts :: error : ${error}`);
            return false
        }
    }

    async deletePost(slug) {
        try {
            return await this.database.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log(`Appwrite Service :: deletePost :: error : ${error}`);

        }
    }


    //storage services

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(`Appwrite Service :: uploadFile :: error : ${error}`);

        }
    }

    async deleteFile(fileId) {
        try {
            return await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log(`Appwrite Service :: deleteFile :: error : ${error}`);

        }
    }

    getFilePreview(fileId) {
        return this.storage.getFileView(
            config.appwriteBucketId,
            fileId
        )
    }
}

const appwriteService = new Service()

export default appwriteService