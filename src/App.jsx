import React from 'react'
import { Footer, Header, Request, Title } from './components'
import './fonts/fonts.scss'
import './styles/global.scss'
import './styles/room.scss'
import './styles/nav.scss'
import './styles/popup.scss'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { setData, removeData } from './features/popup/popupSlice'
import { useDispatch, useSelector } from 'react-redux'
import CustomTab from './pages/tab'
import {v4} from 'uuid'
import { setContent, removeContent } from './features/content/contentSlice'
import axios from 'axios'
import { getBass, getLiving } from './features/items/itemsSlice'

function App({items}) {


  // const items = useSelector((state) => state.items.items)


  // React.useEffect(() => {

  //   const tabUid = items.map((it) => it.uid)

  //   if (tabUid.find((t) => t === 'living')) {
  //     console.log('.')
  //   } else {
  //     dispatch(getLiving())
  //   }

  //   if (tabUid.find((t) => t === 'bass')) {
  //     console.log('.')
  //   } else {
  //     dispatch(getBass())
  //   }

  // })

  // console.log('items', items)

  const popup = useSelector((state) => state.popupData.popup)

  const content = useSelector((state) => state.contentData.content)

  const hwl = useSelector((state) => state.hwlData.hwl)

  const total = useSelector((state) => state.totalData.total)

  const [popupActive, setPopupActive] = React.useState(false)

  const dispatch = useDispatch()


  const addPopupHandler = (item) => {
    const pop = {
      uid: v4(),
      item: item
    }

    const content = {
      list: item.content.services.map((pt) => pt.map((t) => 
      {
        const newItem = {
          title: t.title,
          coast: t.coast,
          uid: v4()
        }
        return newItem
      }
      )),
      uid: pop.uid
    }

    dispatch(setData(pop))
    
    setPopupActive(false)
    
    dispatch(setContent(content))
  }

  const removePopupHandler = (uid) => {
    dispatch(removeData(uid))
    dispatch(removeContent(uid))
  }

  

  // console.log(popup)
  // console.log(hwl)
  // console.log(content)
  return (
    <div className='page'>
      <div className={popupActive ? 'popup active' : 'popup'}>
        <div className={popupActive ? 'popup__area active' : 'popup__area'}></div>
        
        <div className="popup__content">
          <div className="popup__close" onClick={() => setPopupActive(false)}>
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line opacity="0.36" x1="0.838905" y1="0.587853" x2="17.8388" y2="17.5877" stroke="black"/>
              <line opacity="0.36" x1="17.8389" y1="1.29496" x2="0.839045" y2="18.2948" stroke="black"/>
            </svg>
          </div>
          <h1>выберите тип комнаты</h1>
          <div className="popup__content--choice">
            {items.map((item) => (
              <div className="popup-item" onClick={(e) => addPopupHandler(item)}>
                <img src={item.tab.image} alt="p1" />
                <span></span>
                <h3>{item.tab.title}</h3>
              </div>
            ))}
          </div>
          
        </div>
      </div>
      <Header />
      <Title />
      <Tabs selectedTabClassName="active">
        <TabList className="nav">
          {popup.map((pop) => (
            <Tab className="nav__item" >
              <img src={pop.item.tab.image} alt="p1" />
              <span></span>
              <h3>{pop.item.tab.title}</h3>
              <div className="del" onClick={() => removePopupHandler(pop.uid)}>
                <span className='del__f'></span>
                <span className='del__s'></span>
              </div>
            </Tab>
          ))}
          <div className="nav__plus active" onClick={() => setPopupActive(!popupActive)}>
            <span className='nav__plus--fr'></span>
            <span className='nav__plus--se'></span>
          </div>
        </TabList>

        <div className="pages">
            {popup.map((pop) => 
              <TabPanel>
                <CustomTab tabs={pop.item.content.tabs} services={content.find((con) => con.uid === pop.uid)} uid={pop.uid} params={hwl.find((hw) => hw.uid === pop.uid)} />
              </TabPanel>
            )}
        </div>
      </Tabs>
      <Request total={total} />
      <Footer />
    </div>
  )
}



export default App