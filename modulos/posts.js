import solicitud from "./solicitud.js";//accede al modulo solicitud
export const getPost= async(URL,usuario)=>{//aca crea la promesa getpost el cual obtiene
    return  await    solicitud(`${URL}/posts?userId=${usuario.id}`) 
    //obtiene todos los post del usuario y necesita usuario porque necesita acceder a su id 
    //la cual es importante para sacar los comentarios para imprimirlos en especifico
    
}