import React from 'react'
import { Formik, Form, Field} from 'formik'
import { useNavigate } from 'react-router-dom' 
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'


const Formulario = ({cliente, cargando}) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre:Yup.string()
                    .min(3, 'El Nombre es muy Corto')
                    .max(20, 'El Nombre es muy Largo')
                    .required('El Nombre del Cliente es Obligatorio'),
        empresa:Yup.string()
                    .required('El Nombre de la Empresa es Obligatorio'),
        email:Yup.string()
                    .email('Email NO Valido')
                    .required('El E-mail es Obligatorio'),
        telefono:Yup.number()
                    .positive('El Número no es válido')
                    .integer('El Número no es válido')
                    .typeError('El Número no es válido')
        
    })

    const hanledSubmit =  async (valores) => {
        try {
            let respuesta
            if(cliente.id){
                // EDITANDO UN REGISTRO
                const url = `http://localhost:4000/clientes/${cliente.id}` 
                // por defecto fetch utiliza un get, en este caso como es POST se debe utilizar 
                // el metodo, el body y el headers
                respuesta = await fetch(url, {
                    method: 'PUT',
                    // convertir el arreglo en JSON
                    body: JSON.stringify(valores),
                    // Especificar el tipo de contenido ya que JSON-SERVER asi lo exige
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                               
            }else{ 
                // CREANDO NUEVO REGISTRO

                // /clienets y de tipo POST para crear un nuevo registro
                const url = 'http://localhost:4000/clientes'
                // por defecto fetch utiliza un get, en este caso como es POST se debe utilizar 
                // el metodo, el body y el headers
                respuesta = await fetch(url, {
                    method: 'POST',
                    // convertir el arreglo en JSON
                    body: JSON.stringify(valores),
                    // Especificar el tipo de contenido ya que JSON-SERVER asi lo exige
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })                
            }
            
            await respuesta.json()  
            navigate('/clientes')
        } catch (error) {
            console.log(error)
        }
    }

  return (
    cargando ? <Spinner/> : (
        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
            <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
            {cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
            </h1>

            <Formik 
            // valores iniciales que van a tener los inputs asociados con el name del input
                initialValues={{
                    // si el objeto cliente tiene cualquiera de los campos como nombre, email ... pintelos
                    // sino dejelos vacios
                    // nombre: cliente.nombre ? cliente.nombre : '',
                    nombre: cliente?.nombre ?? '',                
                    empresa: cliente?.empresa ?? '',
                    email: cliente?.email ?? '',
                    telefono: cliente?.telefono ?? '',
                    notas: cliente?.notas ?? ''

                }}
                // pinta los valores iniciales en el front
                enableReinitialize={true}
                // guarda lo que esta en el input al objeto de initialValues y ejecuta lo que esta
                // en la funcion hanledSubmit con los valores del objeto
                onSubmit={ async (values, {resetForm}) => { 
                    await hanledSubmit(values)
                    //  resetForm resetear el formulario cuando se guarde
                    // async - await se coloca con el fin de que cuando se envien los datos nos aseguremos
                    // que si se enviaron y no se fueron como vacios por la propiedad de resetForm
                    resetForm()
                }}
                validationSchema={nuevoClienteSchema}
            >
                {/* En data se encuentra una variable llamada errors que es la que nos interesa */}
                {({errors, touched}) => {
                    //console.log(data)
                    return  (

                    <Form
                        className='mt-10'
                    >
                        <div className='mb-4'>
                            <label htmlFor="nombre" className='text-gray-800'>Nombre:</label>
                            <Field 
                                id='nombre' 
                                type="text" 
                                className='mt-2 block w-full p-3 bg-gray-50' 
                                placeholder="Nombre del Cliente"
                                name='nombre'
                            />
                            {/* <ErrorMessage name="nombre" /> */}
                            {errors.nombre && touched.nombre ? (
                                <Alerta>{errors.nombre}</Alerta>
                            ): null                        
                            }
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="empresa" className='text-gray-800'>Empresa:</label>
                            <Field 
                                id='empresa' 
                                type="text" 
                                className='mt-2 block w-full p-3 bg-gray-50' 
                                placeholder="Empresa del Cliente"
                                name='empresa'
                            />
                            {errors.empresa && touched.empresa ? (
                                <Alerta>{errors.empresa}</Alerta>
                            ): null                        
                            }
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="email" className='text-gray-800'>E-mail:</label>
                            <Field 
                                id='email' 
                                type="email" 
                                className='mt-2 block w-full p-3 bg-gray-50' 
                                placeholder="E-mail del Cliente"
                                name='email'
                            />
                            {errors.email && touched.email ? (
                                <Alerta>{errors.email}</Alerta>
                            ): null                        
                            }
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="telefono" className='text-gray-800'>Telefono:</label>
                            <Field 
                                id='telefono' 
                                type="tel" 
                                className='mt-2 block w-full p-3 bg-gray-50' 
                                placeholder="Telefono de del Cliente"
                                name='telefono'
                            />
                            {errors.telefono && touched.telefono ? (
                                <Alerta>{errors.telefono}</Alerta>
                            ): null                        
                            }
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="notas" className='text-gray-800'>Notas:</label>
                            <Field 
                                as='textarea'
                                id='notas' 
                                type="text" 
                                className='mt-2 block w-full p-3 bg-gray-50 h-40' 
                                placeholder="Notas del Cliente"
                                name='notas'
                            />
                        </div>
                        <input 
                            type="submit" 
                            value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'} 
                            className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg'/>
                    </Form>
                )}}
            </Formik>

        </div>
    )
  )
}

// Si el formulario no tiene props se va ejecutar este codigo, si trae un props se ejecutara 
// el formulario de arriba
Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario
