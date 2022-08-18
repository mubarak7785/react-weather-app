import { useState } from "react";
import { useEffect } from "react";
import Chart from "react-apexcharts"
const Charts = ({data}) => {
    
    const [temp, setTemp] = useState([])
   
    useEffect(() => {
        let arr = []
       
            data.map((ele, i) => {
                console.log('ele', ele.main.temp);
                arr.push(ele.main.temp)

            })
           
            setTemp([...arr])
            
        
    }, [data])
    const obj = {
        options: {
            chart: {
                id: "basic-bar",
                type: "area",
                zoom: {
                    enabled: false,
                },
            },
            dataLabels: { enabled: false },
            stroke: {
                curve: "smooth",
                lineCap: "round"
            },
            xaxis: {
                categories: 
                    [
                        "FRI",
                        "SAT",
                        "SUN",
                        "MON",
                        "TUE",
                        "WED",
                        "THU"
                    ],
            }
        },
        series: [
            {
                name: "Temprature",
                data: temp || [45, 52, 38, 45, 19, 23, 2],  //[27, 28, 29, 31, 34,37,39,40,40,40,40,33,33,32,33,32,31]
            }
        ]
    }
    return (
        <>
           {/* <div style={{width :"250px", display : "flex" ,gap : "10px"}}>
           <span><h1 style={{fontSize : "35px"}}>{temp[0]}%</h1></span> <span>
            <img style={{width :"75px"}} src='https://restya.com/wp-content/uploads/2021/05/restya-weather-cb.png' alt="" />

            </span>
           </div> */}
            <div className="row daychart">
                <div className="mixed-chart">
                    <Chart
                        options={obj.options}
                        series={obj.series}
                        type="area"
                        width="85%"
                        height="300px"
                    />
                </div>
            </div>
        </>
    )
}
export default Charts;