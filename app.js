import {getUsuarios,getPost,getCommets,getAlbums,getPhotos,getTareas} from "./modulos/index.js";
//este barril ingresa todos los modelos hechos anteriormente para realizar mejores practicas
//y dentro de index.js se encuentra todos los modulos diseñados para la solicitudes y se
///especifica la dirrecion
const URL = "https://jsonplaceholder.typicode.com";//este URL es el que es repetido por todas las partes
//del codigo y se utiliza para que el codigo sea mas ordenado
const ListasPendientes = async () => {
  const usuarios = await getUsuarios(URL);
  return await Promise.all(
    usuarios.map(async (usuario) => {
      const tareas = await getTareas(URL, usuario);
      return tareas
    })
  );
   
};
const encontrarUsuario = async (username) => {
  const usuarios = await getUsuarios(URL);
  let ListaUsers = new Array();
  usuarios.map(async (usuario) => {ListaUsers.push(usuario.username);});
  return await Promise.all(usuarios.map(async (usuario) =>
  {
    const filterUser = ListaUsers.filter((ListaUsers) => ListaUsers == username);
    if (filterUser == usuario.username)
    {
      const albums = await getAlbums(URL, usuario);
      const photoAlbum = await Promise.all(
        albums.map(async (albums) => {
          const photos = await getPhotos(URL, albums);
          return { ...albums, photos };
        })
      );
      console.log({ ...usuario, photoAlbum });
    }
  }));
};
const filtrarPost = async (postName) => {
  const usuarios = await getUsuarios(URL);
  return await Promise.all(
    usuarios.map(async (usuario) => {
      const posts = await getPost(URL, usuario);
      await Promise.all(
        posts.map(async (post) => {
          if (postName.toLowerCase() == post.title.toLowerCase()) {
            const coments = await getCommets(URL, post);
            console.log({ ...post, coments });
          }
        })
      );
    })
  );
};
const ModificarEstructura = async () => {
  try {
    const usuarios = await getUsuarios(URL);
    return await Promise.all(
      usuarios.map(async (usuario) => {
        return [usuario.name, usuario.phone];
      })
    );
  } catch (error)
  { 
    console.log(error);
  }
};
// const usuarioId=3; este codigo esta diseñado para buscar los post especificos de un usuario

// const getusuarioId= async (usuarioId)=>{
//     let usuario= await getUsuarios(URL,usuarioId);
//     let post =await getPost(URL,usuario[0])
// }

// getusuarioId(usuarioId);
const manejardatos = async () => {//manejar datos es la promesa principal donde ocurre todo
    const usuarios =  await getUsuarios(URL);//se accede al metodo getusuarios que nos devuelve un
    //objeto que contiene todos los usuarios y se utiliza await para que devuelva una promesa cumplida
    //ademas de darle el argumento URL que necesita
    return await Promise.all(usuarios.map(async(usuario)=>{
        //retorna la promesa completa ya que se necesita para la impresion de datos que se ejecuten
        //el promise all es para que cumplan todas las condiciones en las promesas
        //usuarios.map se utiliza como el for es un ciclo repetitivo el cual accedera a cada valor especifico
        //y retorna un arreglo modificado
        // de usuarios async es para volverlo una promesa lo que exista dentro y usuario seria el objeto
        const posts = await getPost(URL,usuario);//accede al metodo post que nececsita url y usuario
        //el url es para acortar codigo y el usuario es porque necesita el id para ver sus posts 
        //el await es para que este siempre cumplida
        const comentPost = await Promise.all( posts.map(async(post)=>{
        //el commentpost es una promesa que espera a que se cumpla y utiliza prome all para imprimir
        //el id de post para sacar los comentarios de cada post
            const coments = await getCommets(URL,post);//los comentarios que son accedidos con el metodo
            //requieren en este caso el argumento post ya que ahora necesitan el id del post
            return {...post,coments};//retorna para comentPost todo ordenado los post y comentarios
            //en el orden en el cual se pueden encontrar por ejemplo postId y sus comentarios
            //y es ingresado en un objeto porque usa {} y no []
        }));
        const albums = await getAlbums(URL,usuario);//este codigo viene siendo lo mismo de arriba
        //solo que envez de post usa albunes pero en todo la teoria es la misma accede al id usuario
        //para imprimir sus photos con el id de albumnes y al final retorna todo para meterlo
        //en un objeto
        const photoAlbum = await Promise.all( albums.map(async(albums)=>{
            const photos = await getPhotos(URL,albums);
            return {...albums,photos};
        }));
        return {...usuario,photoAlbum,comentPost};//este es el mas importante y el que imprime
        //todo lo que sabemos del usuario como un objeto el cual posee albumes con sus fotos
        //y post con sus comentarios
    }));
};
let cont = 0;
while (cont == 0)
{
  let menu = parseInt(prompt("Ingrese el numero de cual funcionalidad desea Ejecutar \n1.Lista pendientes\n2.encontrar Usuario\n3.filtrar Post\n4.Modificar Estructura\n5.Manejar datos"));
  switch (menu) {
    case 1:
      ListasPendientes().then((data) => {
        console.log(data);
      });
      cont++;
      break;
    case 2:
      let username = prompt(
        "Ingrese un usuario"
        //usuarios que se pueden poner Bret,Antonette,Samantha,Karianne,Kamren,Leopoldo_Corkery,Elwyn.Skiles,Maxime_Nienow,Delphine,Moriah.Stanton
      );
      encontrarUsuario(username).then();
      cont++;
      break;
    case 3:
      let postName = prompt("Ingrese el nombre del post que desea buscar");
      filtrarPost(postName).then();
      cont++;
      break;
    case 4:
      ModificarEstructura().then((data) => {
        // for (let rept = 0; rept < data.length; rept++)
        // {
        //   console.log(data[rept]);
        // }
        data.map(async (nomTel) => {
          console.log(nomTel);
        });
      });
      cont++;
      break;
    case 5:
      manejardatos().then((data) => {
        //accede ala impresion de la promesa con then y usa data para que imprime el
        //return y despues de usa en un console log
        console.log(data);
      });
      cont++;
      break;
    default:
      alert("Error numero no valido ingreselo nuevamente");
      break;
  }
}