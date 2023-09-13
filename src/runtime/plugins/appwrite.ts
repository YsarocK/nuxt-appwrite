import { defineNuxtPlugin } from '#app'
import { Client, Account, Databases, Storage, Avatars, Functions, Role, Permission, Query, ID, AppwriteException, Graphql, Locale, Teams } from 'appwrite';

interface AppwriteOptions {
  endpoint: string;
  project: string;
}

// const Appwrite = () => {
//   const client = new Client()
//   return {
//     client: client,
//     databases: new Databases(client),
//     account: new Account(client),
//     storage: new Storage(client),
//     avatars: new Avatars(client),
//     functions: new Functions(client),
//     role: Role,
//     permission: Permission,
//     query: Query,
//     id: ID,
//     appwriteException: AppwriteException,
//     graphql: new Graphql(client),
//     locale: new Locale(client),
//     teams: new Teams(client)
//   }
// }

export class Appwrite {
  client: Client;
  databases: Databases;
  account: Account;
  storage: Storage;
  avatars: Avatars;
  functions: Functions;
  role: Role;
  permission: Permission;
  query: Query;
  id: ID;
  appwriteException: any;
  graphql: Graphql;
  locale: Locale;
  teams: Teams;

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
    this.role = Role;
    this.permission = Permission;
    this.query = Query;
    this.id = ID;
    this.appwriteException = AppwriteException;
    this.graphql = new Graphql(this.client);
    this.locale = new Locale(this.client);
    this.teams = new Teams(this.client);
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const appwrite = new Appwrite({
    endpoint: nuxtApp.$config.public.appwrite.APPWRITE_ENDPOINT,
    project: nuxtApp.$config.public.appwrite.APPWRITE_PROJECT_ID
  })

  return {
    provide: {
      appwrite
    }
  }
})
