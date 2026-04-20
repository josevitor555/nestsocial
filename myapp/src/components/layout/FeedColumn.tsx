import CreatePost from '../post/CreatePost';
import Feed from '../post/Feed';

const FeedColumn = () => {
    return (
        <div className="flex flex-col gap-4 w-full">
            <CreatePost />
            <div className="h-[1px] w-full bg-linear-to-r from-transparent via-border/50 to-transparent my-1" />
            <Feed />
        </div>
    );
};

export default FeedColumn;
