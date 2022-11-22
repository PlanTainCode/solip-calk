import React from 'react'
import '../styles/room.scss'
import { useDispatch, useSelector } from 'react-redux'
// import {setHigh, setLength, setWidth} from '../features/params/paramSlice'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import { ItemPos } from '../components/ItemPos/copy'
import { v4 } from 'uuid'
import { setHwl, removeHwl } from '../features/hwl/hwlSlice'

function CustomTab({ uid, params, tabs, services}) {

  const dispatch = useDispatch()

  const [high, setHigh] = React.useState()
  const [width, setWidth] = React.useState()
  const [length, setLength] = React.useState()

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

  const S = Number(params?.width) * Number(params?.length);
  const P = 2 * (Number(params?.length) + Number(params?.width));
  const Ps = Number(P)/4;
  const Sh = Number(params?.high) * Number(Ps);

  const pos = useSelector((state) => state.posData.pos)
  // console.log(params)

  // console.log(pos)

  // console.log(tabs)
  // console.log(services)
  return (
    <div className='room'>
      <Tabs selectedTabClassName='tabs__li active'>
        <section className="room__header">
          <form className="form-info" onSubmit={(e) => e.preventDefault()}>
            <div className="form-info__ft">
              <label>Высота потолков, м</label>
              <input type="text" name='high' id='high' placeholder={high} onChange={(e) => setHigh(e.target.value)} />
            </div>
            <div className="form-info__st">
              <label>Стены, м2</label>
              <div className='form-info__st--div'>
                <input type="text" name='length' id='length' placeholder={length} onChange={(e) => setLength(e.target.value)}/>
                <span>X</span>
                <input type="text" name='width' id='width' placeholder={width} onChange={(e) => setWidth(e.target.value)}/>
              </div>
            </div>
            <button onClick={() => addHwl()}></button>
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
            <p>Услуга</p>
            <p>Цена</p>
          </div>
            {services.list.map((item) => 
              <TabPanel className="room__body--block">
                {item.map((subitem) => 
                  
                    <ItemPos poss={pos} uid={subitem.uid} title={subitem.title} coast={subitem.coast} />
                  
                )}
              </TabPanel>
            )}
          <ul>
            <li>Высота стен: {params?.high}</li>
            <li>Ширина: {params?.width}</li>
            <li>Длина: {params?.length}</li>
            <li>Площадь комнаты: {S}</li>
            <li>Периметр комнаты: {P}</li>
            <li>Средняя стена: {Ps}</li>
            <li>Площадь средней стены: {Sh}</li>
          </ul>
        </section>
      </Tabs>
    </div>
  )
}

export default CustomTab