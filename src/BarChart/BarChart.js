import React from 'react';
import { Chart } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2';

export const BarChart = (props) => {
    // console.log("THIS IS MY SHIT" + JSON.stringify(props));
    console.log(props);

    const countResponses = () => {
        const responseCounter = new Array(props.data.labels.length).fill(0);

        console.log(responseCounter)

        for (let a of props.data.responses) {
            responseCounter[a]++;
        }

        return responseCounter;
    }

    return <div>
        <Bar
            data={{
                labels: [...props.data.labels],
                datasets: [{
                    label: "number of answers",
                    data: countResponses(),
                    backgroundColor: ["red", "blue", "yellow", "green", "purple", "orange"]
                }]
            }}
            height={400}
            width={400}
            options={{
                maintainAspectRatio: false,
                scales: {
                    y: {
                        ticks: {
                            stepSize: 1,
                            beginAtZero: true,
                        },
                    },
                },
            }}
        />
    </div>
}