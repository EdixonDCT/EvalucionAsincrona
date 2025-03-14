import { getUsuarios} from "../modulos/index.js";
const URL = "https://jsonplaceholder.typicode.com";

const ListasPendientes = async () => {
  const usuarios = await getUsuarios(URL);
  usuarios.map( usuario =>
  { 
    console.log(`${usuario.id}.${usuario.company.bs}`);
  });
   
};
ListasPendientes().then();