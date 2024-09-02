import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Grid2 } from '@mui/material';
import Typography from '@mui/material/Typography';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
  

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface DataParameter {
    data: {
        fun: string;
        addInfo?:string;
        wastTime: number;
    }
}

const hobbyJapanese: {[key: string]: string} = {
    "cafe": "カフェ",
    "walk": "散歩",
    "gym": "ジム",
    "party": "飲み会",
    "date": "デート",
    "home": "お家でまったり動画"
};

const Graph = () => {
    const [data, setData] = useState<DataParameter[]>([]);
    const endPoint = `${process.env.REACT_APP_POST_API}/get.php`;
    // const endPoint = 'https://challenge-netsu.sakura.ne.jp/php/get.php';

    // サーバの全ファイル取得メソッド
    const fetchData = async() => {
        try{
            const res = await axios.get(endPoint);
            console.log(res.data);
            setData(res.data);
        } catch(error) {
            console.log("データ取得に失敗しました。", error);
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    const graphData = {
        labels: data.map(item => hobbyJapanese[item.data.fun] || item.data.fun),
        datasets: [
            {
                label: "費やした時間",
                data: data.map(item => item.data.wastTime),
                backgroundColor: 'rgba(75, 192, 192, 0.6)', 
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    }

    const graphOptions = {
        responsive: true,
        plugins: {
            legend:{
                position: 'top' as const
            },
            title: {
                display: true,
                text: '趣味ごとに費やした時間'
            }
        }
    };

    return (
        <div className='w-full mt-10'>
            <Box sx={{
                flexGrow: 1,
                width:"80%",
                m: "0 auto" 
            }}>
                <Grid2 container spacing={2} justifyContent={'center'}>
                    <Paper elevation={3} sx={{
                        width:'100%',
                        p: 2
                    }}
                    >
                        <Typography variant="h5" gutterBottom sx={{textAlign: 'left'}}>統計</Typography>
                        {data.length > 0 ? (
                            <Bar data={graphData} options={graphOptions} /> 
                        ) : (
                            <p>データがありません。</p>
                        )}
                    </Paper>
                </Grid2>
            </Box>
        </div>
    )
}

export default Graph;