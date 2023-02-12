import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export default function YourDailyGoals({goalsAchieved, allWeekPercentage}) {

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
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '4%'}}>
            {isDesktop &&
                <div style={containerStyle}>

                    <div style={{position: 'absolute', top: '0', left: '0', margin: '5px 0 0 20px'}}>
                            <div style={{fontWeight: '800', fontSize: '1.2em'}}>Your daily goals</div>
                            <div style={{marginTop: '6px'}}>This Week</div>
                    </div>

                    <div style={{position: 'absolute', top: '0', left: '0', margin: '77px 0 0 20px'}}>
                        <div style={{color: 'rgb(30, 86, 169)', fontSize:'1.4em', fontWeight: '700'}}>{goalsAchieved}/7</div>
                        <div>Achieved</div>
                    </div>

                    <div style={gridStyle}>
                        {allWeekPercentage.map((eachDay, idx) => {
                            return (
                            <div style={{position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'flex-end'}} key={idx}>
                                <div style={{width: '70%', marginBottom: '4px'}}>
                                    <CircularProgressbar value={eachDay}/>
                                </div>
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
                <div style={contianerStyleSmallScreen}>

                    <div style={{position: 'absolute', top: '0', left: '0', margin: '5px 0 0 20px'}}>
                            <div style={{fontWeight: '800', fontSize: '1em'}}>Your daily goals</div>
                            <div style={{marginTop: '6px', fontSize: '0.8em'}}>This Week</div>
                    </div>

                    <div style={{position: 'absolute', top: '0', left: '0', margin: '77px 0 0 20px'}}>
                        <div style={{color: 'rgb(30, 86, 169)', fontSize:'1.2em', fontWeight: '700'}}>{goalsAchieved}/7</div>
                        <div style={{fontSize: '0.8em'}}>Achieved</div>
                    </div>

                    <div style={gridStyleSmallScreeen}>
                        {allWeekPercentage.map((eachDay, idx) => {
                            return (
                            <div style={{position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'flex-end'}} key={idx}>
                                <div style={{width: '70%', marginBottom: '4px'}}>
                                    <CircularProgressbar value={eachDay}/>
                                </div>
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
