
export default function PostModal({
  post,
  onClose,
}: {
  post: {
    postId: number;
    userId: string;
    userName: string;
    userImage?: string | null;
    datePublished: string;
    images: string[];
    postLike: boolean;
    postLikeCount: number;
    userLikes: [
      {
        userId: string;
        userName: string;
        userPhoto?: string;
        fullname: string;
      },
    ];
    commentCount: number;
    comments: [
      {
        postCommentId: number;
        userId: string;
        userName: string;
        userImage: string;
        dateCommented: string;
        comment: string;
      },
    ];
    postView: number;
    userViews: any[];
    postFavorite: boolean;
    userFavorite: any[];
    title: null | string;
    content: string;
  };
  onClose: () => void;
}) {
  // const {}=useProfile()
  return <div></div>;
}
