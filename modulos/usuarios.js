import solicitud from "./solicitud.js";//importa el modulo solicitud para ver los usuarios
export  const getUsuarios=async(URL,id)=>{//exporta todo de una vez y no necesita usar expoert luego
    let ruta="";//usa la ruta para cambiarla y asi depender de una o la otra para realizar algo en especifico
    if(id){//usa un if si id se encuentra sino es else
     ruta=`${URL}/users?id=${id}`;//esto esta diseñado para encontrar un usuario en especifico
    }else{
        ruta=`${URL}/users`;
    }
  
    const usuarios = await solicitud(ruta);//accede ala promesa y la retorna segun el url del if
    // en este caso como desactive la opcion siempre imprimira else
    return usuarios;

}
