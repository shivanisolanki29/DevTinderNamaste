# Api List

## AuthRouter

-post/signup
-post/login
-post/logout

## ProfileRouter

-get/profile/view
-patch/profile/edit
-patch/profile/password

## connectionRequestRouter

-post/request/send/:status/:toUserId (userId - to whom send the request )
-post/request/review/:status/:requestId (requestId - req object it to review request)qq ep-13

-post/request/send/ignore/requestId
-post/request/send/interested/RequestId
-post/request/review/accepted
-post/request/review/rejected

## userRouter

    -get/request/receive -ep-13
    -get/connections (who likes me/Matches and all connections)
    -get/feed (all users which i can view)
