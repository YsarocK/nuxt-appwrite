import { Client, Account, Databases, Storage, Avatars, Functions } from 'appwrite';

interface AppwriteOptions {
  endpoint: string;
  project: string;
}

export class Appwrite {
  client: Client;
  databases: Databases;
  account: Account;
  storage: Storage;
  avatars: Avatars;
  functions: Functions;

  constructor(options: AppwriteOptions) {
    this.client = new Client();
    this.client
      .setEndpoint(options.endpoint)
      .setProject(options.project);
    this.databases = new Databases(this.client);
    this.account = new Account(this.client);
    this.storage = new Storage(this.client);
    this.avatars = new Avatars(this.client);
    this.functions = new Functions(this.client);
  }
}