import { Client, Account, Databases, Storage, Avatars, Functions, Role, Permission } from 'appwrite';

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
  role: Role;
  permission: Permission;

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
    this.role = new Role();
    this.permission = new Permission();
  }
}