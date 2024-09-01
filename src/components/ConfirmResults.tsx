import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Grid2 } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

interface RowsProperties {
    question: string,
    answer: string | number
}

function createData(
    question: string,
    answer: string | number
) {
    return { question, answer };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: '#f5f5f5',
    color: theme.palette.text.primary,
    fontSize: 16,
    fontWeight: 'bold',
}));

const ConfirmResults = () => {
    const [data, setData] = useState([]);
    const [userData, setUserData] = useState({
        name: "",
        email: ""
    });
    const [isOpen, setIsOpen] = useState(false);
    const [rows, setRows] = useState<RowsProperties[]>([]);

    const endPoint = `${process.env.REACT_APP_POST_API}/getResults.php`;

    const userHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    // 趣味の出しわけ
    const funHandler = (data: string) => {
        switch (data) {
            case "kafe":
                return "カフェ";
            case "walk":
                return "散歩"
            case "gym":
                return "ジム"
            case "party":
                return "飲み会"
            case "date":
                return "デート"
            default:
                return "お家でまったり動画"
        }
    }; 

    // "home"が返ってきた時の出しわけ
    const addInfoHandler = (data: string) => {
        switch (data) {
            case "youtube":
                return "youtube";
            case "japanese-movie":
                return "邦画"
            case "foriegn-movie":
                return "洋画"
            case "drama":
                return "ドラマ"
            case "anime":
                return "アニメ"
            case "news":
                return "ニュース"
            default:
                return ""
        }
    }

    // 浪費時間の成形
    const wastTimeHandler = (data: number) => {
        if(data === 100) {
            return '一日中';
        } else {
            return `${data}%くらい`;
        }
    }
 
    const getData = async(userData:any) => {
        setIsOpen(true);
        try{
            const res = await axios.get(endPoint, {
                params: {
                    name: userData.name,
                    email: userData.email
                }
            })
            // 下記で必要な情報を抜ける
            console.log(res.data[0].data);
            const rows = [
                createData('お名前', res.data[0].data.name),
                createData('email', res.data[0].data.email),
                createData('年齢', res.data[0].data.age),
                createData('お休みの日は何をしていますか', funHandler(res.data[0].data.fun)),
                createData('どんな動画を見ますか', addInfoHandler(res.data[0].data.addInfo)),
                createData('一日にどのくらいの時間を費やしますか', wastTimeHandler(res.data[0].data.wastTime))
            ]
            setRows(rows);
        } catch(error){
            console.log("アンケート結果取得に失敗しました。", error);
        }
    }


    return (
        <div className='w-full mt-10'>
            <Box sx={{
                flexGrow: 1,
                width:"80%",
                m: "0 auto" 
            }}
            >
                <Grid2 container spacing={2} justifyContent={'center'}>
                    <Paper elevation={3} sx={{
                        width:'100%',
                        p: 2
                    }}
                    >
                        <Typography variant="h5" gutterBottom sx={{textAlign: 'left'}}>アンケート結果確認</Typography>
                        <div className='m-3'>
                            <TextField 
                                label='お名前'
                                name="name"
                                variant="standard"
                                value={userData.name}
                                fullWidth
                                onChange={userHandler}
                            />
                        </div> 
                        <div className='m-3'>
                            <TextField 
                                label='email'
                                name="email"
                                variant="standard"
                                value={userData.email}
                                fullWidth
                                onChange={userHandler}

                            />
                        </div> 
                        <Button 
                            variant="outlined" 
                            endIcon={<KeyboardArrowDownIcon />}
                            sx={{m:2}}
                            onClick={() => getData(userData)}
                        >
                            照会
                        </Button>
                        {isOpen ? 
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>質問</StyledTableCell>
                                            <StyledTableCell align='right'>回答</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row, index) => (
                                            row.answer != "" && (
                                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell component="th" scope="row">
                                                        {row.question}
                                                    </TableCell>
                                                    <TableCell align='right'>
                                                        {row.answer}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        :
                            <></>
                        }
                    </Paper>
                    
                </Grid2>
            </Box>
        </div>
    )
}

export default ConfirmResults 