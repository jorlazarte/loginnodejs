import Post from "../models/posts.js"

const postAdapter = (data, file = '') => {

    console.log('**************')
    console.log('data', data)
    console.log('file', file)
    console.log('**************')

    if (file !== '')
        file = 'uploads/' + file.filename

    let { postId, postIdUser, postTitle, postBody, postCat, postImgAnt } = data

    const post = new Post(postId, postIdUser, postTitle, postBody, postCat, postImgAnt, file)
    return post
}


export const adapters = {
    postAdapter
}