import React from 'react'
import '../styles/room.scss'
import { useDispatch, useSelector } from 'react-redux'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
// import { ItemPos } from '../components/ItemPos/copy'
import { ItemPos } from '../components/ItemPos'
import { setHwl, removeHwl } from '../features/hwl/hwlSlice'
import { ItemPosT1 } from '../components/ItemPosT1'

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

  const pos = useSelector((state) => state.posData.pos)

 
  return (
    <div className='room'>
      <Tabs selectedTabClassName='tabs__li active'>
        <section className="room__header">
          <form className="form-info" onSubmit={(e) => e.preventDefault()}>
            <div className="form-info__ft">
              <label>Высота потолков, м</label>
              <input type="text" name='high' id='high' placeholder={params?.high} onChange={(e) => setHigh(e.target.value)} />
            </div>
            <div className="form-info__st">
              <label>Стены, м2</label>
              <div className='form-info__st--div'>
                <input type="text" name='length' id='length' placeholder={params?.length} onChange={(e) => setLength(e.target.value)}/>
                <span>X</span>
                <input type="text" name='width' id='width' placeholder={params?.width} onChange={(e) => setWidth(e.target.value)} onBlur={() => addHwl()} />
              </div>
            </div>
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
                    subitem.type === "sht" 
                    ? 
                      <ItemPosT1 params={params} poss={pos} uid={subitem.uid} rodUid={uid} title={subitem.title} coast={subitem.coast} type={subitem.type} />
                    :
                      <ItemPos params={params} poss={pos} uid={subitem.uid} rodUid={uid} title={subitem.title} coast={subitem.coast} type={subitem.type} />
                    
                    
                  
                )}
              </TabPanel>
            )}
        </section>
      </Tabs>
    </div>
  )
}

export default CustomTab