import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { removePos, setPos, removeAllPos } from "../../features/pos/posSlice";
import { removeMussum, setMussum } from '../../features/mussum/mussumSlice'
import { resetTotal, setTotal } from '../../features/total/totalSlice'
import { isEqual } from 'underscore'

export const ItemPos = ({params, rodUid, poss, uid, title, coast, type, dopP, dopA}) => {
    const [modalActive, setModalActive] = React.useState(false)
    
    const [activeItem, setActiveItem] = React.useState(null)

    const dispatch = useDispatch()

    const [posLenght, setPosLenght] = React.useState([])

    React.useEffect(() => {

      if (isEqual(pos, posLenght) === true) {
        console.log('');
      } else {
        console.log('');
        setPosLenght(pos);
      }

    })

  
    const pos = useSelector((state) => state.posData.pos)
  
    const mussum = useSelector((state) => state.mussumData.mussum)

    // Функции подсчета
    const pars = (length, width, high, type) => {
        if (type === 'S') {
          return (Number(width) * Number(length))
        }
  
        if (type === 'C') {
          return (((Number(width) + Number(length)) / 4) * Number(high))
        }
        if (type === 'sht') {
          return 1
        }
      }
  
      const item = (coast, value, length, width, high, type, dopP, dopA) => {
        if (coast === "Договорная") {
          dispatch(setMussum(0))
        } else {
          dispatch(setMussum((Number(coast) * Number(value) * pars(length, width, high, type)) + ((Number(dopP) * ((Number(length) + Number(width)) * 2)) * Number(dopA)) ))
        }
      }
      
      const mars = () => {
        dispatch(removeMussum());
        posLenght?.map((pps) => item(pps.coast, pps.value, pps.length, pps.width, pps.high, pps.type, pps.dopP, pps.dopA));
  
        dispatch(resetTotal())
  
        if (mussum.length !== 0) {
          dispatch(setTotal(mussum.reduce((a, b) => a + b)))
        }
        
      }
    // 

    React.useEffect(() => {
        const newItem = poss.find((ps) => ps.uid === uid)
        if (newItem) {
            setActiveItem(newItem.value)
        }
    })

    
    // Данные
    const items = [
        {
            value: 1,
            title: "1 стена"
        },
        {
            value: 2,
            title: "2 стены"
        },
        {
            value: 3,
            title: "3 стены"
        },
        {
            value: 4,
            title: "4 стены"
        },
        {
            value: null,
            title: "Отмена"
        },
    ]

    const activeName = items[activeItem - 1]

    const addPos = (value) => {
        
        setModalActive(false)

        const pos = {
            rodUid: rodUid,
            uid: uid,
            coast: coast,
            value: value,
            type: type,
            dopP: dopP === undefined ? 1 : dopP,
            dopA: dopA === undefined ? 1 : dopA,
            high: params?.high,
            width: params?.width,
            length: params?.length,
        }

        dispatch(removePos(uid))
        dispatch(setPos(pos))
        if (value === null) {
            dispatch(removePos(uid))
            setActiveItem(null)
        }
    }

    const viewCoast = (type) => {
        if (type === '1sh') {
            return "kr/m2"
        }

        if (type === 'S') {
            return "kr/m2"
        }

        if (type === 'sht') {
            return "шт"
        }
    }

    return (
        <div className='item-pos'>
            {/* Наименование услуги (тут все четко) */}
            <p className="item-pos__b">{title}</p>
            {/* Цена услуги (тоже все четко) */}
            <p><div className="item-pos__coast">Цена:</div>{coast} {coast === 'Договорная' ? undefined : viewCoast(type)}</p>
            {/* Элемент выбора */}
            <div className="item-pos__choice" onMouseOut={() => mars()}>
                {/* Кнопка + выбранный элемент */}
                <span 
                    className={activeItem !== null ? "item-pos__choice--title active" : "item-pos__choice--title"} 
                    onClick={() => setModalActive(!modalActive)}
                >
                    {activeItem === null ? 'Добавить' : activeName.title}
                    {/* Добавить */}
                </span>
                {/* Список элементов выбора */}
                <ul 
                    className={modalActive ? "item-pos__choice--sub active" : "item-pos__choice--sub"}
                >
                    {items.map((item) => (
                        <li 
                            key={`${item.value}__${uid}`} 
                            value={item.value}
                            onClick={() => addPos(item.value)}
                            className={activeItem !== null && activeName.title === item.title ? "active" : ""}
                        >{item.title}</li>
                    ))}
                </ul>
                {/* Конец залупы */}
            </div>
        </div>
    )
}