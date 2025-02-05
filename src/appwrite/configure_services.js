import conf from '../conf/conf.js';
import {Client, Databases, ID, Query, Storage} from 'appwrite'
export class DatabaseServices {
    client = new Client();
    databases;
    storage;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }
    async createPost({title, slug, content, featuredImage, userId, status}) {
        console.log("createpost section get data", title, slug, content, featuredImage, status, userId)
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,   // Slug is responsible for document id 
                // TODO: so same slug data can't store in appwrite database ?
                {title, content, featuredImage, userId, status}
            )
        } catch (error) {
            console.log("Appwrite Service :: createPost :: ", error);
        }
    }
    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {title, content, featuredImage, status}
            )
        } catch (error) {
            console.log("Appwrite Service :: updatePost :: ", error);
        }
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite Service :: deletePost :: ", error);
        }
        return false;
    }
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite Service :: getPost :: ", error);
            return false;
        }
    }
    async listPost() {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("status", "active")
                
                ]
            )
        } catch (error) {
            console.log("Appwrite Service :: listPost :: ", error);
            return false;
        }
    }

    async ownPosts(userId) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("userId", `${userId}`)
                ]
            )
        } catch (error) {
            console.log("Appwrite Service :: listPost :: ", error);
            return false;
        }
    }


    // TODO: file upload file that change into seperate file later
    async uploadFile(file) {
        console.log(file);
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Service :: uploadFile :: ", error);
        }
    }
    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite Service :: deleteFile :: ", error);
            return false;
        }
    }
    filePreview({fileId, width, height}) {
        try {
            return  this.storage.getFilePreview(
                conf.appwriteBucketId,
                fileId,
                width,
                height
            )
        } catch (error) {
            console.log("Appwrite Service :: filePreview :: ", error);
        }
    }
}
const databaseServices = new DatabaseServices();
export default databaseServices;