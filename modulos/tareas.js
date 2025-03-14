import solicitud from "./solicitud.js"; //accede al modulo solicitud
export const getTareas = async (URL, usuario) => {
  //aca crea la promesa getTodos el cual obtiene
  return await solicitud(`${URL}/todos?userId=${usuario.id}`);
  //obtiene todos las tareas pendientedes del usuario y necesita usuario porque necesita acceder a su id
  //la cual es importante para sacar los comentarios para imprimirlos en especifico
};
