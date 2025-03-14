import { getUsuarios} from "../modulos/index.js";
const URL = "https://jsonplaceholder.typicode.com";

const ModificarEstructura = async () => {
  const usuarios = await getUsuarios(URL);
  let nombreTelf = new Array();
  await Promise.all(
    usuarios.map(async (usuario) =>
    {
      nombreTelf.push(`Nombre:${usuario.name} - Telf:${usuario.phone}`);
    })
  );
  return nombreTelf;
};
ModificarEstructura().then((data) =>
{
  // for (let rept = 0; rept < data.length; rept++)
  // {
  //   console.log(data[rept]);
  // }
    data.map(async (nomTel) => {
      console.log(nomTel);
    });
});