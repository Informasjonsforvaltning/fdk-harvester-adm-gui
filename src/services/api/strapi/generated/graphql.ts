import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** Input type for dynamic zone Content of FancyArticle */
  FancyArticleContentDynamicZoneInput: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Long` scalar type represents 52-bit integers */
  Long: any;
  /** A time string with format: HH:mm:ss.SSS */
  Time: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AdminUser = {
  __typename?: "AdminUser";
  id: Scalars["ID"];
  username?: Maybe<Scalars["String"]>;
  firstname: Scalars["String"];
  lastname: Scalars["String"];
};

export type Article = {
  __typename?: "Article";
  id: Scalars["ID"];
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
  title: Scalars["String"];
  featureImage?: Maybe<UploadFile>;
  excerpt: Scalars["String"];
  content: Scalars["String"];
  locale?: Maybe<Scalars["String"]>;
  published_at?: Maybe<Scalars["DateTime"]>;
  localizations?: Maybe<Array<Maybe<Article>>>;
};

export type ArticleLocalizationsArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type ArticleAggregator = {
  __typename?: "ArticleAggregator";
  count?: Maybe<Scalars["Int"]>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type ArticleConnection = {
  __typename?: "ArticleConnection";
  values?: Maybe<Array<Maybe<Article>>>;
  groupBy?: Maybe<ArticleGroupBy>;
  aggregate?: Maybe<ArticleAggregator>;
};

export type ArticleConnectionContent = {
  __typename?: "ArticleConnectionContent";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<ArticleConnection>;
};

export type ArticleConnectionCreated_At = {
  __typename?: "ArticleConnectionCreated_at";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<ArticleConnection>;
};

export type ArticleConnectionExcerpt = {
  __typename?: "ArticleConnectionExcerpt";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<ArticleConnection>;
};

export type ArticleConnectionFeatureImage = {
  __typename?: "ArticleConnectionFeatureImage";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<ArticleConnection>;
};

export type ArticleConnectionId = {
  __typename?: "ArticleConnectionId";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<ArticleConnection>;
};

export type ArticleConnectionLocale = {
  __typename?: "ArticleConnectionLocale";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<ArticleConnection>;
};

export type ArticleConnectionPublished_At = {
  __typename?: "ArticleConnectionPublished_at";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<ArticleConnection>;
};

export type ArticleConnectionTitle = {
  __typename?: "ArticleConnectionTitle";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<ArticleConnection>;
};

export type ArticleConnectionUpdated_At = {
  __typename?: "ArticleConnectionUpdated_at";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<ArticleConnection>;
};

export type ArticleGroupBy = {
  __typename?: "ArticleGroupBy";
  id?: Maybe<Array<Maybe<ArticleConnectionId>>>;
  created_at?: Maybe<Array<Maybe<ArticleConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<ArticleConnectionUpdated_At>>>;
  title?: Maybe<Array<Maybe<ArticleConnectionTitle>>>;
  featureImage?: Maybe<Array<Maybe<ArticleConnectionFeatureImage>>>;
  excerpt?: Maybe<Array<Maybe<ArticleConnectionExcerpt>>>;
  content?: Maybe<Array<Maybe<ArticleConnectionContent>>>;
  locale?: Maybe<Array<Maybe<ArticleConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<ArticleConnectionPublished_At>>>;
};

export type ArticleInput = {
  title: Scalars["String"];
  featureImage?: Maybe<Scalars["ID"]>;
  excerpt: Scalars["String"];
  content: Scalars["String"];
  localizations?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  locale?: Maybe<Scalars["String"]>;
  published_at?: Maybe<Scalars["DateTime"]>;
  created_by?: Maybe<Scalars["ID"]>;
  updated_by?: Maybe<Scalars["ID"]>;
};

export type ComponentBasicImage = {
  __typename?: "ComponentBasicImage";
  id: Scalars["ID"];
  alternativeText?: Maybe<Scalars["String"]>;
  style?: Maybe<Enum_Componentbasicimage_Style>;
  media?: Maybe<Array<Maybe<UploadFile>>>;
};

export type ComponentBasicImageMediaArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type ComponentBasicImageInput = {
  media?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  alternativeText?: Maybe<Scalars["String"]>;
  style?: Maybe<Enum_Componentbasicimage_Style>;
};

export type ComponentBasicParagraph = {
  __typename?: "ComponentBasicParagraph";
  id: Scalars["ID"];
  Content?: Maybe<Scalars["String"]>;
};

export type ComponentBasicParagraphInput = {
  Content?: Maybe<Scalars["String"]>;
};

export type ComponentBasicQuote = {
  __typename?: "ComponentBasicQuote";
  id: Scalars["ID"];
  content?: Maybe<Scalars["String"]>;
  author?: Maybe<Scalars["String"]>;
};

export type ComponentBasicQuoteInput = {
  content?: Maybe<Scalars["String"]>;
  author?: Maybe<Scalars["String"]>;
};

export enum Enum_Componentbasicimage_Style {
  None = "none",
  FullSize = "fullSize",
  Left = "left",
  Right = "right",
}

export enum Enum_Servicemessage_Channel {
  Generell = "Generell",
  Publiseringsportal = "Publiseringsportal",
  Registreringsportal = "Registreringsportal",
  Adminportal = "Adminportal",
}

export enum Enum_Servicemessage_Message_Type {
  Info = "INFO",
  Warning = "WARNING",
  Error = "ERROR",
}

export type FancyArticle = {
  __typename?: "FancyArticle";
  id: Scalars["ID"];
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
  title?: Maybe<Scalars["String"]>;
  Content?: Maybe<Array<Maybe<FancyArticleContentDynamicZone>>>;
  locale?: Maybe<Scalars["String"]>;
  published_at?: Maybe<Scalars["DateTime"]>;
  localizations?: Maybe<Array<Maybe<FancyArticle>>>;
};

export type FancyArticleLocalizationsArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type FancyArticleAggregator = {
  __typename?: "FancyArticleAggregator";
  count?: Maybe<Scalars["Int"]>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type FancyArticleConnection = {
  __typename?: "FancyArticleConnection";
  values?: Maybe<Array<Maybe<FancyArticle>>>;
  groupBy?: Maybe<FancyArticleGroupBy>;
  aggregate?: Maybe<FancyArticleAggregator>;
};

export type FancyArticleConnectionCreated_At = {
  __typename?: "FancyArticleConnectionCreated_at";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<FancyArticleConnection>;
};

export type FancyArticleConnectionId = {
  __typename?: "FancyArticleConnectionId";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<FancyArticleConnection>;
};

export type FancyArticleConnectionLocale = {
  __typename?: "FancyArticleConnectionLocale";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<FancyArticleConnection>;
};

export type FancyArticleConnectionPublished_At = {
  __typename?: "FancyArticleConnectionPublished_at";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<FancyArticleConnection>;
};

export type FancyArticleConnectionTitle = {
  __typename?: "FancyArticleConnectionTitle";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<FancyArticleConnection>;
};

export type FancyArticleConnectionUpdated_At = {
  __typename?: "FancyArticleConnectionUpdated_at";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<FancyArticleConnection>;
};

export type FancyArticleContentDynamicZone =
  | ComponentBasicQuote
  | ComponentBasicImage
  | ComponentBasicParagraph;

export type FancyArticleGroupBy = {
  __typename?: "FancyArticleGroupBy";
  id?: Maybe<Array<Maybe<FancyArticleConnectionId>>>;
  created_at?: Maybe<Array<Maybe<FancyArticleConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<FancyArticleConnectionUpdated_At>>>;
  title?: Maybe<Array<Maybe<FancyArticleConnectionTitle>>>;
  locale?: Maybe<Array<Maybe<FancyArticleConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<FancyArticleConnectionPublished_At>>>;
};

export type FancyArticleInput = {
  title?: Maybe<Scalars["String"]>;
  Content?: Maybe<Array<Scalars["FancyArticleContentDynamicZoneInput"]>>;
  localizations?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  locale?: Maybe<Scalars["String"]>;
  published_at?: Maybe<Scalars["DateTime"]>;
  created_by?: Maybe<Scalars["ID"]>;
  updated_by?: Maybe<Scalars["ID"]>;
};

export type FileInfoInput = {
  name?: Maybe<Scalars["String"]>;
  alternativeText?: Maybe<Scalars["String"]>;
  caption?: Maybe<Scalars["String"]>;
};

export type FileInput = {
  name: Scalars["String"];
  alternativeText?: Maybe<Scalars["String"]>;
  caption?: Maybe<Scalars["String"]>;
  width?: Maybe<Scalars["Int"]>;
  height?: Maybe<Scalars["Int"]>;
  formats?: Maybe<Scalars["JSON"]>;
  hash: Scalars["String"];
  ext?: Maybe<Scalars["String"]>;
  mime: Scalars["String"];
  size: Scalars["Float"];
  url: Scalars["String"];
  previewUrl?: Maybe<Scalars["String"]>;
  provider: Scalars["String"];
  provider_metadata?: Maybe<Scalars["JSON"]>;
  related?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  created_by?: Maybe<Scalars["ID"]>;
  updated_by?: Maybe<Scalars["ID"]>;
};

export type I18NLocale = {
  __typename?: "I18NLocale";
  id: Scalars["ID"];
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
  name?: Maybe<Scalars["String"]>;
  code?: Maybe<Scalars["String"]>;
};

export type InputId = {
  id: Scalars["ID"];
};

export type LocaleInput = {
  name?: Maybe<Scalars["String"]>;
  code?: Maybe<Scalars["String"]>;
  created_by?: Maybe<Scalars["ID"]>;
  updated_by?: Maybe<Scalars["ID"]>;
};

export type Morph =
  | UsersPermissionsMe
  | UsersPermissionsMeRole
  | UsersPermissionsLoginPayload
  | UserPermissionsPasswordPayload
  | Article
  | ArticleConnection
  | ArticleAggregator
  | ArticleGroupBy
  | ArticleConnectionId
  | ArticleConnectionCreated_At
  | ArticleConnectionUpdated_At
  | ArticleConnectionTitle
  | ArticleConnectionFeatureImage
  | ArticleConnectionExcerpt
  | ArticleConnectionContent
  | ArticleConnectionLocale
  | ArticleConnectionPublished_At
  | CreateArticlePayload
  | UpdateArticlePayload
  | DeleteArticlePayload
  | FancyArticle
  | FancyArticleConnection
  | FancyArticleAggregator
  | FancyArticleGroupBy
  | FancyArticleConnectionId
  | FancyArticleConnectionCreated_At
  | FancyArticleConnectionUpdated_At
  | FancyArticleConnectionTitle
  | FancyArticleConnectionLocale
  | FancyArticleConnectionPublished_At
  | CreateFancyArticlePayload
  | UpdateFancyArticlePayload
  | DeleteFancyArticlePayload
  | ServiceMessage
  | ServiceMessageConnection
  | ServiceMessageAggregator
  | ServiceMessageGroupBy
  | ServiceMessageConnectionId
  | ServiceMessageConnectionCreated_At
  | ServiceMessageConnectionUpdated_At
  | ServiceMessageConnectionTitle
  | ServiceMessageConnectionValid_From
  | ServiceMessageConnectionValid_To
  | ServiceMessageConnectionMessage_Type
  | ServiceMessageConnectionChannel
  | ServiceMessageConnectionShort_Description
  | ServiceMessageConnectionDescription
  | ServiceMessageConnectionLocale
  | ServiceMessageConnectionPublished_At
  | CreateServiceMessagePayload
  | UpdateServiceMessagePayload
  | DeleteServiceMessagePayload
  | I18NLocale
  | UploadFile
  | UploadFileConnection
  | UploadFileAggregator
  | UploadFileAggregatorSum
  | UploadFileAggregatorAvg
  | UploadFileAggregatorMin
  | UploadFileAggregatorMax
  | UploadFileGroupBy
  | UploadFileConnectionId
  | UploadFileConnectionCreated_At
  | UploadFileConnectionUpdated_At
  | UploadFileConnectionName
  | UploadFileConnectionAlternativeText
  | UploadFileConnectionCaption
  | UploadFileConnectionWidth
  | UploadFileConnectionHeight
  | UploadFileConnectionFormats
  | UploadFileConnectionHash
  | UploadFileConnectionExt
  | UploadFileConnectionMime
  | UploadFileConnectionSize
  | UploadFileConnectionUrl
  | UploadFileConnectionPreviewUrl
  | UploadFileConnectionProvider
  | UploadFileConnectionProvider_Metadata
  | DeleteFilePayload
  | UsersPermissionsPermission
  | UsersPermissionsRole
  | UsersPermissionsRoleConnection
  | UsersPermissionsRoleAggregator
  | UsersPermissionsRoleGroupBy
  | UsersPermissionsRoleConnectionId
  | UsersPermissionsRoleConnectionName
  | UsersPermissionsRoleConnectionDescription
  | UsersPermissionsRoleConnectionType
  | CreateRolePayload
  | UpdateRolePayload
  | DeleteRolePayload
  | UsersPermissionsUser
  | UsersPermissionsUserConnection
  | UsersPermissionsUserAggregator
  | UsersPermissionsUserGroupBy
  | UsersPermissionsUserConnectionId
  | UsersPermissionsUserConnectionCreated_At
  | UsersPermissionsUserConnectionUpdated_At
  | UsersPermissionsUserConnectionUsername
  | UsersPermissionsUserConnectionEmail
  | UsersPermissionsUserConnectionProvider
  | UsersPermissionsUserConnectionConfirmed
  | UsersPermissionsUserConnectionBlocked
  | UsersPermissionsUserConnectionRole
  | CreateUserPayload
  | UpdateUserPayload
  | DeleteUserPayload
  | ComponentBasicImage
  | ComponentBasicParagraph
  | ComponentBasicQuote;

export type Mutation = {
  __typename?: "Mutation";
  createArticle?: Maybe<CreateArticlePayload>;
  updateArticle?: Maybe<UpdateArticlePayload>;
  deleteArticle?: Maybe<DeleteArticlePayload>;
  createFancyArticle?: Maybe<CreateFancyArticlePayload>;
  updateFancyArticle?: Maybe<UpdateFancyArticlePayload>;
  deleteFancyArticle?: Maybe<DeleteFancyArticlePayload>;
  createServiceMessage?: Maybe<CreateServiceMessagePayload>;
  updateServiceMessage?: Maybe<UpdateServiceMessagePayload>;
  deleteServiceMessage?: Maybe<DeleteServiceMessagePayload>;
  /** Delete one file */
  deleteFile?: Maybe<DeleteFilePayload>;
  /** Create a new role */
  createRole?: Maybe<CreateRolePayload>;
  /** Update an existing role */
  updateRole?: Maybe<UpdateRolePayload>;
  /** Delete an existing role */
  deleteRole?: Maybe<DeleteRolePayload>;
  /** Create a new user */
  createUser?: Maybe<CreateUserPayload>;
  /** Update an existing user */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Delete an existing user */
  deleteUser?: Maybe<DeleteUserPayload>;
  createArticleLocalization: Article;
  createFancyArticleLocalization: FancyArticle;
  createServiceMessageLocalization: ServiceMessage;
  upload: UploadFile;
  multipleUpload: Array<Maybe<UploadFile>>;
  updateFileInfo: UploadFile;
  login: UsersPermissionsLoginPayload;
  register: UsersPermissionsLoginPayload;
  forgotPassword?: Maybe<UserPermissionsPasswordPayload>;
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
};

export type MutationCreateArticleArgs = {
  input?: Maybe<CreateArticleInput>;
};

export type MutationUpdateArticleArgs = {
  input?: Maybe<UpdateArticleInput>;
};

export type MutationDeleteArticleArgs = {
  input?: Maybe<DeleteArticleInput>;
};

export type MutationCreateFancyArticleArgs = {
  input?: Maybe<CreateFancyArticleInput>;
};

export type MutationUpdateFancyArticleArgs = {
  input?: Maybe<UpdateFancyArticleInput>;
};

export type MutationDeleteFancyArticleArgs = {
  input?: Maybe<DeleteFancyArticleInput>;
};

export type MutationCreateServiceMessageArgs = {
  input?: Maybe<CreateServiceMessageInput>;
};

export type MutationUpdateServiceMessageArgs = {
  input?: Maybe<UpdateServiceMessageInput>;
};

export type MutationDeleteServiceMessageArgs = {
  input?: Maybe<DeleteServiceMessageInput>;
};

export type MutationDeleteFileArgs = {
  input?: Maybe<DeleteFileInput>;
};

export type MutationCreateRoleArgs = {
  input?: Maybe<CreateRoleInput>;
};

export type MutationUpdateRoleArgs = {
  input?: Maybe<UpdateRoleInput>;
};

export type MutationDeleteRoleArgs = {
  input?: Maybe<DeleteRoleInput>;
};

export type MutationCreateUserArgs = {
  input?: Maybe<CreateUserInput>;
};

export type MutationUpdateUserArgs = {
  input?: Maybe<UpdateUserInput>;
};

export type MutationDeleteUserArgs = {
  input?: Maybe<DeleteUserInput>;
};

export type MutationCreateArticleLocalizationArgs = {
  input: UpdateArticleInput;
};

export type MutationCreateFancyArticleLocalizationArgs = {
  input: UpdateFancyArticleInput;
};

export type MutationCreateServiceMessageLocalizationArgs = {
  input: UpdateServiceMessageInput;
};

export type MutationUploadArgs = {
  refId?: Maybe<Scalars["ID"]>;
  ref?: Maybe<Scalars["String"]>;
  field?: Maybe<Scalars["String"]>;
  source?: Maybe<Scalars["String"]>;
  info?: Maybe<FileInfoInput>;
  file: Scalars["Upload"];
};

export type MutationMultipleUploadArgs = {
  refId?: Maybe<Scalars["ID"]>;
  ref?: Maybe<Scalars["String"]>;
  field?: Maybe<Scalars["String"]>;
  source?: Maybe<Scalars["String"]>;
  files: Array<Maybe<Scalars["Upload"]>>;
};

export type MutationUpdateFileInfoArgs = {
  id: Scalars["ID"];
  info: FileInfoInput;
};

export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};

export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"];
};

export type MutationResetPasswordArgs = {
  password: Scalars["String"];
  passwordConfirmation: Scalars["String"];
  code: Scalars["String"];
};

export type MutationEmailConfirmationArgs = {
  confirmation: Scalars["String"];
};

export enum PublicationState {
  Live = "LIVE",
  Preview = "PREVIEW",
}

export type Query = {
  __typename?: "Query";
  article?: Maybe<Article>;
  articles?: Maybe<Array<Maybe<Article>>>;
  articlesConnection?: Maybe<ArticleConnection>;
  fancyArticle?: Maybe<FancyArticle>;
  fancyArticles?: Maybe<Array<Maybe<FancyArticle>>>;
  fancyArticlesConnection?: Maybe<FancyArticleConnection>;
  serviceMessage?: Maybe<ServiceMessage>;
  serviceMessages?: Maybe<Array<Maybe<ServiceMessage>>>;
  serviceMessagesConnection?: Maybe<ServiceMessageConnection>;
  files?: Maybe<Array<Maybe<UploadFile>>>;
  filesConnection?: Maybe<UploadFileConnection>;
  role?: Maybe<UsersPermissionsRole>;
  /** Retrieve all the existing roles. You can't apply filters on this query. */
  roles?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
  rolesConnection?: Maybe<UsersPermissionsRoleConnection>;
  user?: Maybe<UsersPermissionsUser>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
  usersConnection?: Maybe<UsersPermissionsUserConnection>;
  me?: Maybe<UsersPermissionsMe>;
};

export type QueryArticleArgs = {
  id: Scalars["ID"];
  publicationState?: Maybe<PublicationState>;
};

export type QueryArticlesArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars["String"]>;
};

export type QueryArticlesConnectionArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
  locale?: Maybe<Scalars["String"]>;
};

export type QueryFancyArticleArgs = {
  id: Scalars["ID"];
  publicationState?: Maybe<PublicationState>;
};

export type QueryFancyArticlesArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars["String"]>;
};

export type QueryFancyArticlesConnectionArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
  locale?: Maybe<Scalars["String"]>;
};

export type QueryServiceMessageArgs = {
  id: Scalars["ID"];
  publicationState?: Maybe<PublicationState>;
};

export type QueryServiceMessagesArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars["String"]>;
};

export type QueryServiceMessagesConnectionArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
  locale?: Maybe<Scalars["String"]>;
};

export type QueryFilesArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
  publicationState?: Maybe<PublicationState>;
};

export type QueryFilesConnectionArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type QueryRoleArgs = {
  id: Scalars["ID"];
  publicationState?: Maybe<PublicationState>;
};

export type QueryRolesArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
  publicationState?: Maybe<PublicationState>;
};

export type QueryRolesConnectionArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type QueryUserArgs = {
  id: Scalars["ID"];
  publicationState?: Maybe<PublicationState>;
};

export type QueryUsersArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
  publicationState?: Maybe<PublicationState>;
};

export type QueryUsersConnectionArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type RoleInput = {
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  permissions?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  users?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  created_by?: Maybe<Scalars["ID"]>;
  updated_by?: Maybe<Scalars["ID"]>;
};

export type ServiceMessage = {
  __typename?: "ServiceMessage";
  id: Scalars["ID"];
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
  title: Scalars["String"];
  valid_from: Scalars["DateTime"];
  valid_to?: Maybe<Scalars["DateTime"]>;
  message_type: Enum_Servicemessage_Message_Type;
  channel: Enum_Servicemessage_Channel;
  short_description: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  locale?: Maybe<Scalars["String"]>;
  published_at?: Maybe<Scalars["DateTime"]>;
  localizations?: Maybe<Array<Maybe<ServiceMessage>>>;
};

export type ServiceMessageLocalizationsArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type ServiceMessageAggregator = {
  __typename?: "ServiceMessageAggregator";
  count?: Maybe<Scalars["Int"]>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type ServiceMessageConnection = {
  __typename?: "ServiceMessageConnection";
  values?: Maybe<Array<Maybe<ServiceMessage>>>;
  groupBy?: Maybe<ServiceMessageGroupBy>;
  aggregate?: Maybe<ServiceMessageAggregator>;
};

export type ServiceMessageConnectionChannel = {
  __typename?: "ServiceMessageConnectionChannel";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<ServiceMessageConnection>;
};

export type ServiceMessageConnectionCreated_At = {
  __typename?: "ServiceMessageConnectionCreated_at";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<ServiceMessageConnection>;
};

export type ServiceMessageConnectionDescription = {
  __typename?: "ServiceMessageConnectionDescription";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<ServiceMessageConnection>;
};

export type ServiceMessageConnectionId = {
  __typename?: "ServiceMessageConnectionId";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<ServiceMessageConnection>;
};

export type ServiceMessageConnectionLocale = {
  __typename?: "ServiceMessageConnectionLocale";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<ServiceMessageConnection>;
};

export type ServiceMessageConnectionMessage_Type = {
  __typename?: "ServiceMessageConnectionMessage_type";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<ServiceMessageConnection>;
};

export type ServiceMessageConnectionPublished_At = {
  __typename?: "ServiceMessageConnectionPublished_at";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<ServiceMessageConnection>;
};

export type ServiceMessageConnectionShort_Description = {
  __typename?: "ServiceMessageConnectionShort_description";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<ServiceMessageConnection>;
};

export type ServiceMessageConnectionTitle = {
  __typename?: "ServiceMessageConnectionTitle";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<ServiceMessageConnection>;
};

export type ServiceMessageConnectionUpdated_At = {
  __typename?: "ServiceMessageConnectionUpdated_at";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<ServiceMessageConnection>;
};

export type ServiceMessageConnectionValid_From = {
  __typename?: "ServiceMessageConnectionValid_from";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<ServiceMessageConnection>;
};

export type ServiceMessageConnectionValid_To = {
  __typename?: "ServiceMessageConnectionValid_to";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<ServiceMessageConnection>;
};

export type ServiceMessageGroupBy = {
  __typename?: "ServiceMessageGroupBy";
  id?: Maybe<Array<Maybe<ServiceMessageConnectionId>>>;
  created_at?: Maybe<Array<Maybe<ServiceMessageConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<ServiceMessageConnectionUpdated_At>>>;
  title?: Maybe<Array<Maybe<ServiceMessageConnectionTitle>>>;
  valid_from?: Maybe<Array<Maybe<ServiceMessageConnectionValid_From>>>;
  valid_to?: Maybe<Array<Maybe<ServiceMessageConnectionValid_To>>>;
  message_type?: Maybe<Array<Maybe<ServiceMessageConnectionMessage_Type>>>;
  channel?: Maybe<Array<Maybe<ServiceMessageConnectionChannel>>>;
  short_description?: Maybe<
    Array<Maybe<ServiceMessageConnectionShort_Description>>
  >;
  description?: Maybe<Array<Maybe<ServiceMessageConnectionDescription>>>;
  locale?: Maybe<Array<Maybe<ServiceMessageConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<ServiceMessageConnectionPublished_At>>>;
};

export type ServiceMessageInput = {
  title: Scalars["String"];
  valid_from: Scalars["DateTime"];
  valid_to?: Maybe<Scalars["DateTime"]>;
  message_type: Enum_Servicemessage_Message_Type;
  channel: Enum_Servicemessage_Channel;
  short_description: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  localizations?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  locale?: Maybe<Scalars["String"]>;
  published_at?: Maybe<Scalars["DateTime"]>;
  created_by?: Maybe<Scalars["ID"]>;
  updated_by?: Maybe<Scalars["ID"]>;
};

export type UploadFile = {
  __typename?: "UploadFile";
  id: Scalars["ID"];
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
  name: Scalars["String"];
  alternativeText?: Maybe<Scalars["String"]>;
  caption?: Maybe<Scalars["String"]>;
  width?: Maybe<Scalars["Int"]>;
  height?: Maybe<Scalars["Int"]>;
  formats?: Maybe<Scalars["JSON"]>;
  hash: Scalars["String"];
  ext?: Maybe<Scalars["String"]>;
  mime: Scalars["String"];
  size: Scalars["Float"];
  url: Scalars["String"];
  previewUrl?: Maybe<Scalars["String"]>;
  provider: Scalars["String"];
  provider_metadata?: Maybe<Scalars["JSON"]>;
  related?: Maybe<Array<Maybe<Morph>>>;
};

export type UploadFileRelatedArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type UploadFileAggregator = {
  __typename?: "UploadFileAggregator";
  count?: Maybe<Scalars["Int"]>;
  totalCount?: Maybe<Scalars["Int"]>;
  sum?: Maybe<UploadFileAggregatorSum>;
  avg?: Maybe<UploadFileAggregatorAvg>;
  min?: Maybe<UploadFileAggregatorMin>;
  max?: Maybe<UploadFileAggregatorMax>;
};

export type UploadFileAggregatorAvg = {
  __typename?: "UploadFileAggregatorAvg";
  width?: Maybe<Scalars["Float"]>;
  height?: Maybe<Scalars["Float"]>;
  size?: Maybe<Scalars["Float"]>;
};

export type UploadFileAggregatorMax = {
  __typename?: "UploadFileAggregatorMax";
  width?: Maybe<Scalars["Float"]>;
  height?: Maybe<Scalars["Float"]>;
  size?: Maybe<Scalars["Float"]>;
};

export type UploadFileAggregatorMin = {
  __typename?: "UploadFileAggregatorMin";
  width?: Maybe<Scalars["Float"]>;
  height?: Maybe<Scalars["Float"]>;
  size?: Maybe<Scalars["Float"]>;
};

export type UploadFileAggregatorSum = {
  __typename?: "UploadFileAggregatorSum";
  width?: Maybe<Scalars["Float"]>;
  height?: Maybe<Scalars["Float"]>;
  size?: Maybe<Scalars["Float"]>;
};

export type UploadFileConnection = {
  __typename?: "UploadFileConnection";
  values?: Maybe<Array<Maybe<UploadFile>>>;
  groupBy?: Maybe<UploadFileGroupBy>;
  aggregate?: Maybe<UploadFileAggregator>;
};

export type UploadFileConnectionAlternativeText = {
  __typename?: "UploadFileConnectionAlternativeText";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionCaption = {
  __typename?: "UploadFileConnectionCaption";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionCreated_At = {
  __typename?: "UploadFileConnectionCreated_at";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionExt = {
  __typename?: "UploadFileConnectionExt";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionFormats = {
  __typename?: "UploadFileConnectionFormats";
  key?: Maybe<Scalars["JSON"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionHash = {
  __typename?: "UploadFileConnectionHash";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionHeight = {
  __typename?: "UploadFileConnectionHeight";
  key?: Maybe<Scalars["Int"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionId = {
  __typename?: "UploadFileConnectionId";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionMime = {
  __typename?: "UploadFileConnectionMime";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionName = {
  __typename?: "UploadFileConnectionName";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionPreviewUrl = {
  __typename?: "UploadFileConnectionPreviewUrl";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionProvider = {
  __typename?: "UploadFileConnectionProvider";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionProvider_Metadata = {
  __typename?: "UploadFileConnectionProvider_metadata";
  key?: Maybe<Scalars["JSON"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionSize = {
  __typename?: "UploadFileConnectionSize";
  key?: Maybe<Scalars["Float"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionUpdated_At = {
  __typename?: "UploadFileConnectionUpdated_at";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionUrl = {
  __typename?: "UploadFileConnectionUrl";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionWidth = {
  __typename?: "UploadFileConnectionWidth";
  key?: Maybe<Scalars["Int"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileGroupBy = {
  __typename?: "UploadFileGroupBy";
  id?: Maybe<Array<Maybe<UploadFileConnectionId>>>;
  created_at?: Maybe<Array<Maybe<UploadFileConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<UploadFileConnectionUpdated_At>>>;
  name?: Maybe<Array<Maybe<UploadFileConnectionName>>>;
  alternativeText?: Maybe<Array<Maybe<UploadFileConnectionAlternativeText>>>;
  caption?: Maybe<Array<Maybe<UploadFileConnectionCaption>>>;
  width?: Maybe<Array<Maybe<UploadFileConnectionWidth>>>;
  height?: Maybe<Array<Maybe<UploadFileConnectionHeight>>>;
  formats?: Maybe<Array<Maybe<UploadFileConnectionFormats>>>;
  hash?: Maybe<Array<Maybe<UploadFileConnectionHash>>>;
  ext?: Maybe<Array<Maybe<UploadFileConnectionExt>>>;
  mime?: Maybe<Array<Maybe<UploadFileConnectionMime>>>;
  size?: Maybe<Array<Maybe<UploadFileConnectionSize>>>;
  url?: Maybe<Array<Maybe<UploadFileConnectionUrl>>>;
  previewUrl?: Maybe<Array<Maybe<UploadFileConnectionPreviewUrl>>>;
  provider?: Maybe<Array<Maybe<UploadFileConnectionProvider>>>;
  provider_metadata?: Maybe<
    Array<Maybe<UploadFileConnectionProvider_Metadata>>
  >;
};

export type UserInput = {
  username: Scalars["String"];
  email: Scalars["String"];
  provider?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
  resetPasswordToken?: Maybe<Scalars["String"]>;
  confirmationToken?: Maybe<Scalars["String"]>;
  confirmed?: Maybe<Scalars["Boolean"]>;
  blocked?: Maybe<Scalars["Boolean"]>;
  role?: Maybe<Scalars["ID"]>;
  created_by?: Maybe<Scalars["ID"]>;
  updated_by?: Maybe<Scalars["ID"]>;
};

export type UserPermissionsPasswordPayload = {
  __typename?: "UserPermissionsPasswordPayload";
  ok: Scalars["Boolean"];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars["String"];
  password: Scalars["String"];
  provider?: Maybe<Scalars["String"]>;
};

export type UsersPermissionsLoginPayload = {
  __typename?: "UsersPermissionsLoginPayload";
  jwt?: Maybe<Scalars["String"]>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: "UsersPermissionsMe";
  id: Scalars["ID"];
  username: Scalars["String"];
  email: Scalars["String"];
  confirmed?: Maybe<Scalars["Boolean"]>;
  blocked?: Maybe<Scalars["Boolean"]>;
  role?: Maybe<UsersPermissionsMeRole>;
};

export type UsersPermissionsMeRole = {
  __typename?: "UsersPermissionsMeRole";
  id: Scalars["ID"];
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

export type UsersPermissionsPermission = {
  __typename?: "UsersPermissionsPermission";
  id: Scalars["ID"];
  type: Scalars["String"];
  controller: Scalars["String"];
  action: Scalars["String"];
  enabled: Scalars["Boolean"];
  policy?: Maybe<Scalars["String"]>;
  role?: Maybe<UsersPermissionsRole>;
};

export type UsersPermissionsRegisterInput = {
  username: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

export type UsersPermissionsRole = {
  __typename?: "UsersPermissionsRole";
  id: Scalars["ID"];
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  permissions?: Maybe<Array<Maybe<UsersPermissionsPermission>>>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
};

export type UsersPermissionsRolePermissionsArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type UsersPermissionsRoleUsersArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type UsersPermissionsRoleAggregator = {
  __typename?: "UsersPermissionsRoleAggregator";
  count?: Maybe<Scalars["Int"]>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type UsersPermissionsRoleConnection = {
  __typename?: "UsersPermissionsRoleConnection";
  values?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
  groupBy?: Maybe<UsersPermissionsRoleGroupBy>;
  aggregate?: Maybe<UsersPermissionsRoleAggregator>;
};

export type UsersPermissionsRoleConnectionDescription = {
  __typename?: "UsersPermissionsRoleConnectionDescription";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleConnectionId = {
  __typename?: "UsersPermissionsRoleConnectionId";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleConnectionName = {
  __typename?: "UsersPermissionsRoleConnectionName";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleConnectionType = {
  __typename?: "UsersPermissionsRoleConnectionType";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleGroupBy = {
  __typename?: "UsersPermissionsRoleGroupBy";
  id?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionId>>>;
  name?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionName>>>;
  description?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionDescription>>>;
  type?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionType>>>;
};

export type UsersPermissionsUser = {
  __typename?: "UsersPermissionsUser";
  id: Scalars["ID"];
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
  username: Scalars["String"];
  email: Scalars["String"];
  provider?: Maybe<Scalars["String"]>;
  confirmed?: Maybe<Scalars["Boolean"]>;
  blocked?: Maybe<Scalars["Boolean"]>;
  role?: Maybe<UsersPermissionsRole>;
};

export type UsersPermissionsUserAggregator = {
  __typename?: "UsersPermissionsUserAggregator";
  count?: Maybe<Scalars["Int"]>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type UsersPermissionsUserConnection = {
  __typename?: "UsersPermissionsUserConnection";
  values?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
  groupBy?: Maybe<UsersPermissionsUserGroupBy>;
  aggregate?: Maybe<UsersPermissionsUserAggregator>;
};

export type UsersPermissionsUserConnectionBlocked = {
  __typename?: "UsersPermissionsUserConnectionBlocked";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionConfirmed = {
  __typename?: "UsersPermissionsUserConnectionConfirmed";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionCreated_At = {
  __typename?: "UsersPermissionsUserConnectionCreated_at";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionEmail = {
  __typename?: "UsersPermissionsUserConnectionEmail";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionId = {
  __typename?: "UsersPermissionsUserConnectionId";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionProvider = {
  __typename?: "UsersPermissionsUserConnectionProvider";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionRole = {
  __typename?: "UsersPermissionsUserConnectionRole";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionUpdated_At = {
  __typename?: "UsersPermissionsUserConnectionUpdated_at";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionUsername = {
  __typename?: "UsersPermissionsUserConnectionUsername";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserGroupBy = {
  __typename?: "UsersPermissionsUserGroupBy";
  id?: Maybe<Array<Maybe<UsersPermissionsUserConnectionId>>>;
  created_at?: Maybe<Array<Maybe<UsersPermissionsUserConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUpdated_At>>>;
  username?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUsername>>>;
  email?: Maybe<Array<Maybe<UsersPermissionsUserConnectionEmail>>>;
  provider?: Maybe<Array<Maybe<UsersPermissionsUserConnectionProvider>>>;
  confirmed?: Maybe<Array<Maybe<UsersPermissionsUserConnectionConfirmed>>>;
  blocked?: Maybe<Array<Maybe<UsersPermissionsUserConnectionBlocked>>>;
  role?: Maybe<Array<Maybe<UsersPermissionsUserConnectionRole>>>;
};

export type CreateArticleInput = {
  data?: Maybe<ArticleInput>;
};

export type CreateArticlePayload = {
  __typename?: "createArticlePayload";
  article?: Maybe<Article>;
};

export type CreateFancyArticleInput = {
  data?: Maybe<FancyArticleInput>;
};

export type CreateFancyArticlePayload = {
  __typename?: "createFancyArticlePayload";
  fancyArticle?: Maybe<FancyArticle>;
};

export type CreateRoleInput = {
  data?: Maybe<RoleInput>;
};

export type CreateRolePayload = {
  __typename?: "createRolePayload";
  role?: Maybe<UsersPermissionsRole>;
};

export type CreateServiceMessageInput = {
  data?: Maybe<ServiceMessageInput>;
};

export type CreateServiceMessagePayload = {
  __typename?: "createServiceMessagePayload";
  serviceMessage?: Maybe<ServiceMessage>;
};

export type CreateUserInput = {
  data?: Maybe<UserInput>;
};

export type CreateUserPayload = {
  __typename?: "createUserPayload";
  user?: Maybe<UsersPermissionsUser>;
};

export type DeleteArticleInput = {
  where?: Maybe<InputId>;
};

export type DeleteArticlePayload = {
  __typename?: "deleteArticlePayload";
  article?: Maybe<Article>;
};

export type DeleteFancyArticleInput = {
  where?: Maybe<InputId>;
};

export type DeleteFancyArticlePayload = {
  __typename?: "deleteFancyArticlePayload";
  fancyArticle?: Maybe<FancyArticle>;
};

export type DeleteFileInput = {
  where?: Maybe<InputId>;
};

export type DeleteFilePayload = {
  __typename?: "deleteFilePayload";
  file?: Maybe<UploadFile>;
};

export type DeleteRoleInput = {
  where?: Maybe<InputId>;
};

export type DeleteRolePayload = {
  __typename?: "deleteRolePayload";
  role?: Maybe<UsersPermissionsRole>;
};

export type DeleteServiceMessageInput = {
  where?: Maybe<InputId>;
};

export type DeleteServiceMessagePayload = {
  __typename?: "deleteServiceMessagePayload";
  serviceMessage?: Maybe<ServiceMessage>;
};

export type DeleteUserInput = {
  where?: Maybe<InputId>;
};

export type DeleteUserPayload = {
  __typename?: "deleteUserPayload";
  user?: Maybe<UsersPermissionsUser>;
};

export type EditArticleInput = {
  title?: Maybe<Scalars["String"]>;
  featureImage?: Maybe<Scalars["ID"]>;
  excerpt?: Maybe<Scalars["String"]>;
  content?: Maybe<Scalars["String"]>;
  localizations?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  locale?: Maybe<Scalars["String"]>;
  published_at?: Maybe<Scalars["DateTime"]>;
  created_by?: Maybe<Scalars["ID"]>;
  updated_by?: Maybe<Scalars["ID"]>;
};

export type EditComponentBasicImageInput = {
  id?: Maybe<Scalars["ID"]>;
  media?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  alternativeText?: Maybe<Scalars["String"]>;
  style?: Maybe<Enum_Componentbasicimage_Style>;
};

export type EditComponentBasicParagraphInput = {
  id?: Maybe<Scalars["ID"]>;
  Content?: Maybe<Scalars["String"]>;
};

export type EditComponentBasicQuoteInput = {
  id?: Maybe<Scalars["ID"]>;
  content?: Maybe<Scalars["String"]>;
  author?: Maybe<Scalars["String"]>;
};

export type EditFancyArticleInput = {
  title?: Maybe<Scalars["String"]>;
  Content?: Maybe<Array<Scalars["FancyArticleContentDynamicZoneInput"]>>;
  localizations?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  locale?: Maybe<Scalars["String"]>;
  published_at?: Maybe<Scalars["DateTime"]>;
  created_by?: Maybe<Scalars["ID"]>;
  updated_by?: Maybe<Scalars["ID"]>;
};

export type EditFileInput = {
  name?: Maybe<Scalars["String"]>;
  alternativeText?: Maybe<Scalars["String"]>;
  caption?: Maybe<Scalars["String"]>;
  width?: Maybe<Scalars["Int"]>;
  height?: Maybe<Scalars["Int"]>;
  formats?: Maybe<Scalars["JSON"]>;
  hash?: Maybe<Scalars["String"]>;
  ext?: Maybe<Scalars["String"]>;
  mime?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["Float"]>;
  url?: Maybe<Scalars["String"]>;
  previewUrl?: Maybe<Scalars["String"]>;
  provider?: Maybe<Scalars["String"]>;
  provider_metadata?: Maybe<Scalars["JSON"]>;
  related?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  created_by?: Maybe<Scalars["ID"]>;
  updated_by?: Maybe<Scalars["ID"]>;
};

export type EditLocaleInput = {
  name?: Maybe<Scalars["String"]>;
  code?: Maybe<Scalars["String"]>;
  created_by?: Maybe<Scalars["ID"]>;
  updated_by?: Maybe<Scalars["ID"]>;
};

export type EditRoleInput = {
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  permissions?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  users?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  created_by?: Maybe<Scalars["ID"]>;
  updated_by?: Maybe<Scalars["ID"]>;
};

export type EditServiceMessageInput = {
  title?: Maybe<Scalars["String"]>;
  valid_from?: Maybe<Scalars["DateTime"]>;
  valid_to?: Maybe<Scalars["DateTime"]>;
  message_type?: Maybe<Enum_Servicemessage_Message_Type>;
  channel?: Maybe<Enum_Servicemessage_Channel>;
  short_description?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  localizations?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  locale?: Maybe<Scalars["String"]>;
  published_at?: Maybe<Scalars["DateTime"]>;
  created_by?: Maybe<Scalars["ID"]>;
  updated_by?: Maybe<Scalars["ID"]>;
};

export type EditUserInput = {
  username?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  provider?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
  resetPasswordToken?: Maybe<Scalars["String"]>;
  confirmationToken?: Maybe<Scalars["String"]>;
  confirmed?: Maybe<Scalars["Boolean"]>;
  blocked?: Maybe<Scalars["Boolean"]>;
  role?: Maybe<Scalars["ID"]>;
  created_by?: Maybe<Scalars["ID"]>;
  updated_by?: Maybe<Scalars["ID"]>;
};

export type UpdateArticleInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditArticleInput>;
};

export type UpdateArticlePayload = {
  __typename?: "updateArticlePayload";
  article?: Maybe<Article>;
};

export type UpdateFancyArticleInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditFancyArticleInput>;
};

export type UpdateFancyArticlePayload = {
  __typename?: "updateFancyArticlePayload";
  fancyArticle?: Maybe<FancyArticle>;
};

export type UpdateRoleInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditRoleInput>;
};

export type UpdateRolePayload = {
  __typename?: "updateRolePayload";
  role?: Maybe<UsersPermissionsRole>;
};

export type UpdateServiceMessageInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditServiceMessageInput>;
};

export type UpdateServiceMessagePayload = {
  __typename?: "updateServiceMessagePayload";
  serviceMessage?: Maybe<ServiceMessage>;
};

export type UpdateUserInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditUserInput>;
};

export type UpdateUserPayload = {
  __typename?: "updateUserPayload";
  user?: Maybe<UsersPermissionsUser>;
};

export type GetServiceMessagesQueryVariables = Exact<{
  channel?: Maybe<Scalars["String"]>;
  today?: Maybe<Scalars["DateTime"]>;
}>;

export type GetServiceMessagesQuery = {
  __typename?: "Query";
  serviceMessages?: Maybe<
    Array<
      Maybe<{
        __typename?: "ServiceMessage";
        id: string;
        title: string;
        valid_from: any;
        valid_to?: Maybe<any>;
        message_type: Enum_Servicemessage_Message_Type;
        channel: Enum_Servicemessage_Channel;
        short_description: string;
        description?: Maybe<string>;
      }>
    >
  >;
};

export type GetServiceMessageQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetServiceMessageQuery = {
  __typename?: "Query";
  serviceMessage?: Maybe<{
    __typename?: "ServiceMessage";
    id: string;
    title: string;
    valid_from: any;
    valid_to?: Maybe<any>;
    message_type: Enum_Servicemessage_Message_Type;
    channel: Enum_Servicemessage_Channel;
    short_description: string;
    description?: Maybe<string>;
  }>;
};

export const GetServiceMessagesDocument = gql`
  query GetServiceMessages($channel: String, $today: DateTime) {
    serviceMessages(
      where: { channel: $channel, valid_from_lte: $today, valid_to_gte: $today }
    ) {
      id
      title
      valid_from
      valid_to
      message_type
      channel
      short_description
      description
    }
  }
`;

/**
 * __useGetServiceMessagesQuery__
 *
 * To run a query within a React component, call `useGetServiceMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceMessagesQuery({
 *   variables: {
 *      channel: // value for 'channel'
 *      today: // value for 'today'
 *   },
 * });
 */
export function useGetServiceMessagesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetServiceMessagesQuery,
    GetServiceMessagesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetServiceMessagesQuery,
    GetServiceMessagesQueryVariables
  >(GetServiceMessagesDocument, options);
}
export function useGetServiceMessagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetServiceMessagesQuery,
    GetServiceMessagesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetServiceMessagesQuery,
    GetServiceMessagesQueryVariables
  >(GetServiceMessagesDocument, options);
}
export type GetServiceMessagesQueryHookResult = ReturnType<
  typeof useGetServiceMessagesQuery
>;
export type GetServiceMessagesLazyQueryHookResult = ReturnType<
  typeof useGetServiceMessagesLazyQuery
>;
export type GetServiceMessagesQueryResult = Apollo.QueryResult<
  GetServiceMessagesQuery,
  GetServiceMessagesQueryVariables
>;
export const GetServiceMessageDocument = gql`
  query GetServiceMessage($id: ID!) {
    serviceMessage(id: $id) {
      id
      title
      valid_from
      valid_to
      message_type
      channel
      short_description
      description
    }
  }
`;

/**
 * __useGetServiceMessageQuery__
 *
 * To run a query within a React component, call `useGetServiceMessageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceMessageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceMessageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetServiceMessageQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetServiceMessageQuery,
    GetServiceMessageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetServiceMessageQuery,
    GetServiceMessageQueryVariables
  >(GetServiceMessageDocument, options);
}
export function useGetServiceMessageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetServiceMessageQuery,
    GetServiceMessageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetServiceMessageQuery,
    GetServiceMessageQueryVariables
  >(GetServiceMessageDocument, options);
}
export type GetServiceMessageQueryHookResult = ReturnType<
  typeof useGetServiceMessageQuery
>;
export type GetServiceMessageLazyQueryHookResult = ReturnType<
  typeof useGetServiceMessageLazyQuery
>;
export type GetServiceMessageQueryResult = Apollo.QueryResult<
  GetServiceMessageQuery,
  GetServiceMessageQueryVariables
>;
