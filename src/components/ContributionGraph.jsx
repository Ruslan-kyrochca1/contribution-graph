import React from 'react'
import classes from '../styles/ContributionGraph.module.css'

export default function ContributionGraph() {
    let item = []
    for(let i = 0; i < 357; i++){
        item.push(i)
    }
    let months = ['Апр.','Май','Июнь','Июль','Авг.','Сент.','Окт.','Нояб.','Дек.','Янв.','Февр.','Март']
    const daysOfTheWeek = ['пн', '', 'ср', '', 'пт', '', '']
  return (
    <>
    <div className={classes.container}>
        {months.map((elem, index)=><div className={classes.months} key={`months${index}`}>{elem}</div>)}
        {daysOfTheWeek.map((elem, index)=><div 
            className={classes} 
            key={`day${index}`}
            style = {{'gridRow': `${2 + index}`}}
            >{elem}</div>)}
        {item.map((elem,index)=><div 
            className={classes.item} 
            style = {
                {'gridRow': `${2 + Math.floor(index%7)}`}
            } 
            key = {index}
        // >{elem}</div>)}
        ></div>)}
    </div>
    </>
  )
}
