const { UserInputError } = require('apollo-server');
const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const user = checkAuth(context);
      if(body.trim() === ''){
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment can\'t be empty'
          }
        })
      }

      const post = await Post.findById(postId);

      if(post){
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString()
        })
        await post.save();
        return post;
      } else throw new UserInputError('Post not found');
    }
  }
}