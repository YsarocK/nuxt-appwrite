import { defineNuxtPlugin } from '#app'
import { Client, Account, Databases, Storage, Avatars, Functions, Role, Permission, Query, ID, AppwriteException, Graphql, Locale, Teams } from 'appwrite';

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
  query: Query;
  ID: ID;
  AppwriteException: any;
  Graphql: Graphql;
  Locale: Locale;
  Teams: Teams;

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
    this.ID = ID;
    this.AppwriteException = AppwriteException;
    this.Graphql = new Graphql(this.client);
    this.Locale = new Locale(this.client);
    this.Teams = new Teams(this.client);
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
