import React from 'react'
import { useMediaQuery } from 'react-responsive'


export default function EnergyExpanded({caloriesToday, caloriesThisWeek}) {

    const isDesktop = useMediaQuery({
        query: '(min-width: 1000px)'
    })

    const isSmallScreen = useMediaQuery({
        query: '(max-width: 999px)'
    })


    const containerStyle = {
        borderRadius: '19px',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: 'rgba(0, 0, 0, 0.2)',
        boxShadow: '0px 9px 15px -7px rgba(0, 0, 0, 0.3)',
        width: '60%',
        minWidth: '230px',
        height: '150px',
        color: 'rgba(0, 0, 0, 0.7)',
        position: 'relative'
    }

    const contianerStyleSmallScreen = {
        borderRadius: '19px',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: 'rgba(0, 0, 0, 0.2)',
        boxShadow: '0px 9px 15px -7px rgba(0, 0, 0, 0.3)',
        width: '60%',
        minWidth: '280px',
        height: '150px',
        color: 'rgba(0, 0, 0, 0.7)',
        position: 'relative',
        marginTop: '10px'
    }

    const gridStyle = {
        position: 'absolute',
        marginLeft: '50%',
        marginTop: '40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 25px)',
        gridTemplateRows: '60px 15px',
    }

    const gridStyleSmallScreeen = {
        position: 'absolute',
        marginLeft: '50%',
        marginTop: '40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 15px)',
        gridTemplateRows: '50px 15px',
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '3%'}}>

            {isDesktop &&
                <div  style={containerStyle}>

                    <div style={{position: 'absolute', top: '0', left: '0', margin: '5px 0 0 20px'}}>
                        <div style={{fontWeight: '800', fontSize: '1.2em'}}>Energy expanded</div>
                        <div style={{marginTop: '6px'}}>This Week</div>
                    </div>

                    <div style={{position: 'absolute', top: '0', left: '0', margin: '77px 0 0 20px'}}>
                        <div>
                            <span style={{color: 'rgb(30, 86, 169)', fontSize:'1.4em', fontWeight: '700'}}>{caloriesToday}</span>
                            <span style={{marginLeft: '2px'}}>cal</span>
                        </div>
                        <div>Today</div>
                    </div>

                    <div style={gridStyle}>
                        {caloriesThisWeek.map(eachDay => {
                            const percentage = eachDay * 100 
                            return (
                            <div style={{position: 'relative', display: 'flex', justifyContent: 'center'}}>
                                <div 
                                    style={{backgroundColor: 'rgb(30, 86, 169)', height: `${percentage}%`, position: 'absolute', width: '50%', bottom: '0'}}
                                />
                            </div>)
                        })}

                        <div style={{textAlign: 'center'}}>S</div>
                        <div style={{textAlign: 'center'}}>S</div>
                        <div style={{textAlign: 'center'}}>M</div>
                        <div style={{textAlign: 'center'}}>T</div>
                        <div style={{textAlign: 'center'}}>W</div>
                        <div style={{textAlign: 'center'}}>T</div>
                        <div style={{textAlign: 'center'}}>F</div>
                    </div>
                </div>
            }

            {isSmallScreen &&
                <div  style={contianerStyleSmallScreen}>

                    <div style={{position: 'absolute', top: '0', left: '0', margin: '5px 0 0 20px'}}>
                        <div style={{fontWeight: '800', fontSize: '1em'}}>Energy expanded</div>
                        <div style={{marginTop: '6px', fontSize: '0.8em'}}>This Week</div>
                    </div>

                    <div style={{position: 'absolute', top: '0', left: '0', margin: '77px 0 0 20px'}}>
                        <div>
                            <span style={{color: 'rgb(30, 86, 169)', fontSize:'1.2em', fontWeight: '700'}}>{caloriesToday}</span>
                            <span style={{marginLeft: '2px', fontSize: '0.8em'}}>cal</span>
                        </div>
                        <div style={{fontSize: '0.8em'}}>Today</div>
                    </div>

                    <div style={gridStyleSmallScreeen}>
                        {caloriesThisWeek.map(eachDay => {
                            const percentage = eachDay * 100 
                            return (
                            <div style={{position: 'relative', display: 'flex', justifyContent: 'center'}}>
                                <div 
                                    style={{backgroundColor: 'rgb(30, 86, 169)', height: `${percentage}%`, position: 'absolute', width: '50%', bottom: '0'}}
                                />
                            </div>)
                        })}

                        <div style={{textAlign: 'center', fontSize: '0.8em'}}>S</div>
                        <div style={{textAlign: 'center', fontSize: '0.8em'}}>S</div>
                        <div style={{textAlign: 'center', fontSize: '0.8em'}}>M</div>
                        <div style={{textAlign: 'center', fontSize: '0.8em'}}>T</div>
                        <div style={{textAlign: 'center', fontSize: '0.8em'}}>W</div>
                        <div style={{textAlign: 'center', fontSize: '0.8em'}}>T</div>
                        <div style={{textAlign: 'center', fontSize: '0.8em'}}>F</div>
                    </div>
                </div>
            }

        </div>
    )
}
