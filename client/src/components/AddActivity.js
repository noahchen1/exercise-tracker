import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import DateTimePicker from 'react-datetime-picker'
import { useMediaQuery } from 'react-responsive'
import { serverUrl } from '../url/serverUrl'

export default function AddActivity() {

    const [username, setUsername] = useState()
    const [users, setUsers] = useState([])
    const [title, setTitle] = useState('')
    const [activity, setActivity] = useState('jogging')
    const [startTime, setStartTime] = useState(new Date())
    const [duration, setDuration] = useState(0)

    const isDesktop = useMediaQuery({
        query: '(min-width: 1000px)'
    })

    const isSmallScreen = useMediaQuery({
        query: '(max-width: 999px)'
    })

    useEffect(() => {
        axios.get(`${serverUrl}/users/`)
        .then(res => {
            setUsers(res.data.map(user => user.username))
            setUsername(res.data[0].username)
        })
    }, [])

    const onSubmit = e => {
        e.preventDefault()

        const newActivity = {
            username: username,
            title: title,
            activity: activity,
            start: startTime,
            duration: duration,
        }

        axios.post(`${serverUrl}/activities/add`, newActivity)
            .then(res => console.log(res.data))
    }

    const onChangeUsername = e => {
        setUsername(e.target.value)
    }

    const onChangeTItle = e => {
        setTitle(e.target.value)
    }

    const onChangeActivity = e => {
        setActivity(e.target.value)
    }

    const onChangeDuration = e => {
        setDuration(e.target.value)
    }


    const formStyle = {
        display: 'flex',
        justifyContent: 'center',
        color: 'rgba(0, 0, 0, 0.7)'
    }

    const mainContainerStyle = {
        width: '62%',
        height: '100%'
    }

    const mainContainerStyleSmall = {
        width: '62%',
        width: '240px',
        height: '100%'
    }

    const selectUsernameStyle = {
        display: 'flex',
        justifyContent: 'center'
    }

    const saveButtonStyle = {
        padding: '5px 10px',
        borderRadius: '10px',
        backgroundColor: 'rgb(68, 68, 68)',
        color: 'white',
        fontSize: '1rem',
        fontWeight: '600',
        boxShadow: '0px 9px 15px -7px rgba(0, 0, 0, 0.3)',
        marginTop: '33px'
    }

    return (
        <form onSubmit={onSubmit} style={formStyle}>

            {isDesktop &&
                <div style={mainContainerStyle}>
                    <div style={selectUsernameStyle}>
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
                    <div style={{marginTop: '20%'}}>
                        <div style={{marginBottom: '30px'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <span>Title</span>
                                <input 
                                    type='text'
                                    placeholder='title'
                                    value={title}
                                    onChange={onChangeTItle}
                                    style={{width: '70px', outline: 'none'}}
                                />
                            </div>
                            <hr />
                        </div>

                        <div style={{marginBottom: '30px'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <span>Activity</span>
                                <select value={activity} onChange={onChangeActivity} style={{width: '70px'}}>
                                    <option value='jogging'>Jogging</option>
                                    <option value='running'>Running</option>
                                    <option value='walking'>Walking</option>
                                    <option value='bicycling'>Bicycling</option>
                                    <option value='weight lifting: general'>Weight Lifting: general</option>
                                    <option value='aerobics: low impact'>Aerobics: low impact</option>
                                    <option value='aerobics: high impact'>Aerobics: high impact</option>
                                    <option value='rowing'>Rowing</option>
                                    <option value='kayaking'>Kayaking</option>
                                    <option value='swimming'>Swimming</option>
                                </select>
                            </div>
                            <hr />
                        </div>

                        <div>
                            <div>
                                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '30px'}}>
                                    <span>Start</span>
                                    <span>
                                        <DateTimePicker 
                                            value={startTime}
                                            onChange={setStartTime}
                                        />
                                    </span>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <span>Duration</span>
                                    <div>
                                        <input 
                                            type='text'
                                            value={duration}
                                            onChange={onChangeDuration}
                                            style={{width: '50px'}}
                                        />
                                        <span>min</span>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                        </div>               
                    </div>
    

                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button style={saveButtonStyle}>Save</button>
                    </div>  
                </div>          
            }

            {isSmallScreen &&
                <div style={mainContainerStyleSmall}>
                    <div style={selectUsernameStyle}>
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
                    <div style={{marginTop: '20%'}}>
                        <div style={{marginBottom: '30px'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <span>Title</span>
                                <input 
                                    type='text'
                                    placeholder='title'
                                    value={title}
                                    onChange={onChangeTItle}
                                    style={{width: '70px', outline: 'none'}}
                                />
                            </div>
                            <hr />
                        </div>

                        <div style={{marginBottom: '30px'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <span>Activity</span>
                                <select value={activity} onChange={onChangeActivity} style={{width: '70px'}}>
                                    <option value='jogging'>Jogging</option>
                                    <option value='running'>Running</option>
                                    <option value='walking'>Walking</option>
                                    <option value='bicycling'>Bicycling</option>
                                    <option value='weight lifting: general'>Weight Lifting: general</option>
                                    <option value='aerobics: low impact'>Aerobics: low impact</option>
                                    <option value='aerobics: high impact'>Aerobics: high impact</option>
                                    <option value='rowing'>Rowing</option>
                                    <option value='kayaking'>Kayaking</option>
                                    <option value='swimming'>Swimming</option>
                                </select>
                            </div>
                            <hr />
                        </div>

                        <div>
                            <div>
                                <div style={{marginBottom: '30px'}}>
                                    <span>Start</span>
                                    <span style={{}}>
                                        <DateTimePicker 
                                            value={startTime}
                                            onChange={setStartTime}
                                        />
                                    </span>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <span>Duration</span>
                                    <div>
                                        <input 
                                            type='text'
                                            value={duration}
                                            onChange={onChangeDuration}
                                            style={{width: '50px'}}
                                        />
                                        <span>min</span>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                        </div>               
                    </div>
    

                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button style={saveButtonStyle}>Save</button>
                    </div>  
                </div>          
            }

        </form>
    )
}
