import { getUsuarios, getAlbums, getPhotos } from "../modulos/index.js";
const URL = "https://jsonplaceholder.typicode.com";

const encontrarUsuario = async (username) => {
  const usuarios = await getUsuarios(URL);
  return await Promise.all(usuarios.map(async (usuario) =>
  {
    if (username.toLowerCase() == (usuario.username).toLowerCase()) {
      const albums = await getAlbums(URL, usuario);
      const photoAlbum = await Promise.all(
        albums.map(async (albums) => {
          const photos = await getPhotos(URL, albums);
          return { ...albums, photos };
        })
      );
      console.log({ ...usuario, photoAlbum});
    }
  }));
};
let username = prompt(
  "Ingrese un usuario"
  //usuarios que se pueden poner Bret,Antonette,Samantha,Karianne,Kamren,Leopoldo_Corkery,Elwyn.Skiles,Maxime_Nienow,Delphine,Moriah.Stanton
);
encontrarUsuario(username).then();