export default class Post {
    constructor(postId, postIdUser, postTitle, postBody, postCategorias, postArchAnt, image) {
        this.postId = postId
        this.postIdUser = postIdUser
        this.postTitle = postTitle
        this.postBody = postBody
        this.postCategorias = postCategorias
        this.postArchAnt = postArchAnt
        this.postImage = image
    }
}