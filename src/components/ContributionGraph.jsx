import React, { useEffect, useState } from 'react'
import classes from '../styles/ContributionGraph.module.css'
import request from '../api/request'
import Cell from './Cell'

export default function ContributionGraph() {
    const [URL,setURL] = useState('https://dpg.gg/test/calendar.json')
    const [laod, setLoad] = useState(false)
    let date = new Date()
    const curMounth = date.getUTCMonth()
    date.setDate(date.getUTCDate() + 1)
    function newDate(){
        date.setDate(date.getUTCDate() - 1)
        return date.toLocaleDateString()
                                        .split('.')
                                        .reverse()
                                        .join('-')
    }
    
    let months = ['Янв.','Февр.','Март', 'Апр.','Май','Июнь','Июль','Авг.','Сент.','Окт.','Нояб.','Дек.']
    const newMonths = []
    for(let i = 0; i < 12; i++){
        newMonths[i] = months[(curMounth + i + 1) % 12]
    } 
    const daysOfTheWeek = ['пн', '', 'ср', '', 'пт', '', '']
    const cell = []
    for(let i = 356; i >= 0; i--){
        cell[i]={
            id: i,
            cellDate: newDate(),
            contributions: 0
        }
    }
    useEffect(()=>{
        request(URL).then((Array=>{
            let ArrayDate = Object.keys(Array)
            ArrayDate.forEach((element, index, array) => {
                let value =  cell.find(item =>{ 
                    return item.cellDate === element
                })
                if(value) cell[value.id].contributions = Array[element]
                })
            }))
            setLoad(true)
    })
  return (
    <>
    <div className={classes.container}>
        {newMonths.map((elem, index)=><div className={classes.months} key={`months${index}`}>{elem}</div>)}
        {daysOfTheWeek.map((elem, index)=><div 
            key={`day${index}`}
            style = {{'gridRow': `${2 + index}`}}
            >{elem}</div>)}
        {cell.map((elem,index) =>
        <Cell 
            id = {`cell${index}`}
            className={`${classes.cell} ${ elem.contributions > 10? classes.color1: '' }`}
            style = {
                    {
                        'gridRow': `${2 + Math.floor(elem.id%7)}`
                    }
            } 
            key = {index}
        ></Cell>)}
    </div>
    </>
  )
}
