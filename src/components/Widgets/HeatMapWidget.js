import React from "react";
import ReactApexChart from "react-apexcharts";

const data = [
  {
    x: "Tender Coconut Water",
    y: 500,
  },
  {
    x: "Butter Paneer Kulcha Burger",
    y: 149,
  },
  {
    x: "Fruit Pop Oatmeal",
    y: 184,
  },
  {
    x: "Dal Makhani",
    y: 55,
  },
  {
    x: "Chana Masala",
    y: 84,
  },
  {
    x: "Banana Walnut Cake",
    y: 31,
  },
  {
    x: "Super Sugarcane",
    y: 70,
  },
  {
    x: "Butter Chicken Kulcha Burger",
    y: 30,
  },
  {
    x: "Biryani",
    y: 44,
  },
  {
    x: "Fit Thali Paratha Meal",
    y: 68,
  },
  {
    x: "Baked Punjabi Aloo",
    y: 28,
  },
  {
    x: "Marwadi Aloo Fry",
    y: 19,
  },
  {
    x: "Spicy Dilli Kulcha",
    y: 29,
  },

  {
    x: "Special Masala Chicken",
    y: 300,
  },
].map((d) => ({
  x: `${d.x} : ${d.y}`,
  y: d.y,
}));

export default class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          data,
        },
      ],
      options: {
        legend: {
          show: true,
        },
        chart: {
          height: 350,
          type: "treemap",
          toolbar: {
            show: false,
          },
        },

        // title: {
        //   text: "Distibuted Treemap (different color for each cell)",
        //   align: "center",
        // },
        colors: [
          "#3B93A5",
          "#F7B844",
          "#ADD8C7",
          "#EC3C65",
          "#CDD7B6",
          "#C1F666",
          "#D43F97",
          "#1E5D8C",
          "#421243",
          "#7F94B0",
          "#EF6537",
          "#C0ADDB",
        ],
        plotOptions: {
          treemap: {
            distributed: true,
            enableShades: false,
          },
        },
      },
    };
  }

  render() {
    return (
      <div
        id="chart"
        // style={{
        //   marginTop: "2em",
        // }}
      >
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="treemap"
          height={350}
        />
      </div>
    );
  }
}
