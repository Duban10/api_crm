import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './layout/Layout'
import Inicio from './paginas/Inicio'
import NuevoCliente from './paginas/NuevoCliente.jsx'
import EditarCliente from './paginas/EditarCliente.jsx'
import VerCliente from './paginas/VerCliente.jsx'




function App() {
  

  return (
    <BrowserRouter>
      <Routes>
         {/* se corre la app con la direccion http://localhost:3000/clientes 
              Siempre se va a ejecutar layout y como ruta primera la que dice index, es decir 
              El componente Inicio
         */}
        <Route path="/clientes" element={<Layout/>} >
          {/* El Outlet que se encuentra definido en el Layout va a colocar cualquiera 
          de los siguientes componentes en el contenedor que se le indique en el componente principal
          llamado en este caso Layout
          */}
          <Route index element={<Inicio/>}/>
          <Route path="nuevo" element={<NuevoCliente/>}/>
          <Route path="editar/:id" element={<EditarCliente/>}/>
          <Route path=":id" element={<VerCliente/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
