import React from 'react'
import '../styles/room.scss'
import { useDispatch, useSelector } from 'react-redux'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
// import { ItemPos } from '../components/ItemPos/copy'
import { ItemPos } from '../components/ItemPos'
import { setHwl, removeHwl } from '../features/hwl/hwlSlice'
import { ItemPosT1 } from '../components/ItemPosT1'
import {isEmpty} from 'lodash'
import { ItemPosT2 } from '../components/ItemPosT2'

function CustomTab({ uid, params, tabs, services, mars, title}) {

  const dispatch = useDispatch()
  // console.log(params?.high)
  // console.log(params?.width)
  // console.log(params?.length)
  

  const [high, setHigh] = React.useState(null)
  const [width, setWidth] = React.useState(null)
  const [length, setLength] = React.useState(null)

  const addHwl = () => {
    const hwl = {
      uid: uid,
      high: high,
      width: width,
      length: length,
    }

    dispatch(removeHwl(hwl.uid))
    dispatch(setHwl(hwl))
  }

  const pos = useSelector((state) => state.posData.pos)


  const checkValue = () => {

    if (high === null || undefined || Number(0)) {
      return true
    } else if (width=== null || undefined || Number(0)) {
      return true
    } else if (length === null || undefined || Number(0)) {
      return true
    } else {
      return false
    }
  }

  const handleType = (subitem) => {
    if (subitem.type === "sht") {
      return <ItemPosT1 params={params} poss={pos} uid={subitem.uid} rodUid={uid} title={subitem.title} coast={subitem.coast} type={subitem.type} dopP={subitem.dopP} dopA={subitem.dopA} />
    } 
    if (subitem.type === "1sh") {
      return <ItemPos params={params} poss={pos} uid={subitem.uid} rodUid={uid} title={subitem.title} coast={subitem.coast} type={subitem.type} dopP={subitem.dopP} dopA={subitem.dopA} />
    } 
    if (subitem.type === "Lsh") {
      return <ItemPos params={params} poss={pos} uid={subitem.uid} rodUid={uid} title={subitem.title} coast={subitem.coast} type={subitem.type} dopP={subitem.dopP} dopA={subitem.dopA} />
    } 
    if (subitem.type === "S") {
      return <ItemPosT2   params={params} poss={pos} uid={subitem.uid} rodUid={uid} title={subitem.title} coast={subitem.coast} type={subitem.type} dopP={subitem.dopP} dopA={subitem.dopA} />
    }
    if (subitem.type === "P") {
      return <ItemPosT2   params={params} poss={pos} uid={subitem.uid} rodUid={uid} title={subitem.title} coast={subitem.coast} type={subitem.type} dopP={subitem.dopP} dopA={subitem.dopA} />
    }
  }
 
  return (
    <div className='room'>
      <Tabs selectedTabClassName='tabs__li active'>
        <section className="room__header">
          <form className="form-info" onSubmit={(e) => e.preventDefault()}>
            <div className="form-info__ft">
              <label>Takhöjder, m</label>
              <input type="text" name='high' id='high' placeholder={params?.high} onChange={(e) => e.target.value !== 0 ? setHigh(e.target.value) : setHigh(null)} />
            </div>
            <div className="form-info__st">
              <label>Väggar, m2</label>
              <div className='form-info__st--div'>
                <input type="text" name='length' id='length' placeholder={params?.length} onChange={(e) => e.target.value !== 0 ? setLength(e.target.value) : setLength(null)}/>
                <span>X</span>
                <input type="text" name='width' id='width' placeholder={params?.width} onChange={(e) => e.target.value !== 0 ? setWidth(e.target.value) : setWidth(null)} />
              </div>
            </div>
            <button className='form-info__bt' 
            disabled={checkValue()} 
            onClick={() => addHwl()}>{isEmpty(params) === true ? "Добавить" : "Обновить"}</button>
          </form>
          <TabList className="tabs">
            {tabs.map((tab) => 
            <Tab key={tab.title} className="tabs__li" >{tab.title} {tab.times != null ? "(" + tab.times + ")" : undefined}</Tab>
            )}
          </TabList>
          {/*  */}
        </section>
        <span className="room__separ"></span>
        <section className='room__body'>
          <div className="room__body--us">
            <p>Service</p>
            <p>Pris</p>
          </div>
            {isEmpty(params) === true ?
              <p className='pred'>Du har ännu inte angett parametrarna {title}</p>
            :
              services.list.map((item) => 
                  <TabPanel className="room__body--block">
                    {item.map((subitem) => 
                        // subitem.type === "sht" 
                        // ? 
                        //   <ItemPosT1 params={params} poss={pos} uid={subitem.uid} rodUid={uid} title={subitem.title} coast={subitem.coast} type={subitem.type} dopP={subitem.dopP} dopA={subitem.dopA} />
                        // :
                        //   <ItemPos   params={params} poss={pos} uid={subitem.uid} rodUid={uid} title={subitem.title} coast={subitem.coast} type={subitem.type} dopP={subitem.dopP} dopA={subitem.dopA} />
                      handleType(subitem)
                    )}
                  </TabPanel>
              )
            }
            
        </section>
      </Tabs>
    </div>
  )
}

export default CustomTab