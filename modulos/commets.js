import solicitud from "./solicitud.js";//accede al modulo solicitud
export const getCommets=async(URL,post)=>{//usa el getcomment para utilizar el objeto post
    //y asi acceder a su id para asi obtener todos los comentarios de ese post en especifico
    // y utiliza URL para acceder de manera mas practica ala pagina y retorna el objeto comentario
    return  await solicitud(`${URL}/comments?postId=${post.id}`)
}