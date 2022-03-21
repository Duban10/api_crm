import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Formulario from '../components/Formulario'

const EditarCliente = () => {

    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(true)


    // el parametro que le estamos pasando en la ruta es llamado como id
    const {id} = useParams()

    useEffect(() => {
        
        const obtenerClienteAPI = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()

                setCliente(resultado)
            } catch (error) {
                console.log(error)
            }
            // setTimeout(() => {
            //     setCargando(!cargando)

            // }, 3000)
            setCargando(!cargando)
        }
        obtenerClienteAPI()
    }, [])

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
      <p className='mt-3'>Utliza este Formulario para Editar el Cliente </p>

        {cliente?.nombre ? (
          <Formulario
            cliente={cliente}
            cargando={cargando}
          />
        ): <p>ID de Cliente NO Válido</p>  }
    </>
  )
}

export default EditarCliente
