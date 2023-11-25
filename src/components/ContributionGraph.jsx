import React, { useEffect, useState } from 'react'
import classes from '../styles/ContributionGraph.module.css'
import request from '../api/request'
import Cell from './Cell'

export default function ContributionGraph() {
    const [color, setColor] = useState([])
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
    const cell = []
    for(let i = 356; i >= 0; i--){
        setColor(elem => [...elem ,"rgba(237, 237, 237, 1)"])
        console.log(color)
        cell[i]={
            id: i,
            cellDate: newDate(),
            contributions: 0
        }
    }
    let months = ['Янв.','Февр.','Март', 'Апр.','Май','Июнь','Июль','Авг.','Сент.','Окт.','Нояб.','Дек.']
    const newMonths = []
    for(let i = 0; i < 12; i++){
        newMonths[i] = months[(curMounth + i + 1) % 12]
    } 
    const daysOfTheWeek = ['пн', '', 'ср', '', 'пт', '', '']

    useEffect(()=>{
        request().then((Array=>{
            let ArrayDate = Object.keys(Array)
            ArrayDate.forEach((element, index, array) => {
                let value =  cell.find(item =>{ 
                    return item.cellDate === element
                })
                console.log(value)
                if(value) cell[value.id].contributions = Array[element]
                })
            }))
            addedCell()
    },[])
    function addedCell(){
        return cell.map((elem,index)=>
        <Cell 
            idCell = {elem.contributions}
            className={classes.cell}
            style = {
                    {
                        'gridRow': `${2 + Math.floor(elem.id%7)}`,
                        'backgroundColor': `${elem.contributions < 10 ? 'rgba(237, 237, 237, 1)':'rgba(172, 213, 242, 1)'}`
                    }
            } 
            key = {index}
        ></Cell>)
    }
  return (
    <>
    <div className={classes.container}>
        {newMonths.map((elem, index)=><div className={classes.months} key={`months${index}`}>{elem}</div>)}
        {daysOfTheWeek.map((elem, index)=><div 
            key={`day${index}`}
            style = {{'gridRow': `${2 + index}`}}
            >{elem}</div>)}
        {addedCell()}
    </div>
    </>
  )
}
