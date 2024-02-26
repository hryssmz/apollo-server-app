import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type BankAccount = {
  __typename?: 'BankAccount';
  accountNumber: Scalars['String']['output'];
  bankName: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  isDeleted: Scalars['Boolean']['output'];
  modifiedAt: Scalars['Date']['output'];
  routingNumber: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
  uuid: Scalars['ID']['output'];
};

export type BankTransfer = {
  __typename?: 'BankTransfer';
  amount: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  modifiedAt: Scalars['Date']['output'];
  source: Scalars['String']['output'];
  transactionId: Scalars['ID']['output'];
  type: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
  uuid: Scalars['ID']['output'];
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  modifiedAt: Scalars['Date']['output'];
  transactionId: Scalars['ID']['output'];
  userId: Scalars['ID']['output'];
  uuid: Scalars['ID']['output'];
};

export type Contact = {
  __typename?: 'Contact';
  contactUserId: Scalars['ID']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  modifiedAt: Scalars['Date']['output'];
  userId: Scalars['ID']['output'];
  uuid: Scalars['ID']['output'];
};

export type CreateBankAccount = {
  accountNumber: Scalars['String']['input'];
  bankName: Scalars['String']['input'];
  routingNumber: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type CreateComment = {
  content: Scalars['String']['input'];
  transactionId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type CreateLike = {
  transactionId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type CreateNotification = {
  message: Scalars['String']['input'];
  transactionId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type CreateTransaction = {
  amount: Scalars['Int']['input'];
  balanceAtCompletion: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  privacyLevel: Scalars['String']['input'];
  receiverId: Scalars['ID']['input'];
  requestStatus: Scalars['String']['input'];
  senderId: Scalars['ID']['input'];
  source: Scalars['String']['input'];
  status: Scalars['String']['input'];
};

export type CreateUser = {
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type DeleteBankAccount = {
  id: Scalars['ID']['input'];
};

export type Like = {
  __typename?: 'Like';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  modifiedAt: Scalars['Date']['output'];
  transactionId: Scalars['ID']['output'];
  userId: Scalars['ID']['output'];
  uuid: Scalars['ID']['output'];
};

export type Login = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Logout = {
  id: Scalars['ID']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBankAccount: BankAccount;
  createComment: Comment;
  createLike: Like;
  createNotification: Notification;
  createTransaction: Transaction;
  createUser: User;
  deleteBankAccount: BankAccount;
  login: User;
  logout: User;
  updateNotification: Notification;
  updateTransaction: Transaction;
  updateUser: User;
};


export type MutationCreateBankAccountArgs = {
  payload: CreateBankAccount;
};


export type MutationCreateCommentArgs = {
  payload: CreateComment;
};


export type MutationCreateLikeArgs = {
  payload: CreateLike;
};


export type MutationCreateNotificationArgs = {
  payload: CreateNotification;
};


export type MutationCreateTransactionArgs = {
  payload: CreateTransaction;
};


export type MutationCreateUserArgs = {
  payload: CreateUser;
};


export type MutationDeleteBankAccountArgs = {
  payload: DeleteBankAccount;
};


export type MutationLoginArgs = {
  payload: Login;
};


export type MutationLogoutArgs = {
  payload: Logout;
};


export type MutationUpdateNotificationArgs = {
  payload: UpdateNotification;
};


export type MutationUpdateTransactionArgs = {
  payload: UpdateTransaction;
};


export type MutationUpdateUserArgs = {
  payload: UpdateUser;
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  isRead: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
  modifiedAt: Scalars['Date']['output'];
  transactionId: Scalars['ID']['output'];
  userId: Scalars['ID']['output'];
  uuid: Scalars['ID']['output'];
};

export type PageData = {
  __typename?: 'PageData';
  count: Scalars['Int']['output'];
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  getContactsTransactions: TransactionDetailPage;
  getPersonalTransactions: TransactionDetailPage;
  getPublicTransactions: TransactionDetailPage;
  getTransactionDetail: TransactionDetail;
  getUnreadNotifications: Array<Notification>;
  getUser: User;
  listBankAccounts: Array<BankAccount>;
  searchUsers: Array<User>;
};


export type QueryGetContactsTransactionsArgs = {
  amountMax?: InputMaybe<Scalars['Int']['input']>;
  amountMin?: InputMaybe<Scalars['Int']['input']>;
  dateEnd?: InputMaybe<Scalars['Date']['input']>;
  dateStart?: InputMaybe<Scalars['Date']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['ID']['input'];
};


export type QueryGetPersonalTransactionsArgs = {
  amountMax?: InputMaybe<Scalars['Int']['input']>;
  amountMin?: InputMaybe<Scalars['Int']['input']>;
  dateEnd?: InputMaybe<Scalars['Date']['input']>;
  dateStart?: InputMaybe<Scalars['Date']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['ID']['input'];
};


export type QueryGetPublicTransactionsArgs = {
  amountMax?: InputMaybe<Scalars['Int']['input']>;
  amountMin?: InputMaybe<Scalars['Int']['input']>;
  dateEnd?: InputMaybe<Scalars['Date']['input']>;
  dateStart?: InputMaybe<Scalars['Date']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['ID']['input'];
};


export type QueryGetTransactionDetailArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUnreadNotificationsArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySearchUsersArgs = {
  q?: InputMaybe<Scalars['String']['input']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  amount: Scalars['Int']['output'];
  balanceAtCompletion: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  modifiedAt: Scalars['Date']['output'];
  privacyLevel: Scalars['String']['output'];
  receiverId: Scalars['ID']['output'];
  requestResolvedAt?: Maybe<Scalars['Date']['output']>;
  requestStatus: Scalars['String']['output'];
  senderId: Scalars['ID']['output'];
  source: Scalars['String']['output'];
  status: Scalars['String']['output'];
  uuid: Scalars['ID']['output'];
};

export type TransactionDetail = {
  __typename?: 'TransactionDetail';
  comments: Array<Comment>;
  likes: Array<Like>;
  receiver: User;
  sender: User;
  transaction: Transaction;
};

export type TransactionDetailPage = {
  __typename?: 'TransactionDetailPage';
  pageData: PageData;
  results: Array<TransactionDetail>;
};

export type UpdateNotification = {
  id: Scalars['ID']['input'];
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
};

export type UpdateTransaction = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  balanceAtCompletion?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  privacyLevel?: InputMaybe<Scalars['String']['input']>;
  receiverId?: InputMaybe<Scalars['ID']['input']>;
  requestStatus?: InputMaybe<Scalars['String']['input']>;
  senderId?: InputMaybe<Scalars['ID']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUser = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  defaultPrivacyLevel?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  balance: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  defaultPrivacyLevel: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  modifiedAt: Scalars['Date']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
  uuid: Scalars['ID']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  BankAccount: ResolverTypeWrapper<BankAccount>;
  BankTransfer: ResolverTypeWrapper<BankTransfer>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Comment: ResolverTypeWrapper<Comment>;
  Contact: ResolverTypeWrapper<Contact>;
  CreateBankAccount: CreateBankAccount;
  CreateComment: CreateComment;
  CreateLike: CreateLike;
  CreateNotification: CreateNotification;
  CreateTransaction: CreateTransaction;
  CreateUser: CreateUser;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DeleteBankAccount: DeleteBankAccount;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Like: ResolverTypeWrapper<Like>;
  Login: Login;
  Logout: Logout;
  Mutation: ResolverTypeWrapper<{}>;
  Notification: ResolverTypeWrapper<Notification>;
  PageData: ResolverTypeWrapper<PageData>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Transaction: ResolverTypeWrapper<Transaction>;
  TransactionDetail: ResolverTypeWrapper<TransactionDetail>;
  TransactionDetailPage: ResolverTypeWrapper<TransactionDetailPage>;
  UpdateNotification: UpdateNotification;
  UpdateTransaction: UpdateTransaction;
  UpdateUser: UpdateUser;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BankAccount: BankAccount;
  BankTransfer: BankTransfer;
  Boolean: Scalars['Boolean']['output'];
  Comment: Comment;
  Contact: Contact;
  CreateBankAccount: CreateBankAccount;
  CreateComment: CreateComment;
  CreateLike: CreateLike;
  CreateNotification: CreateNotification;
  CreateTransaction: CreateTransaction;
  CreateUser: CreateUser;
  Date: Scalars['Date']['output'];
  DeleteBankAccount: DeleteBankAccount;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Like: Like;
  Login: Login;
  Logout: Logout;
  Mutation: {};
  Notification: Notification;
  PageData: PageData;
  Query: {};
  String: Scalars['String']['output'];
  Transaction: Transaction;
  TransactionDetail: TransactionDetail;
  TransactionDetailPage: TransactionDetailPage;
  UpdateNotification: UpdateNotification;
  UpdateTransaction: UpdateTransaction;
  UpdateUser: UpdateUser;
  User: User;
};

export type BankAccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['BankAccount'] = ResolversParentTypes['BankAccount']> = {
  accountNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bankName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isDeleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  modifiedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  routingNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BankTransferResolvers<ContextType = any, ParentType extends ResolversParentTypes['BankTransfer'] = ResolversParentTypes['BankTransfer']> = {
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  modifiedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  source?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transactionId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  modifiedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  transactionId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContactResolvers<ContextType = any, ParentType extends ResolversParentTypes['Contact'] = ResolversParentTypes['Contact']> = {
  contactUserId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  modifiedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type LikeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Like'] = ResolversParentTypes['Like']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  modifiedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  transactionId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createBankAccount?: Resolver<ResolversTypes['BankAccount'], ParentType, ContextType, RequireFields<MutationCreateBankAccountArgs, 'payload'>>;
  createComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'payload'>>;
  createLike?: Resolver<ResolversTypes['Like'], ParentType, ContextType, RequireFields<MutationCreateLikeArgs, 'payload'>>;
  createNotification?: Resolver<ResolversTypes['Notification'], ParentType, ContextType, RequireFields<MutationCreateNotificationArgs, 'payload'>>;
  createTransaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType, RequireFields<MutationCreateTransactionArgs, 'payload'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'payload'>>;
  deleteBankAccount?: Resolver<ResolversTypes['BankAccount'], ParentType, ContextType, RequireFields<MutationDeleteBankAccountArgs, 'payload'>>;
  login?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'payload'>>;
  logout?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationLogoutArgs, 'payload'>>;
  updateNotification?: Resolver<ResolversTypes['Notification'], ParentType, ContextType, RequireFields<MutationUpdateNotificationArgs, 'payload'>>;
  updateTransaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType, RequireFields<MutationUpdateTransactionArgs, 'payload'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'payload'>>;
};

export type NotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Notification'] = ResolversParentTypes['Notification']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isRead?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  modifiedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  transactionId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageData'] = ResolversParentTypes['PageData']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getContactsTransactions?: Resolver<ResolversTypes['TransactionDetailPage'], ParentType, ContextType, RequireFields<QueryGetContactsTransactionsArgs, 'userId'>>;
  getPersonalTransactions?: Resolver<ResolversTypes['TransactionDetailPage'], ParentType, ContextType, RequireFields<QueryGetPersonalTransactionsArgs, 'userId'>>;
  getPublicTransactions?: Resolver<ResolversTypes['TransactionDetailPage'], ParentType, ContextType, RequireFields<QueryGetPublicTransactionsArgs, 'userId'>>;
  getTransactionDetail?: Resolver<ResolversTypes['TransactionDetail'], ParentType, ContextType, RequireFields<QueryGetTransactionDetailArgs, 'id'>>;
  getUnreadNotifications?: Resolver<Array<ResolversTypes['Notification']>, ParentType, ContextType, RequireFields<QueryGetUnreadNotificationsArgs, 'userId'>>;
  getUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>;
  listBankAccounts?: Resolver<Array<ResolversTypes['BankAccount']>, ParentType, ContextType>;
  searchUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, Partial<QuerySearchUsersArgs>>;
};

export type TransactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = {
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  balanceAtCompletion?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  modifiedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  privacyLevel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  receiverId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  requestResolvedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  requestStatus?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  senderId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  source?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionDetailResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransactionDetail'] = ResolversParentTypes['TransactionDetail']> = {
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  likes?: Resolver<Array<ResolversTypes['Like']>, ParentType, ContextType>;
  receiver?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionDetailPageResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransactionDetailPage'] = ResolversParentTypes['TransactionDetailPage']> = {
  pageData?: Resolver<ResolversTypes['PageData'], ParentType, ContextType>;
  results?: Resolver<Array<ResolversTypes['TransactionDetail']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  defaultPrivacyLevel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  modifiedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  BankAccount?: BankAccountResolvers<ContextType>;
  BankTransfer?: BankTransferResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  Contact?: ContactResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Like?: LikeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Notification?: NotificationResolvers<ContextType>;
  PageData?: PageDataResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
  TransactionDetail?: TransactionDetailResolvers<ContextType>;
  TransactionDetailPage?: TransactionDetailPageResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

