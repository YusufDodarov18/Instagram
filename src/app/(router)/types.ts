import { ReactNode } from "react";

export interface NavLinkProps {
  href: string;
  activeIcon: ReactNode;
  label: string;
  isActive: (path: string) => boolean;
  icon: ReactNode;
}

export type FilterType =
  | "none"
  | "grayscale(100%)"
  | "sepia(60%)"
  | "brightness(150%)"
  | "contrast(200%)"
  | "hue-rotate(90deg)"
  | "saturate(200%)"
  | "invert(100%)"
  | "blur(2px)";

export interface CreatePostType {
  token: string | null;
  image: File | null;
  caption: string;
  title: string;
  loading: boolean;
  error: string;
  success: boolean;
  setToken: (newToken: string | null) => void;
  setImage: (file: File | null) => void;
  setCaption: (text: string) => void;
  reset: () => void;
  uploadPost: () => Promise<void>;
}

export interface MenuCompProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

export interface DrawerStoreType {
  datas: searchUser[];
  history: history[];
  isOpen: boolean;
  loading: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  searchUser: (user: string) => Promise<void>;
  postSearchHistory: (id: string) => Promise<void>;
  getSearchHistory: () => Promise<void>;
  deleteSearchHistory: (id: string) => Promise<void>;
  clearSearchHistory: () => Promise<void>;
}

export interface renderIconType {
  path: string;
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
}

export interface NotificationType {
  notificationDrawer: boolean;
  openDrawerNotification: (notificationDrawer: boolean) => void;
  closeDrawerNotification: (notificationDrawer: boolean) => void;
  toggleDrawerNotification: (notificationDrawer: boolean) => void;
}

export interface getUserType {
  avatar: string;
  fullName: string;
  id: string;
  subscribersCount: number;
  userName: string;
  date?: string;
}

export interface getUsersType {
  users: getUserType[];
  getUsers: () => Promise<void>;
  loading: boolean;
  deleteUser: (userId: string) => Promise<void>;
  subscribers: getUserShortInfo[];
  getSubscribers: (userId: string) => Promise<void>;
  addFollowing: (followingUserId: string) => Promise<void>;
  unFollowing: (followingUserId: string) => Promise<void>;
}

export interface getUserShortInfo {
  id: number;
  userShortInfo: {
    userId: string;
    userName: string;
    userPhoto: string;
    fullname: string;
  };
}

export interface myPost {
  postId: number;
  userId: string;
  userName: string;
  userImage: string;
  datePublished: string;
  images: string[];
  postLike: boolean;
  postLikeCount: number;
  userLikes: userLikesAndFavoriteAndViews[];
  commentCount: number;
  comments: comments[];
  postView: number;
  userViews: userLikesAndFavoriteAndViews[];
  postFavorite: boolean;
  userFavorite: userLikesAndFavoriteAndViews[];
  title: null | string;
  content: string;
}

export interface userLikesAndFavoriteAndViews {
  userId: string;
  userName: string;
  userPhoto: string;
  fullname: string;
}

export interface comments {
  postCommentId: number;
  userId: string;
  userName: string;
  userImage?: string;
  dateCommented: string;
  comment: string;
}

export interface myProfile {
  about: string;
  dateUpdated: string;
  dob: string;
  firstName: string;
  gender: string;
  image: string;
  lastName: string;
  locationId: number;
  occupation: string;
  postCount: number;
  subscribersCount: number;
  subscriptionsCount: number;
  userName: string;
}

export interface myStories {
  userId: string;
  userName: string;
  userImage: string;
  stories: stories;
  myPostSaved: myPostSaved;
}

export interface myPostSaved {
  postId: number;
  userId: string;
  userName: null | string;
  userImage: null | string;
  datePublished: string;
  images: string[];
  postLike: boolean;
  postLikeCount: number;
  userLikes: null | userLikesAndFavoriteAndViews[];
  commentCount: number;
  comments: MyWriteComment[];
  postView: number;
  userViews: userLikesAndFavoriteAndViews[];
  postFavorite: boolean;
  userFavorite: userLikesAndFavoriteAndViews[];
  title: null | string;
  content: null | string;
}

export interface MyWriteComment {
  postCommentId: number;
  userId: string;
  userName: string;
  userImage?: string;
  dateCommented: string;
  comment: string;
}

export interface reels {
  userName: string;
  isSubscriber: boolean;
  userImage?: string;
  images: string;
  postId: number;
  userId: string;
  datePublished: string;
  postLike: boolean;
  postLikeCount: number;
  userLikes: userLikesAndFavoriteAndViews[];
  commentCount: number;
  comments: comments[];
  postView: number;
  userViews: userLikesAndFavoriteAndViews[];
  postFavorite: boolean;
  userFavorite: userLikesAndFavoriteAndViews[];
  title?: null | string;
  content?: null | string;
}

export interface AddCommentProps {
  postId: number;
  commentText: string;
}

export interface ReelsStore {
  reels: reels[];
  loading: boolean;
  getReels: () => Promise<void>;
  likePosts: (postId: number) => Promise<void>;
  addFollowingRelationship: (followingUserId: string) => Promise<void>;
  deleteFollowingRelationship: (followingUserId: string) => Promise<void>;
  addFavoritePost: (postId: number) => Promise<void>;
  addComment: (comment: AddCommentProps) => Promise<void>;
}

export type JwtPayload = {
  sid?: string;
  exp?: number;
  iat?: number;
};

export interface searchUser {
  id: string;
  avatar: null | string;
  fullName: string;
  subscribersCount: number;
  userName: string;
}

export interface history {
  id: number;
  users: {
    id: string;
    avatar: null | string;
    fullName: string;
    subscribersCount: number;
    userName: string;
  };
}

export type Posts = post[];

export interface post {
  postId: number;
  userId: string;
  userName: string;
  userImage?: string;
  datePublished: string;
  images: string[];
  postLike: boolean;
  postLikeCount: number;
  userLikes?: userLikesAndFavoriteAndViews[];
  commentCount: number;
  comments: comments[];
  postView: number;
  userViews?: userLikesAndFavoriteAndViews[];
  postFavorite: boolean;
  userFavorite?: userLikesAndFavoriteAndViews[];
  title?: string | null;
  content?: string | null;
}

export interface PostsStore {
  posts: post[];
  loading: boolean;
  getPosts: () => Promise<void>;
  likePosts: (postId: number) => Promise<void>;
  addFollowingRelationship: (followingUserId: string) => Promise<void>;
  deleteFollowingRelationship: (followingUserId: string) => Promise<void>;
  addFavoritePost: (postId: number) => Promise<void>;
  addComment: (data: AddCommentProps) => Promise<void>;
  getSubscribtions: (userId: string) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
  addPostView: (postId: number) => Promise<void>;
  deletePost:(id:string)=>Promise<void>
}

export interface ExploreStore {
  posts: post[];
  comments: comments[];
  getPosts: () => Promise<void>;
  likePosts: (postId: number) => Promise<void>;
  addFollowingRelationship: (followingUserId: string) => Promise<void>;
  deleteFollowingRelationship: (followingUserId: string) => Promise<void>;
  addFavoritePost: (postId: number) => Promise<void>;
  addComment: (comment: { postId: number; comment: string }) => Promise<void>;
  setInitialComment: (comments: comments[]) => void;
  users: searchUser[];
  history: history[];
  isOpen: boolean;
  loading: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  searchUser: (userName: string) => Promise<void>;
  postSearchHistory: (id: string) => Promise<void>;
  getSearchHistory: () => Promise<void>;
  addSearchHistory: (text: string) => Promise<void>;
  deleteSearchHistory: (id: string) => Promise<void>;
  clearSearchHistory: () => Promise<void>;
}

export interface DecodedToken {
  sid: string;
  name: string;
  email: string;
  sub: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  exp: number;
  iss: string;
  aud: string;
}

export interface MyFollowers {
  id: number;
  userShortInfo: {
    userId: string;
    userName: string;
    userPhoto?: string | null;
    fullname: string;
  };
  isFollowing: boolean;
}

export interface MyFollowing {
  id: number;
  userShortInfo: {
    userId: string;
    userName: string;
    userPhoto?: string | null;
    fullname: string;
  };
  isFollowing?: boolean;
}

export interface ProfileStore {
  myProfile: myProfile | null;
  loading: boolean;
  myPosts: myPost[] 
  myPostSaved: myPostSaved[];
  myFollowers: MyFollowers[];
  myFollowing: MyFollowing[];
  getMyProfile: () => Promise<void>;
  getMyPosts: () => Promise<void>;
  getMyFollowers: (userId: string) => Promise<void>;
  getMyFollowing: (userId: string) => Promise<void>;
  updateImageProfile: (file: File) => Promise<void>;
  deleteImageProfile: () => Promise<void>;
  myImageProfile: { file: string } | null;
  addFollowing: (userId: string, sid: string) => Promise<void>;
  unFollowing: (userId: string, sid: string) => Promise<void>;
  followingLoading: boolean;
  followersLoading: boolean;
  updateProfile: (formData: editProfile) => Promise<void>;
}

export interface editProfile {
  about: string;
  gender: string | number;
}

export interface ProfileStoreById {
  info: infoByid | null;
  getInfoById: (id: string) => Promise<void>;
  loading: boolean;
  followersLoading: boolean;
  followingLoading: boolean;
  getPostById: (id: string) => Promise<void>;
  loadingPost: boolean;
  posts: Posts;
  getFollowersById: (userId: string) => Promise<void>;
  followers: MyFollowers[] | [];
  getFollowingById: (userId: string) => Promise<void>;
  followings: MyFollowing[] | [];
  getChat?: () => Promise<void>;
  chats?: [];
}

export type infoByid = {
  userName: string;
  image?: string;
  dateUpdated: string;
  gender: string;
  postCount: number;
  subscribersCount: number;
  subscriptionsCount: number;
  isSubscriber: boolean;
  firstName: string;
  lastName: string;
  locationId: number;
  dob: string;
  occupation: string;
  about: string;
};

export interface chat {
  sendUserId: string;
  sendUserName: string;
  sendUserImage: string;
  chatId: number;
  receiveUserId: string;
  receiveUserName: string;
  receiveUserImage: string;
}

export interface ChatsStore {
  loading: boolean;
  chats: chat[];
  getChats: () => Promise<void>;
  chatById: chatById[];
  getChatById: (id: number) => Promise<void>;
  createChat: (id: string) => Promise<void>;
  sendMessage: (formData: formData) => Promise<void>;
  deleteMessage: (chatId: number, messageId: string) => Promise<void>;
  deleteChat: (chatId: number) => Promise<void>;
}

export interface formData {
  ChatId: number;
  MessageText: string;
  File: string | null;
}
export interface chatById {
  userId: string;
  userName: string;
  userImage: string;
  messageId: number;
  chatId: number;
  messageText: string;
  sendMassageDate: string;
  file: string | null;
}

export interface story {
  id: number;
  fileName: string;
  postId: null;
  createAt: string;
  liked: boolean;
  likedCount: number;
}

export interface stories {
  userId: string;
  userName: string;
  userImage: string;
  stories: story[];
}

export interface storyById {
  id: number;
  fileName: string;
  postId: null;
  createAt: string;
  userId: string;
  userAvatar: null | string;
  viewerDto: viewStory[];
}

export interface viewStory {
  userName: string;
  name: string;
  viewCount: number;
  viewLike: number;
}

export interface UseStoriesStore {
  datas: stories[];
  loading: boolean;
  myStories: stories[];
  likeStory: (storyId: number) => Promise<void>;
  getStories: () => Promise<void>;
  getStoryById: (id: number) => Promise<void>;
  storyById: storyById[];
  addStory: (formData: string) => Promise<void>;
  addStoriesPost: (postId: number) => Promise<void>;
  deleteStory: (id: number) => Promise<void>;
  addStoryView: (storyId: number) => Promise<void>;
}

export interface location {
  locationId: number;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface UseLocationStore {
  data: location[];
  loading: boolean;
  getLocations: () => Promise<void>;
  addLocation: (formData: Omit<location, "locationId">) => Promise<void>;
  deleteLocation: (id: number) => Promise<void>;
}
