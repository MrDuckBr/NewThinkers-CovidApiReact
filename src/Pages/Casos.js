import React from 'react';
import { IoArrowBackOutline } from "react-icons/io5"
import { useState, useEffect } from "react";
import axios from 'axios';
import api from './../Api'
import './../Styles/Casos.css'
import {useParams, useHistory} from "react-router-dom";

const Casos = () =>{
    var history = useHistory();
    const params = useParams(); 
    const [country,setCountry] = useState([]);
    const [List,setList] = useState([]);
    const [ListCountry, setListCountry] = useState ([]);
    const [Vaccines, setVaccines] = useState('casos');
    const [VaccinesCountry , setVaccinesCountry] = useState([]);
    const [StateHook, setStateHook] = useState(false);
    

//json-server --watch db.json --port 3005
async function Country(){
    setCountry(params.country)
}

//https://covid-api.mmediagroup.fr/v1/cases?country=
async function request(){
    const response = await api.get('cases?country='+country)
    const data = await response.data
    //console.log(data)
    var array = []
    var countrys = []
    Object.keys(data).forEach(
      function(item){
        array.push(item)
        var dados = {
            "country":item
        }
        
        countrys.push(Object.assign({}, data[item], dados))  
  });
  console.log(countrys)
  setListCountry(countrys)
  setList(array)
}

useEffect(() => {
    
    Country();
    request();
    
  },[]);


async function toggle(e){
    setVaccines(e.target.value)
    if(e.target.value === 'vacinacao'){
        const response = await api.get('vaccines?country='+country)
        const data = await response.data
        console.log(data.All)
            setVaccinesCountry(data.All)
        }else{
            request();
        }
    }

function back(){
    history.push(`/`)
}


return (
    <div className="Casos">
    <div className="top"> 
    
     <h4 className="voltar" onBack={()=> history.back()}> <   IoArrowBackOutline/></h4>
     <h1 className="titulo">Covid 19 - {country}</h1>
     </div>
     
     <button className="btn" value='casos' onClick ={(e) => toggle(e)}>Casos</button>
     <button className="btn" value='vacinacao' onClick ={(e) => toggle(e)}>Vacinacao</button>

     {Vaccines ==='casos'?
     ListCountry.map((option,index) => {
         return (
            <ul >
                {option.country === 'All'?
                    <li className="destaque"><h2>{country}</h2></li>:
                    <li className="destaque"> <h4>{option.country}</h4></li>
                       
                 }
                <li>População: {option.population}</li>
                <li>Casos Confirmados: {option.confirmed}</li>
                <li>Casos Recuperados: {option.recovered}</li>
                <li>Mortes: {option.deaths}</li>
               
                
             </ul>  
         )
     })
     :
           <ul>
               <h2 className="destaque">{country}</h2>
               
            <li>População: {VaccinesCountry.population}</li>
            <li>Pessoas Vacinadas: {VaccinesCountry.people_vaccinated}</li>
            <li>Pessoas Parcialmente Vacinadas: {VaccinesCountry.people_partially_vaccinated}</li>
            <li>Expectativa de vida: {VaccinesCountry.life_expectancy}%</li>
            </ul>  
        
    }



    </div>
    )
}

export default Casos;