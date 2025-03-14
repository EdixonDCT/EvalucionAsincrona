import { getUsuarios, getPost, getCommets} from "../modulos/index.js";
const URL = "https://jsonplaceholder.typicode.com";

const filtrarPost = async (postName) => {
  const usuarios = await getUsuarios(URL);
  return await Promise.all(
    usuarios.map(async (usuario) => {
        const posts = await getPost(URL, usuario);
        await Promise.all(
          posts.map(async (post) => {
            if (postName.toLowerCase() == (post.title).toLowerCase()) {
              const coments = await getCommets(URL, post);
              console.log({ ...post, coments });
            }
          })
        );
    })
  );
};
let postName = prompt("Ingrese el nombre del post que desea buscar");
filtrarPost(postName).then();