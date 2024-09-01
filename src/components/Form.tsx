import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import React, { useState, FormEvent, useEffect, ChangeEvent } from 'react';

interface FormProps {
    name: string;
    email: string;
    age: string;
    fun: string;
    addInfo?: string;
    wastTime: string;
}

const Form = () => {
    const [userData, setUserData] = useState<FormProps>(
        {
            name: "",
            email: "",
            age: "",
            fun: "",
            addInfo: "",
            wastTime: ""
        }
    )
    const [additional, setAdditional] = useState(false);
    const [addInfo, setAddInfo] = useState("");
    // const [name, setName] = useState("");
    const [submit, setSubmit] = useState(false);
    const req_url = `${process.env.REACT_APP_POST_API}/post.php`;
    const formHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const { name, value } = event.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }))
        if(name === "fun") {
            setAdditional(value === "home");
            if(value !== "home") {
                setUserData(prevState => ({
                    ...prevState,
                    addInfo: ""
                }))
            };
        };
        // setName(event.target.value);
    }

    const addQuesionHandler = (event: SelectChangeEvent) => {
        setUserData(prevState => ({
            ...prevState,
            addInfo: event.target.value
        }))
    };

    const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData();
        Object.entries(userData).forEach(([key, value]) => {
            formData.append(key, value);
        })
        
        try{
            const obj = await axios.post(
                req_url,
                formData
            )
            console.log(obj.data);
            // setName(obj.data);
            setSubmit(true);
            setUserData({
                name: "",
                email: "",
                age: "",
                fun: "",
                addInfo: "",
                wastTime: ""
            });
            setAdditional(false);
            // if(event.target instanceof HTMLFormElement) {
            //     event.target.reset();
            // };
        } catch(error) {
            console.log("送信中にエラーが起きました。", error);
        }
    }

    useEffect(() => {
        // console.log(name);
        console.log(submit);
    }, [submit]);

    return (
        <Box component="form" onSubmit={onSubmit} sx={{ 
            bgcolor: 'background.paper',
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            minWidth: 300,
            width: '80%',
            ml: 'auto',
            mr: 'auto',
            mt: '5vh'
        }}
        >
            <div className="flex flex-col m-4">
                <Typography variant="h3" gutterBottom>娯楽調査</Typography>
                <div className='w-full border-b border-gray-300 pb-2'>
                    <Typography 
                        variant='h5' 
                        gutterBottom 
                        sx={{
                            textAlign: 'left',
                            mt: 1,
                            ml: 0.5,
                            mb: 1
                        }}
                    >
                        お名前
                    </Typography>
                    <TextField 
                        id="name" 
                        name="name"
                        label="お名前" 
                        variant="outlined" 
                        value={userData.name}
                        fullWidth
                        onChange={formHandler}
                    />
                </div>
                <div className='w-full border-b border-gray-300 pb-2'>
                    <Typography 
                        variant='h5' 
                        gutterBottom 
                        sx={{
                            textAlign: 'left',
                            mt: 1,
                            ml: 0.5,
                            mb: 1
                        }}
                    >
                        email
                    </Typography>
                    <TextField 
                        id="email" 
                        name="email"
                        label="メールアドレス" 
                        variant="outlined" 
                        value={userData.email}
                        fullWidth
                        onChange={formHandler}
                    />
                </div>
                <div className='w-full border-b border-gray-300 pb-2'>
                    <Typography 
                        variant='h5' 
                        gutterBottom 
                        sx={{
                            textAlign: 'left',
                            mt: 1,
                            ml: 0.5,
                            mb: 1
                        }}
                    >
                        年齢
                    </Typography>
                    <TextField 
                        id="age" 
                        name="age"
                        label="年齢" 
                        variant="outlined" 
                        value={userData.age}
                        fullWidth
                        onChange={formHandler}
                    />
                </div>
                <div className='w-full border-b border-gray-300 pb-2'>
                    <Typography 
                        variant='h5' 
                        gutterBottom 
                        sx={{
                            textAlign: 'left',
                            mt: 1,
                            ml: 0.5,
                            mb: 1
                        }}
                    >
                        お休みの日は何をしますか
                    </Typography>
                    <FormControl fullWidth>
                        <InputLabel  id='select-fun'>趣味</InputLabel>
                        <Select
                            labelId='select-fun'
                            id='fun'
                            name="fun"
                            value={userData.fun}
                            label="趣味"
                            onChange={formHandler}
                            sx={{textAlign: "left"}}
                        >
                            <MenuItem value={"cafe"}>カフェ</MenuItem>
                            <MenuItem value={"walk"}>散歩</MenuItem>
                            <MenuItem value={"gym"}>ジム</MenuItem>
                            <MenuItem value={"party"}>飲み会</MenuItem>
                            <MenuItem value={"date"}>デート</MenuItem>
                            <MenuItem value={"home"}>お家でまったり動画</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                    {additional ?
                        <div className='w-full border-b border-gray-300 pb-2'>
                            <Typography 
                                variant='h5' 
                                gutterBottom 
                                sx={{
                                    textAlign: 'left',
                                    mt: 1,
                                    ml: 0.5,
                                    mb: 1
                                }}
                            >
                                どんな動画を見ますか
                            </Typography>
                            <FormControl fullWidth>
                                <InputLabel  id='select-fun'>動画の種類</InputLabel>
                                <Select
                                    labelId='select-fun'
                                    id='addInfo'
                                    name="addInfo"
                                    value={userData.addInfo}
                                    label="何の動画"
                                    onChange={addQuesionHandler}
                                    sx={{textAlign: "left"}}
                                >
                                    <MenuItem value={"youtube"}>youtube</MenuItem>
                                    <MenuItem value={"japanese-movie"}>邦画</MenuItem>
                                    <MenuItem value={"foriegn-movie"}>洋画</MenuItem>
                                    <MenuItem value={"drama"}>ドラマ</MenuItem>
                                    <MenuItem value={"anime"}>アニメ</MenuItem>
                                    <MenuItem value={"news"}>ニュース</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        :  <div></div>  
                    }
                    <div className='w-full border-b border-gray-300 pb-2'>
                        <Typography 
                            variant='h5' 
                            gutterBottom 
                            sx={{
                                textAlign: 'left',
                                mt: 1,
                                ml: 0.5,
                                mb: 1
                            }}
                        >
                            一日にどのくらいの時間を費やしますか
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel  id='select-fun'>時間</InputLabel>
                            <Select
                                labelId='select-fun'
                                id='wastTime'
                                name="wastTime"
                                value={userData.wastTime}
                                label="時間"
                                onChange={formHandler}
                                sx={{textAlign: "left"}}
                            >
                                <MenuItem value={20}>20%ぐらい</MenuItem>
                                <MenuItem value={40}>40%くらい</MenuItem>
                                <MenuItem value={60}>60%くらい</MenuItem>
                                <MenuItem value={80}>80%くらい</MenuItem>
                                <MenuItem value={100}>一日中</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
            </div>
            <Button variant="outlined" type='submit'>送信</Button>
        </Box>
    )
}

export default Form;