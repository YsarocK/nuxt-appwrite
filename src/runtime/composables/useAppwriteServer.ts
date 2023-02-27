import { Client, Databases, Users, Account, Storage, Avatars, Functions, Role, Permission, Query, ID, AppwriteException, Graphql, Locale, Teams, Health, InputFile } from 'node-appwrite'

const config = useRuntimeConfig()

class AppwriteServer {
  client: Client;
  users: Users;
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
  Health: Health;
  InputFile: InputFile;

  constructor() {
    this.client = new Client();
    this.client
      .setEndpoint(config.public.APPWRITE_ENDPOINT) // Your API Endpoint
      .setProject(config.public.APPWRITE_PROJECT_ID) // Your project ID
      .setKey(config.appwrite.APPWRITE_API_KEY) // Your secret API key
    this.databases = new Databases(this.client);
    this.users = new Users(this.client)
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
    this.Health = new Health(this.client);
    this.InputFile = InputFile;
  }
}

/**
 * Use the current Appwrite Server instance
 * @returns Client, Databases, Users, Account, Storage, Avatars, Functions, Role, Permission
 */
const useAppwriteServer = () => {
  return new AppwriteServer()
}

export default useAppwriteServer