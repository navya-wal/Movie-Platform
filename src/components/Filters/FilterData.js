import React from 'react'
import { Select, Button } from 'antd';
import { Data } from '../../constants/MovieData'
import { connect } from 'react-redux';

const { Option } = Select;

function FilterData(props) {

  const children1 = [];
  const children2 = [];
  const children3 = [];
  let actorarray = [];
  let dirarray = [];
  let year = [];

  for (let i = 0; i < Data.length; i++) {
    actorarray = [...actorarray, Data[i].actor]
  }
  actorarray = [...new Set(actorarray)]
  for (let i = 0; i < actorarray.length; i++) {
    children1.push(<Option key={actorarray[i]}>{actorarray[i]}</Option>);
  }
  for (let i = 0; i < Data.length; i++) {
    dirarray = [...dirarray, Data[i].director]
  }
  dirarray = [...new Set(dirarray)]
  for (let i = 0; i < dirarray.length; i++) {
    children2.push(<Option key={dirarray[i]}>{dirarray[i]}</Option>);
  }
  for (let i = 0; i < Data.length; i++) {
    year = [...year, Data[i].year]
  }
  year = [...new Set(year)]
  for (let i = 0; i < year.length; i++) {
    children3.push(<Option key={year[i]}>{year[i]}</Option>);
  }
  const handleActor = (value) => {
    props.setActorArray([...value])
  }
  const handleDirector = (value) => {
    props.setDirArray([...value])
  }
  const handleYear = (value) => {
    props.setYearArray([...value])
  }
  const handleButtonClick = () => {
    props.setFilterData(Data.filter(ele => true === props.actor_array.includes(ele.actor) || true === props.dir_array.includes(ele.director) || true === props.year_array.includes(ele.year)))
  }

  return (
    <div>
      <br />
      <Select
        mode="multiple"
        style={{ width: '40%' }}
        placeholder="Filter By Actor"
        onChange={handleActor}
      >
        {children1}
      </Select>
      <br />
      <Select
        mode="multiple"
        style={{ width: '40%' }}
        placeholder="Filter By director"
        onChange={handleDirector}
      >
        {children2}
      </Select>
      <br />
      <Select
        mode="multiple"
        style={{ width: '40%' }}
        placeholder="Filter By Year"
        onChange={handleYear}
      >
        {children3}
      </Select><br />
      <Button onClick={handleButtonClick}>Filter</Button><br />
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    actor_array: state.movie.actor_array,
    dir_array: state.movie.dir_array,
    year_array: state.movie.year_array,
    filter_data: state.movie.filter_data
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    get setActorArray() {
      return (value) =>
        dispatch({
          type: 'SET_AA',
          payload: value
        })
    },
    get setDirArray() {
      return (value) =>
        dispatch({
          type: 'SET_DA',
          payload: value
        })
    },
    get setYearArray() {
      return (value) =>
        dispatch({
          type: 'SET_YA',
          payload: value
        })
    },
    get setFilterData() {
      return (value) =>
        dispatch({
          type: 'SET_DATA',
          payload: value
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterData);
