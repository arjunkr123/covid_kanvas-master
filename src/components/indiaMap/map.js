import React from 'react';
import { ComposableMap, Geographies, Geography} from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import "./map.css";



class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltipContent: '',
      data: [],
      width: 0,
      height: 0,
      scale: 0,
      center: [],
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  updateWindowDimensions() {
    if(window.innerWidth <= 500) {
      this.setState({width: window.innerWidth, height: window.innerHeight, scale: 900, center: [82, 12]});
    }
    else if(window.innerWidth <= 700) {
      this.setState({width: window.innerWidth, height: window.innerHeight, scale: 930, center: [81, 15]})
    }
    else {
      this.setState({width: window.innerWidth, height: window.innerHeight, scale: 1500, center: [82, 23]});
    }
  }

  componentDidMount() {
    this.updateWindowDimensions();;
    window.addEventListener('resize', this.updateWindowDimensions);
    const data = [
      { id: 'AP', state: 'Andhra Pradesh'  },
      { id: 'AR', state: 'Arunachal Pradesh'  },
      { id: 'AS', state: 'Assam'  },
      { id: 'BR', state: 'Bihar'  },
      { id: 'CT', state: 'Chhattisgarh'  },
      { id: 'GA', state: 'Goa' },
      { id: 'GJ', state: 'Gujarat' },
      { id: 'HR', state: 'Haryana'  },
      { id: 'HP', state: 'Himachal Pradesh' },
      { id: 'JH', state: 'Jharkhand' },
      { id: 'KA', state: 'Karnataka' },
      { id: 'KL', state: 'Kerala'  },
      { id: 'MP', state: 'Madhya Pradesh'  },
      { id: 'MH', state: 'Maharashtra'  },
      { id: 'MN', state: 'Manipur'  },
      { id: 'ML', state: 'Meghalaya' },
      { id: 'MZ', state: 'Mizoram'  },
      { id: 'NL', state: 'Nagaland' },
      { id: 'OR', id2: 'OD', state: 'Odisha' },
      { id: 'PB', state: 'Punjab'  },
      { id: 'RJ', state: 'Rajasthan'  },
      { id: 'SK', state: 'Sikkim'  },
      { id: 'TN', state: 'Tamil Nadu'  },
      { id: 'TS', id2: 'TG', state: 'Telangana'  },
      { id: 'TR', state: 'Tripura' },
      { id: 'UT', id2: 'UK', state: 'Uttarakhand'  },
      { id: 'UP', state: 'Uttar Pradesh' },
      { id: 'WB', state: 'West Bengal' },
      { id: 'AN', state: 'Andaman And Nicobar Islands'  },
      { id: 'CH', state: 'Chandigarh'  },
      { id: 'DN', state: 'Dadra And Nagar Haveli' },
      { id: 'DD', state: 'Daman And Diu' },
      { id: 'DL', state: 'Delhi' },
      { id: 'JK', state: 'Jammu And Kashmir'  },
      { id: 'LA', state: 'Ladakh'  },
      { id: 'LD', state: 'Lakshadweep'  },
      { id: 'PY', state: 'Puducherry'  }
    ];
    axios.get("https://api.covid19india.org/data.json")
    .then((response) => {
      let states = response.data.statewise;
      for(let i = 1; i < states.length; i++) {
        let tempState = data.find(s => s.id === states[i].statecode.toUpperCase() || s.id2 === states[i].statecode.toUpperCase());
        if(tempState) {
          tempState["confirmed"] = +states[i].confirmed || 0;
          tempState["death"] = +states[i].deaths || 0;
          tempState["recovered"] = +states[i].recovered || 0;
        }
      }
    this.setState({data: data});
    });
  }

  render() {
    
    const INDIA_TOPO_JSON = require('./india.topo.json');
    const PROJECTION_CONFIG = {
      scale: this.state.scale,
      center: this.state.center,
    };

    const COLOR_RANGE = [
      '#FFD0C2',
      '#FF8A83',
      '#D65F59',
      '#C23210',
      '#991101',
    ];


    const DEFAULT_COLOR = '#EEE';

    const geographyStyle = {
      default: {
        outline: 'none',
        stroke: "white",
        strokeWidth: 0.25,
      },
      hover: {
        fill: '#ccc',
        transition: 'all 250ms',
        outline: 'none',
        stroke: "black",
        strokeWidth: 0.25,
      },
      pressed: {
        outline: 'none',
      }
    };

  
    let arr = this.state.data.map(d => {if(d.confirmed !== undefined) return d.confirmed; else return 0;});
    console.log(arr);
    console.log(this.state.data);
    let max = Math.max(...arr);
    let min = Math.min(...arr);
    console.log(max);
    const colorScale = scaleLinear()
    .domain([min, max/8, max/4, max/2, max])
    .range(COLOR_RANGE);



    const onMouseEnter = (geo, current) => {

      let text = geo.properties.name + '\n'+ 
                  '\nconfirmed: ' + current.confirmed +
                  '\nrecovered: ' + current.recovered +
                  '\ndeceased: ' + current.death;

      let formattedText = text.split("\n")
                              .map((item, key) => {
                                  return (
                                    <span key={key}>
                                    {item}<br/>
                                    </span>
                                  )
                              });

      return () => {
        this.setState({tooltipContent: formattedText});
      };
    };

    const onMouseLeave = () => {
      this.setState({tooltipContent: ''});
    };

    return (
      <div className="full-width-height container">
        <ReactTooltip style={{color: "white"}}>{this.state.tooltipContent}</ReactTooltip>
          <ComposableMap
            projectionConfig={PROJECTION_CONFIG}
            projection="geoMercator"
            // width={800}
            // height={530}
            // style={{
            //   width: "100%",
            //   height: "auto",
            // }}
            width= {this.state.width}
            height= {this.state.height}
            data-tip=""
          >
            <Geographies geography={INDIA_TOPO_JSON}>
              {({ geographies }) =>
                geographies.map(geo => {
                  let current = this.state.data.find(s => s.id === geo.id || s.id2 === geo.id);
                  if(!current) {
                    current = {state: ""};
                  }
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={current ? colorScale(current.confirmed) : DEFAULT_COLOR}
                      style={geographyStyle}
                      onMouseEnter={onMouseEnter(geo, current)}
                      onMouseLeave={onMouseLeave}
                      onClick={() => {this.props.onClick(current.state)}}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
      </div>
    );
  }
}

export default Map;
