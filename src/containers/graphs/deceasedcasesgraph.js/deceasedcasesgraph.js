import React from "react";
import { Line } from "react-chartjs-2";

import axios from "axios";

class DeceasedCasesGraph extends React.Component {
  state = {
    countryDailyCases: [],
    countryDeceasedCases: [],
    countryDate: [],
    Data: {},
    hideIt: false
  };
  componentDidMount() {
    axios.get("https://api.covid19india.org/data.json").then((res) => {
      let date = [];
      let deceasedcases = [];
      let dailycases = [];
      res.data.cases_time_series.forEach((element) => {
        date.push(element.date);
        deceasedcases.push(element.totaldeceased);
        dailycases.push(element.dailydeceased);
      });
      this.setState({
        countryDailyCases: dailycases,
        countryDeceasedCases: deceasedcases,
        countryDate: date,
        Data: {
          labels: date,
          datasets: [
            {
              data: [...dailycases],
              fill: true,
              lineTension: 0.5,
              backgroundColor: "rgba(191, 10, 48, 0.5)",
              borderColor: "rgba(191, 10, 48, 1)",
              borderWidth: 1,
            },
          ],
        },
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchTerm !== prevProps.searchTerm || this.props.graphType !== prevProps.graphType) {
      if(this.props.searchTerm !== '') {
        axios.get("https://api.covid19india.org/states_daily.json").then((res) => {
          let stateCodes = {
            'Andhra Pradesh':'AP',
            'Arunachal Pradesh':'AR',
            'Assam':'AS',
            'Bihar':'BR',
            'Chhattisgarh':'CT',
            'Goa':'GA',
            'Gujarat':'GJ',
            'Haryana':'HR',
            'Himachal Pradesh':'HP',
            'Jammu And Kashmir':'JK',
            'Jharkhand':'JH',
            'Karnataka':'KA',
            'Kerala':'KL',
            'Madhya Pradesh':'MP',
            'Maharashtra':'MH',
            'Manipur':'MN',
            'Meghalaya':'ML',
            'Mizoram':'MZ',
            'Nagaland':'NL',
            'Odisha':'OR',
            'Punjab':'PB',
            'Rajasthan':'RJ',
            'Sikkim':'SK',
            'Tamil Nadu':'TN',
            'Telangana':'TG',
            'Tripura':'TR',
            'Uttarakhand':'UT',
            'Uttar Pradesh':'UP',
            'West Bengal':'WB',
            'Andaman And Nicobar Islands':'AN',
            'Chandigarh':'CH',
            'Dadra And Nagar Haveli':'DN',
            'Daman And Diu':'DD',
            'Delhi':'DL',
            'Lakshadweep':'LD',
            'Puducherry':'PY',
          }
          let date = [];
          let deceasedcases = [];
          let stateCode = stateCodes[this.props.searchTerm];
          if(!stateCode) {
            this.setState({hideIt: true});
          }
          else {
            this.setState({hideIt: false});
            stateCode = stateCode.toLowerCase();
            if(this.props.graphType === "daily") {
              for(let i = 2; i < res.data.states_daily.length; i+=3) {
                  deceasedcases.push(res.data.states_daily[i][stateCode]);
                  date.push(res.data.states_daily[i].date);
              }
            }
            else {
              let caseSum = 0;
              for(let i = 2; i < res.data.states_daily.length; i+=3) {
                caseSum += +res.data.states_daily[i][stateCode];
                deceasedcases.push(caseSum);
                date.push(res.data.states_daily[i].date);
              }
            }
          }
          this.setState({
            Data: {
              labels: date,
              datasets: [
                {
                  data: deceasedcases,
                  fill: true,
                  lineTension: 0.5,
                  backgroundColor: "rgba(191, 10, 48, 0.5)",
                  borderColor:"rgba(191, 10, 48, 1)",
                  borderWidth: 2,
                },
              ],
            },
          });
        });
      }
      else {
        let graphData = [];
        if(this.props.graphType === 'daily') {
          graphData = this.state.countryDailyCases;
        }
        else if(this.props.graphType === 'cumulative') {
          graphData = this.state.countryDeceasedCases;
        }

        if(graphData !== []) {
          this.setState({
            Data: {
              labels: this.state.countryDate,
              datasets: [
                {
                  data: [...graphData],
                  fill: true,
                  lineTension: 0.5,
                  backgroundColor: "rgba(217, 217, 217,0.6)",
                  borderColor: "grey",
                  borderWidth: 2,
                },
              ],
            },
          });
          graphData = [];
        }
      } 
    }
  }

  render() {
    if(this.state.hideIt === true) {
      return (
        null
      )
    }
    return (
      <div className="deceasedcasegraph">
        <Line
          width={100}
          height={300}
          data={this.state.Data}
          options={{
            scales: {
              xAxes: [
                {
                  display: false,
                },
              ],
            },

            maintainAspectRatio: false,
            title: {
              text: "Deceased Cases",
              fontColor: "black",
              fontSize: 25,
              display: true,
            },
            legend: {
              display: false,
              position: "right",
            },
          }}
        />
      </div>
    );
  }
}
export default DeceasedCasesGraph;
