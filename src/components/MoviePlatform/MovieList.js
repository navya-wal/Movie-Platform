import React, { useState } from 'react'
import { Row, Col, Checkbox } from 'antd';
import { Button, Card, Popover, InputNumber, Input } from 'antd'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Data } from '../../constants/MovieData'
import FilterData from '../Filters/FilterData'
import { Pagination } from 'antd'
import 'antd/dist/antd.css'

const { Meta } = Card;
const { Search } = Input;

function MovieList(props) {
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(8)
  const [searchVal, setSearchVal] = useState(false)
  const [showFav, setShowFav] = useState(false)
  const [showWL, setShowWL] = useState(false)
  const [filter, setFilter] = useState(false)

  const handleChange = value => {
    if (value <= 1) {
      setMin(0)
      setMax(8)
    }
    else {
      setMin(max)
      setMax(value * 8)
    }
  }

  const show = (val) => {
    if (val === 'fav')
      setShowFav(true)
    else if (val === 'wl')
      setShowWL(true)
  }

  const handleFavorite = (value, e) => {
    if (e.target.checked === false) {
      let newfav = props.fav.includes(value.id) ?
        props.fav.filter(ele => ele !== value.id) :
        props.fav
      props.setFav([...newfav])
    }
    else {
      props.setFav([...props.fav, value.id])
    }
  }

  const handleWishList = (value, e) => {
    if (e.target.checked === false) {
      let newwish = props.wishlist.includes(value.id) ?
        props.wishlist.filter(ele => ele !== value.id) :
        props.wishlist
      props.setWish([...newwish])
    }
    else {
      props.setWish([...props.wishlist, value.id])
    }
  }

  const calculate = (id) => {
    Data[id - 1].rating = Data[id - 1].rating_array.reduce((a, b) => { return a + b }, 0) / Data[id - 1].rating_array.length
  }

  const handleRating = (calculate, id, e) => {
    Data[id - 1].rating_array = [...Data[id - 1].rating_array, Number(e.target.value)]
    calculate(id)
  }

  const handleSearch = (value) => {
    if (value !== '') {
      props.setSearch(Data.filter(ele => value === ele.name))
      setSearchVal(true)
    }
    else {
      setSearchVal(false)
    }
  }

  const showFilters = () => {
    setFilter(true)
  }
  const HideFilters = () => {
    setFilter(false)
  }

  let RData
  if (searchVal)
    RData = props.search_data
  else if (filter)
    RData = props.filter_data.length ? props.filter_data : Data
  else
    RData = Data
  return (
    < div >
      <h2>Movies List</h2>
      <Search placeholder="start entering movie name" onSearch={value => handleSearch(value)} style={{ width: '500px', marginRight: '200px' }} enterButton />
      <Button onClick={() => show('fav')} >show Favorites list</Button>
      <Button onClick={() => show('wl')}>Show WishList</Button>
      {filter ? <Button onClick={() => HideFilters()}>HideFilters</Button> : <Button onClick={() => showFilters()}>Filters</Button>}
      {showFav ? <Redirect to='/favorites'></Redirect> : null}
      {showWL ? <Redirect to='/wishlist'></Redirect> : null}
      {filter ?
        <FilterData />
        : null}
      {
        RData ?
          <div className="site-card-wrapper">
            <Row gutter={16}>
              {RData.slice(min, max).map(item =>
                <Col span={6}>
                  <Card
                    style={{ marginRight: 13, width: 300, marginBottom: 8 }}
                    cover={
                      <img
                        alt=""
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      />
                    }
                    actions={[
                      <Popover content={"favorites"}>
                        <Checkbox onChange={(e) => handleFavorite(item, e)}
                          defaultChecked={props.fav.includes(item.id)} />
                      </Popover>,
                      <Popover content={"WishList"}>
                        <Checkbox onChange={(e) => handleWishList(item, e)}
                          defaultChecked={props.wishlist.includes(item.id)} />
                      </Popover>,
                      <Popover content={"Give Rating"}>
                        <InputNumber
                          min={0}
                          max={5}
                          defaultValue={0}
                          type='number'
                          onPressEnter={(e) => handleRating(calculate, item.id, e)} />
                      </Popover>
                    ]}
                    extra={<div><p>rating:{item.rating}</p><Button>View</Button></div>}>
                    <Meta
                      title={`${item.id}.${item.name}`}
                      description={`Actor:${item.actor} ; Director:${item.director}`}
                    />
                  </Card>
                </Col>
              )}
            </Row>
            <Pagination
              defaultCurrent={1}
              defaultPageSize={8}
              onChange={handleChange}
              total={RData.length} />
          </div> : null
      }
    </div >
  )
}

const mapStateToProps = (state) => {
  return {
    fav: state.movie.fav,
    wishlist: state.movie.wishlist,
    filter_data: state.movie.filter_data,
    search_data: state.movie.search_data
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    get setFav() {
      return (value) =>
        dispatch({
          type: 'SET_FAV',
          payload: value
        })
    },
    get setWish() {
      return (value) =>
        dispatch({
          type: 'SET_WL',
          payload: value
        })
    },
    get setSearch() {
      return (value) => {
        dispatch({
          type: 'SET_SEARCH',
          payload: value
        })
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
