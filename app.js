import {getUsuarios,getPost,getCommets,getAlbums,getPhotos,getTareas} from "./modulos/index.js";
//este barril ingresa todos los modelos hechos anteriormente para realizar mejores practicas
//y dentro de index.js se encuentra todos los modulos diseñados para la solicitudes y se
///especifica la dirrecion
const URL = "https://jsonplaceholder.typicode.com";//este URL es el que es repetido por todas las partes
//del codigo y se utiliza para que el codigo sea mas ordenado

//EJERCICIO 1 
const ListasPendientes = async () => {//accede al metodo lista pendientes el cual imprime todas las tareas de todos los uaurios
  const usuarios = await getUsuarios(URL);//obtiene todos el objeto de todos los usuarios
  return await Promise.all(//se pone return para cuando termine lo retorne automaticamente si escribir otra linea y se usa promise all
    //para que todas las promesas esten cumplidas
    usuarios.map(async (usuario) => {//se usa usuarios.map para crear un ciclo como si fuese un for
      const tareas = await getTareas(URL, usuario);//se obtiene el objeto de tareas con usuario y su ID
      return tareas//retorna tarea que a su vez se retorna en usuarios.map dando el resultado de todas las tareas pendientes
      //y como la promesa es accedida con un log se imprime tarea automaticamente pero se podria realizar alrevez dando log aca sin retornar
    })
  );
  
};
//EJERCICIO 2
const encontrarUsuario = async (username) => {//Accede al metodo de encontrar usuario que se usa con un promt realizado en el switch case 
  const usuarios = await getUsuarios(URL);//accede a getusuarios para obtener el objeto de los usuarios
  let ListaUsers = new Array();//crea un arreglo para compararlo despues con un Filter
  usuarios.map(async (usuario) => { ListaUsers.push(usuario.username); });//utiliza un .map para asi ingresar el username que es el apodo de cada usuario
  //y ingresar cada uno de los anterior por eso se utiliza push
  return await Promise.all(usuarios.map(async (usuario) =>//se crea un promise all que luego se retorna automaticamente y se le ingresa como argumento
  //usuario ya que necesitamos sus IDs
  {
    const filterUser = ListaUsers.filter((ListaUsers) => ListaUsers == username);//se realiza el filtro el cual devuelve si se encontro o no como si fuese
    //un array
    if (filterUser == usuario.username)//si encuentra similitud con usuario.username porque si no se imprime constantemente se realizara el acceso al album
    {
      const albums = await getAlbums(URL, usuario);//accede al album con el ID especifico hallado con filter
      const photoAlbum = await Promise.all(//crea PhotoAlbum asi podra retornarlo despues con las fotos y el album
        albums.map(async (albums) => {//recorre el album porque se necesita el album id para las fotos
          const photos = await getPhotos(URL, albums);//accede alas fotos 
          return { ...albums, photos };//se retorna album y fotos de manera que fotos quede dentro de album y no al lado y todo se junta en photoAlbum
          //el cual retorna
        })
      );
      console.log({ ...usuario, photoAlbum });//Imprime el usuario con sus datos y el photoalbum el cual contiene los albumnes y las fotos solamente
    }
  }));
};
const filtrarPost = async (postName) => {//se declara la promesa de Filtrar post que es parecida ala anterior solo que envez de filtrar por el nombre
  //del usuario es por el titulo del post
  const usuarios = await getUsuarios(URL);//accede al objeto usuario porque necesitamos los IDS  de todos porque necesitamos todos los post
  return await Promise.all(//retorna la promesa.all que cumplira todas las promesas  y el await es para que se cumpla a su vez el promise.all
    usuarios.map(async (usuario) => {//usa .map para recorrer usuarios para conseguir su ID para promesas
      const posts = await getPost(URL, usuario);//va para post y los obtiene todos para compararlos
      await Promise.all(//este promise all hace que todo las promesas de adentro se cumplian y el await para que espere a que el promise all se cumpla tambien
        posts.map(async (post) => {//este map recorre el post para darle el ID a comentarios 
          if (postName.toLowerCase() == post.title.toLowerCase()) {//utilizamos un if con lowerCase por si lo escriben en minuscula y se compara con post title que es el titulo del post
            const coments = await getCommets(URL, post);//accede a los comentarios con el ID del post
            console.log({ ...post, coments });//imprime de una vez en promesa
          }
        })
      );
    })
  );
};
const ModificarEstructura = async () => {//modificar estructura que es solo imprimir el nombre y el telefono en un array solo
  try {//try catch por si detecta un tipo de error
    const usuarios = await getUsuarios(URL);//se agarra todos los usuarios y solo necesitamos eso para su nombre y telefono
    return await Promise.all(//usamos promises all para retornarlo y promise all para que cumpla tood
      usuarios.map(async (usuario) => {//se usa map para que recorra todo
        return [usuario.name, usuario.phone];//retorna el nombre y el telefono porque es el que nos pide el ejercicio y lo ponemos en [] porque
        //asi se vuelve un array sin necesidad de usar let o const
      })
    );
  } catch (error)//captura el error por si ocurre pero no deberia y lo imprime
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
let cont = 0;//este cont evita que se acabe el while y sea eterna hasta que el usuario lo desee
while (cont == 0)//el while es eterno hasta que la condicion no sea igual pero solo ocurrira si presionas el boton 0
{
  let menu = parseInt(prompt("Ingrese el numero de cual funcionalidad desea Ejecutar \n1.Lista pendientes\n2.encontrar Usuario\n3.filtrar Post\n4.Modificar Estructura\n5.Manejar datos"));
  switch (menu) {//la explicacion es la misma en todas accede a la promesa y la cumple
    case 1:
      ListasPendientes().then((data) =>
      {
        console.log(data);
      });
      cont++;
      break;
    case 2:
      let username = prompt("Ingrese un usuario");
        //usuarios que se pueden poner Bret,Antonette,Samantha,Karianne,Kamren,Leopoldo_Corkery,Elwyn.Skiles,Maxime_Nienow,Delphine,Moriah.Stanton
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