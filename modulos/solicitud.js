const solicitud = async url => {
    const peticion = await fetch(url);//accede con fetch y lo vuelve a valores primitivos
    const data = await peticion.json();//accede ala peticion anterior pero ahora lo vuelve .json para
    //que sea un objeto
    return data//retorna data que es el objeto con los valoers
}

export default solicitud //se exporta para que todos los modulos hagan uso de este por eso no se 
// encuentra en index ya que todos los modulos ya acceden a este
