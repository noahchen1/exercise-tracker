import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useMediaQuery } from 'react-responsive'
import { CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import exerciseData from './ExcerciseData'
import EnergyExpanded from './EnergyExpanded'
import YourDailyGoals from './YourDailyGoals'


export default function Home() {

    const [username, setUsername] = useState()
    const [users, setUsers] = useState([])
    const [weight, setWeight] = useState(0)
    const [birthday, setBirthday] = useState(0)
    const [gender, setGender] = useState([])
    const [height, setheight] = useState(0)

    const [userBMR, setUserBMR] = useState(0)
    const [milage, setMilage] = useState(0)
    const [allActivites, setAllActivities] = useState()
    const [caloriesToday, setCaloriesToday] = useState(0)
    const [totalCalories, setTotalCalories] = useState(0)
    const [totalMovingMinutes, setTotalMovingMinutes] = useState(0)
    const [weeklyEnergyExpanded, setWeeklyEnergyExpanded] = useState([])
    const [goals, setGoals] = useState([])
    const [allWeekPercentage, setAllWeekPercentage] = useState([])
    const [goalsCompleted, setGoalsCompleted] = useState(0)
    const [trigger, setTrigger] = useState(false)


    const isDesktop = useMediaQuery({
        query: '(min-width: 1000px)'
    })
    

    const isSmallScreen = useMediaQuery({
        query: '(max-width: 999px)'
    })


    
    useEffect(() => {
        axios.get('https://activity-trackerr.herokuapp.com/users/')
        .then(res => {
            setUsers(res.data.map(user => user.username))
            setUsername(res.data[0].username)
            setGoals(res.data.reduce((acc, v) => {
                acc[v.username] = acc[v.username] || []
                acc[v.username].push(v.activityGoal)
                return acc
            }, {}))
            setWeight(res.data.reduce((acc, v) => {
                acc[v.username] = acc[v.username] || []
                acc[v.username].push(v.weight)
                return acc
            }, {}))
            setheight(res.data.reduce((acc, v) => {
                acc[v.username] = acc[v.username] || []
                acc[v.username].push(v.height)
                return acc
            }, {}))
            setBirthday(res.data.reduce((acc, v) => {
                acc[v.username] = acc[v.username] || []
                acc[v.username].push(v.birthday)
                return acc
            }, {}))
            setGender(res.data.reduce((acc, v) => {
                acc[v.username] = acc[v.username] || []
                acc[v.username].push(v.gender)
                return acc
            }, {}))
        })

        // get reuqest to get all the actvities from db, data is in the form {[activity 1], [activity 2], ... }
        // res is then sorted into an object with arrays under each unique username which takes the form {user1: [all activity for user1 ], user2: [all activity for user2]}
        // here reduce loops through all the data, when it gets to the first unique username, it creates an empty array [] with the data from that instance added to this array. 
        // All activities with the same username then gets pushed to the same array. 

        axios.get('https://activity-trackerr.herokuapp.com/activities/')
        .then(res => {
            setAllActivities(res.data.reduce((acc, v) => {
                acc[v.username] = acc[v.username] || []
                acc[v.username].push(v)
                return acc
            }, {}))
        })

        // setting trigger to true signifies the completion of get requests 
        setTrigger(true)

    }, [])


    useEffect(() => {

        // setting a condition to only render the code below when the get requests are complete 
        if(trigger === false) return
        if(!allActivites) return
        if(!username) return

        // generating an array with the current week's dates starting from Sat to Fri to help sorting the activities by the current week days

       const curr = new Date();
       const first = curr.getDate() - curr.getDay() - 1; // Start from Saturday
       const firstDate = new Date(curr.setDate(first));
       const lastDate = new Date(curr.setDate(firstDate.getDate() + 6));

       const dateArray = []
       for (var i=0; i<7; i++) {
           dateArray.push(new Date(curr.setDate(firstDate.getDate() + i)).toLocaleDateString())
       }

       // sorting calorie data from ExcerciseData.js as constants for different weights

       const exerciseDataAsArray = Object.entries(exerciseData)
       const data125lbs = exerciseDataAsArray[0][1][0]
       const data155lbs = exerciseDataAsArray[1][1][0]
       const data185lbs = exerciseDataAsArray[2][1][0]

       // Calculate total calories from activities today 

       const activitiesToday = []
       const durationsToday = []

       const today = allActivites[username].map(item => {
           const todaysDate = new Date().toLocaleDateString()
           const allDays = new Date(item.start).toLocaleDateString()
           if(allDays === todaysDate) {
               const activityToday = item.activity
               const durationToday = item.duration
               activitiesToday.push(activityToday)
               durationsToday.push(durationToday)
           }
       })

       // calculate calories from activities TODAY based on user's defined weight 

       if(weight[username] <= 125) {
           const totalCaloriesToday = durationsToday.map((v, i) => v / 30 * data125lbs[activitiesToday[i]]).reduce((x, y) => parseInt(x + y), 0)
            setCaloriesToday(totalCaloriesToday)
       } else if(weight[username] > 125 && weight[username] <= 155) {
           const totalCaloriesToday = durationsToday.map((v, i) => v / 30 * data155lbs[activitiesToday[i]]).reduce((x, y) => parseInt(x + y), 0)
           setCaloriesToday(totalCaloriesToday)
       } else {
           const totalCaloriesToday = durationsToday.map((v, i) => v / 30 * data185lbs[activitiesToday[i]]).reduce((x, y) => parseInt(x + y), 0)
           setCaloriesToday(totalCaloriesToday)
       }


       // calculating milage if activities today involve running or walking 

       const getMilage = ()=> {
           const milageFromActivities = []
           activitiesToday.map((v, i)=> {
            if(v.toLowerCase() == 'jogging') {
                milageFromActivities.push(durationsToday[i] / 60 * 5)
            } else if(v.toLowerCase() == 'running') {
                milageFromActivities.push(durationsToday[i] / 60 * 7.5)
            }
           })
           return milageFromActivities
       }

       activitiesToday.forEach(item => {
           if(item.toLowerCase() == 'jogging' || item.toLowerCase() == 'running') {
               setMilage(getMilage())
           }
       })

       // calculating total moving minutes from durationsToday 

       setTotalMovingMinutes(durationsToday.reduce((x, y)=> x + y, 0))


       // initiating empty objects representing each day of a week to store calories from activities and duration for each activity respectively.

       const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
       const newObject = {Sat:[], Sun: [], Mon: [], Tue:[], Wed:[], Thu:[], Fri: []}
       const caloriesPerDay = {Sat:[], Sun: [], Mon: [], Tue:[], Wed:[], Thu:[], Fri: []}
       const durationPerActivity = {Sat:[], Sun: [], Mon: [], Tue:[], Wed:[], Thu:[], Fri: []}
   

       if(weight[username] <= 125) {
        allActivites[username].forEach(item => {
            const dateObj = new Date(item.start)
            if(dateArray.includes(dateObj.toLocaleDateString())) {
                const day = days[dateObj.getDay()]
                newObject[day].push(item.activity)
                caloriesPerDay[day].push(data125lbs[item.activity] ?? 0)
                durationPerActivity[day].push(item.duration ?? 0)
            }
        })
       } else if(weight[username] > 125 && weight[username] <= 155) {
        allActivites[username].forEach(item => {
            const dateObj = new Date(item.start)
            if(dateArray.includes(dateObj.toLocaleDateString())) {
                const day = days[dateObj.getDay()]
                newObject[day].push(item.activity)
                caloriesPerDay[day].push(data155lbs[item.activity] ?? 0)
                durationPerActivity[day].push(item.duration ?? 0)
            }
        })
       } else {
        allActivites[username].forEach(item => {
            const dateObj = new Date(item.start)
            if(dateArray.includes(dateObj.toLocaleDateString())) {
                const day = days[dateObj.getDay()]
                newObject[day].push(item.activity)
                caloriesPerDay[day].push(data185lbs[item.activity] ?? 0)
                durationPerActivity[day].push(item.duration ?? 0)
            }
        })
       }

       // Some sorting below to make calories and duration arrays for the current nicer for manipulation

       const dailyActivity = Object.entries(durationPerActivity).map(item => {
            let eachDuration = item.slice(1)[0]
            if (eachDuration.length === 0) {
                eachDuration.push(0)
            }
            return eachDuration
       })


       const dailyCal = Object.entries(caloriesPerDay).map(item => {
           let eachCal = item.slice(1)[0]

           if (eachCal.length === 0) {
                eachCal.push(0)
            }
        return eachCal
       })


       const totalCal = dailyActivity.map((duration, i) => {
           const eachDayCalories = dailyCal[i]
           return duration.map((v, j) => v / 30 * eachDayCalories[j]).reduce((x, y) => parseInt(x + y), 0)
       })


       // Calculate User's Age

       const getUserAge = ()=> {
           const differenceFromToday = new Date() - new Date(birthday[username]).getTime()
           const differenceInMiliseconds = new Date(differenceFromToday)
           return Math.abs(differenceInMiliseconds.getUTCFullYear() - 1970)
       }

       const userAge = getUserAge()

       // Calculate BMR 

       const userGender = gender[username]

       const getUserBMR = ()=> {
            if(!userGender) return
            if (userGender[0].toLowerCase() == 'male') {
                const BMR = 65 + (6.23 * weight[username]) + (12.7 * height[username] * 0.39) - (6.8 * userAge)
                return BMR
            } else if (userGender[0].toLowerCase() == 'female') {
                const BMR = 655 + (4.35 * weight[username]) + (4.7 * height[username] * 0.39) - (4.7 * userAge)
                return BMR
            }
       }

       setUserBMR(parseInt(getUserBMR()))
       setTotalCalories(parseInt(getUserBMR() + caloriesToday))


        // get energy expanded this week and calculate their percentage with respect to the day with the most activities/calories

       const totalCalAllWeek = totalCal.map(item => item + userBMR)
       const highestEnergyExpand = Math.max(...totalCalAllWeek)
       const energyExpandedBarLength = totalCalAllWeek.map(item => (item / highestEnergyExpand).toFixed(2))
       setWeeklyEnergyExpanded(energyExpandedBarLength)

       // caluclate daily goal completion 

       

       const allWeekPercentage = totalCalAllWeek.map(each => 
        parseInt(each / goals[username] * 100)
       )


       // # of goals completed in this week 

       let goalsCompleted = 0
        allWeekPercentage.forEach(item => {
            if(item >= 100) {
               goalsCompleted += 1
            }
        })

       setGoalsCompleted(goalsCompleted)

       setAllWeekPercentage(allWeekPercentage)


    }, [allActivites, username, userBMR, gender])



    const onChangeUsername = e => {
        setUsername(e.target.value)
    }

    const getTodayPercentage = () => {
        return parseInt(totalCalories / goals[username] * 100)
    }


    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div>
                    <select
                        required
                        value={username}
                        onChange={onChangeUsername}
                    >
                        {
                            users.map(user => 
                                <option
                                    key={user}
                                    value={user}
                                >
                                    {user}
                                </option>
                            )
                        }
                    </select>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '5%'}}>
                <div style={{display:'flex', width: '50%', minWidth: '250px'}}>
                    <div style={{width: '60%', minWidth: '100px'}}>
                        <CircularProgressbar value={getTodayPercentage()} text={totalCalories}/>
                    </div>
                    

                    {isDesktop &&
                        <div style={{marginLeft: '20%', display: 'flex', width: '100px', flexWrap: 'wrap', alignItems: 'center'}}>
                            <div>
                                <span style={{color: 'rgb(30, 86, 169)', fontSize:'1.4em', fontWeight: '700'}}>{totalCalories}</span>
                                <span style={{color: 'rgba(0, 0, 0, 0.7)', marginLeft: '5px'}}>Cal</span>
                                <div style={{display: 'flex', fontSize: '0.8em', fontWeight: '600'}}>
                                    <div style={{display:'flex', justifyContent: 'center', height: '25px', flexWrap: 'wrap', width: '40px', marginRight: '5px'}}>
                                        <span>Resting</span>
                                        <span>{userBMR}</span>
                                    </div>
                                    <div style={{display:'flex', justifyContent: 'center', height: '25px', flexWrap: 'wrap', width: '40px'}}>
                                        <span>Active</span>
                                        <span>{caloriesToday}</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{width: '100%'}}>
                                <span style={{color: 'rgb(30, 86, 169)', fontSize:'1.4em', fontWeight: '700'}}>{milage}</span>
                                <span style={{color: 'rgba(0, 0, 0, 0.7)', marginLeft: '5px'}}>mi</span>
                            </div>
                            <div style={{width: '100%'}}>
                                <span style={{color: 'rgb(30, 86, 169)', fontSize:'1.4em', fontWeight: '700'}}>{totalMovingMinutes}</span>
                                <span style={{color: 'rgba(0, 0, 0, 0.7)', marginLeft: '5px'}}>move min</span>
                            </div>
                        </div>
                    }

                    {isSmallScreen &&
                        <div style={{marginLeft: '5%', display: 'flex', width: '100px', flexWrap: 'wrap', alignItems: 'center'}}>
                            <div>
                                <span style={{color: 'rgb(30, 86, 169)', fontSize:'1.2em', fontWeight: '700'}}>{totalCalories}</span>
                                <span style={{color: 'rgba(0, 0, 0, 0.7)', marginLeft: '10px'}}>Cal</span>
                                <div style={{display: 'flex', fontSize: '0.8em', fontWeight: '600'}}>
                                    <div style={{display:'flex', justifyContent: 'center', height: '25px', flexWrap: 'wrap', width: '40px', marginRight: '5px'}}>
                                        <span>Resting</span>
                                        <span>{userBMR}</span>
                                    </div>
                                    <div style={{display:'flex', justifyContent: 'center', height: '25px', flexWrap: 'wrap', width: '40px'}}>
                                        <span>Active</span>
                                        <span>{caloriesToday}</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{width: '100%'}}>
                                <span style={{color: 'rgb(30, 86, 169)', fontSize:'1.2em', fontWeight: '700'}}>{milage}</span>
                                <span style={{color: 'rgba(0, 0, 0, 0.7)', marginLeft: '5px'}}>mi</span>
                            </div>
                            <div style={{width: '100%'}}>
                                <span style={{color: 'rgb(30, 86, 169)', fontSize:'1.2em', fontWeight: '700'}}>{totalMovingMinutes}</span>
                                <span style={{color: 'rgba(0, 0, 0, 0.7)', marginLeft: '5px'}}>move min</span>
                            </div>
                        </div>
                    }

                </div>     
            </div>

            <EnergyExpanded 
                caloriesToday={totalCalories}
                caloriesThisWeek={weeklyEnergyExpanded}
            />

            <YourDailyGoals 
                goalsAchieved={goalsCompleted}
                allWeekPercentage={allWeekPercentage}
            />

        </div>


        
    )
}
