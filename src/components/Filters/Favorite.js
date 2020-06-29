import React, { useState } from 'react'
import { Data } from '../../constants/MovieData'
import { connect } from 'react-redux'
import { Row, Col, Card, Button } from 'antd'
import { Redirect } from 'react-router-dom'
const { Meta } = Card;

function Favorite(props) {

  const [back, setBack] = useState(false)
  const handleSetBack = () => {
    setBack(true)
  }
  return (
    <div>
      <Button onClick={() => handleSetBack()}>Back</Button>
      {back ?
        <Redirect to='/' />
        : <div>
          <p>List of Favorite Movies</p>
          {
            Data ?
              <div className="site-card-wrapper">
                <Row gutter={16}>
                  {Data.filter(ele => props.fav.includes(ele.id)).map(item =>
                    <Col span={6}>
                      <Card
                        style={{ marginRight: 13, width: 300, marginBottom: 8 }}
                        cover={
                          <img
                            alt=""
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                          />
                        }>
                        <Meta
                          title={`${item.id}${item.name}`}
                          description={`Actor:${item.actor} ; Director:${item.director}`}
                        />
                      </Card>
                    </Col>
                  )}
                </Row>
              </div> : null
          }
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    fav: state.movie.fav
  }
}
// const mapDispatchToProps = (dispatch) => {
//   return {
//     get setFav() {
//       return (value) =>
//         dispatch({
//           type: 'SET_FAV',
//           payload: value
//         })
//     },
// }
export default connect(mapStateToProps)(Favorite)
