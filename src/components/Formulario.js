import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from './Card';

const Formulario = () => {
    const obtenerInfo = ()=>{
        var datos = localStorage.getItem("key");
        if(datos){
            return JSON.parse(datos);
        }else{
            return [];
        }
       }
    const [str, setStr] = useState({str: 0});
    const [registro, setRegistro]=useState(obtenerInfo());
    const [input, setInput] = useState({
        valor: 0,
        lista: '',
        trm: 0
    });

    

   const botonGuardar= async(e) => {
    e.preventDefault();
    if(input.item === 0 || input.lista.trim()===''||input.trm===0){
        return;
    }
    console.log(input)
    try {
        let config = {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                valor: new Intl.NumberFormat().format(input.valor), 
                lista: input.lista, 
                trm: new Intl.NumberFormat().format(input.trm) 
            })    
        }

        let res = await axios.post('https://httpbin.org/post', config);
        
        let data = res.data.json.body;
        setRegistro([...registro,JSON.parse(data)]);
        console.log(registro);
        setInput({
            valor: 0,
            lista: '',
            trm: 0
        });
        document.getElementById("form").reset();
        

    } catch (error) {
        console.log(error.message)
    }

   }

   useEffect(()=>{
     localStorage.setItem("key", JSON.stringify(registro));
   },[registro]);
   
    // const valor = new Intl.NumberFormat().format(e.target.value);
    
   
   const changeList = (e) => {
      try {
        setInput({
            ...input,
          [e.target.name]: e.target.value
          
          })
      } catch (error) {
        console.log(error.message)
      }
      
   }

   const botonStr = (e) => {
      setStr({...str,
       str: e.target.value
    });
   }

   const botonRating = (e) => {
     e.preventDefault(e);
    
     if(parseInt(str.str) === 0 || parseInt(str.str) < 0 || parseInt(str.str) >= 6 ) return alert('debes de ingresar un entre 1 al 5');

     if(parseInt(str.str) === 5) return alert("lleno lleno lleno lleno lleno");
     if(parseInt(str.str) < 5 && parseInt(str.str) > 4 ) return alert("lleno lleno lleno lleno medio");
     if(parseInt(str.str) === 4 ) return alert("lleno lleno lleno lleno vacio");
     if(parseInt(str.str) < 4 && parseInt(str.str) > 3) return alert("lleno lleno lleno medio vacio");
     if(parseInt(str.str) === 3) return alert("lleno lleno lleno vacio vacio");
     if(parseInt(str.str) < 3 && parseInt(str.str) > 2) return alert("lleno lleno medio vacio vacio");
     if(parseInt(str.str) === 2) return alert("lleno lleno vacio vacio vacio");
     if(parseInt(str.str) < 2 && parseInt(str.str) > 1) return alert("lleno medio vacio vacio vacio");
     if(parseInt(str.str) === 1) return alert("lleno vacio vacio vacio vacio");

   }

   
   let count = 1;

    return ( 
        <div>
            <form onSubmit={botonGuardar} id='form' className='reform'>
                <div >
                    <label className='label'>Valor</label>
                    <input 
                    type='number'
                    value={input.valor}
                    name='valor'   
                    className='input'             
                    placeholder='ingresa un valor'
                    onChange={e=>changeList(e)}
                    />
                </div>
                <div>
                    <select
                      name='lista'
                      value={input.lista}
                      onChange={e=>changeList(e)}
                      className='input'
                    >
                        <option value=''>seleccione</option>
                        <option value="prueba1">prueba</option>
                        <option value="prueba2">prueba1</option>
                        <option value="prueba3">prueba2</option>
                    </select>
                </div>
                <div>
                    <label className='label'>TMR</label>
                    <input 
                        type='number'
                        className='input'
                        value={input.trm}
                        name='trm'
                        onChange={e=>changeList(e)}
                    />
                </div>
                <button
                  className='btn'
                  type='submit'
                >Guardar</button>
            </form>
            <div>
                
                <div className='form1'>
                    <label className='table1'>
                        Consecutivo
                    </label>
                    <label className='table1'>
                        Valor
                    </label>
                    <label className='table1'>
                        Descripcion del campo seleccionado
                    </label>
                    <label className='table1'>
                        TRM
                    </label>
                </div>
                <div>
                {registro?.map((r)=>
                  <Card 
                    count={count++}
                    valor={r.valor}
                    lista={r.lista}
                    trm={r.trm}
                  />
                )}
                </div>
            </div>
            <div>
                <input 
                   type="number"
                   value={str.str}
                   name='str'
                   onChange={e=>botonStr(e)}
                />
                <button onClick={e=>botonRating(e)}>rating</button>
            </div>
        </div>
     );
}
 
export default Formulario;