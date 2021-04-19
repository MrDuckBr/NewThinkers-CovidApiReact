import React from 'react';
import { useState, useEffect } from "react";
import api from '../Api'
import axios from 'axios'
import './../Styles/Buscas.css'
import { useHistory } from "react-router-dom";



const Buscas = () =>{
  var history = useHistory();
    const [list, setList] = useState([]);
    const [country, setCountry] = useState([]);
    const [selectValue, setSelectValue] = useState("Afghanistan");
    const [UpdateHook, setUpdateHook] = useState(false);
    
    
    
  
    async function request(){
      console.log('entrei aqui')
      const response = await api.get('cases')
      console.log(response)
      const data = await response.data
      //console.log(data)
      var array = [] // nome do pais
      var countrys = [] // obj de cada pais
      Object.keys(data).forEach(
        function(item){
          countrys.push(item)
          
          array.push(data[item].All)  
    });
    //console.log(array)
    setList(array)
    setCountry(countrys)
     
     // console.log(array)
      
    }
  
    async function selectCountry() {
     list.map((value)=>{
       if(value.country === selectValue){
         history.push(`/${value.country}`)
       }
     })
     
    }

    useEffect(() => {
        request()
      
    },[]);
  
    return (
      <div className="Buscas">
            <div className="Titulo"><h1>Covid 19</h1></div>
            
             
  
              <div >
            <select className="Select" value={selectValue} onChange={e => setSelectValue(e.target.value)}>
              {country.map((option,index) => {
                return(
                <option value={option}>{option}</option>
                );
                })}
            </select>
            <button className="Botao" onClick={selectCountry}>Buscar</button>
          </div>
             
  
  
  
      </div>
            
      
    )
     

}



export default Buscas;