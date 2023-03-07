import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { removePos, setPos, removeAllPos } from "../../features/pos/posSlice";
import { removeMussum, setMussum } from '../../features/mussum/mussumSlice'
import { resetTotal, setTotal } from '../../features/total/totalSlice'
import { isEqual } from 'underscore'

export const ItemPosT1 = ({params, rodUid, poss, uid, title, coast, type, dopP, dopA}) => {
    

    const dispatch = useDispatch()
    
    const [count, setCount] = React.useState(0)


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



    const Con = (val) => {

        if (val === 1) {
            if (count > 0) {
                setCount(count - 1)
            } else {
                setCount(0)
            }
            
        } 
        
        if (val === 0) {
            setCount(count + 1)
        }
    }

    const addPos = () => {
        const pos = {
            rodUid: rodUid,
            uid: uid,
            coast: coast,
            value: count,
            type: type,
            dopP: dopP === undefined ? 0 : dopP,
            dopA: dopA === undefined ? 0 : dopA,
            high: params?.high,
            width: params?.width,
            length: params?.length,
        }
    
        console.log(pos)

        dispatch(removePos(uid))
        dispatch(setPos(pos))
        
        if (count === 0) {
            dispatch(removePos(uid))
        }
    }

    


    return (
        <div className='item-pos'>
            {/* Наименование услуги (тут все четко) */}
            <p className="item-pos__b">{title}</p>
            {/* Цена услуги (тоже все четко) */}
            <p><div className="item-pos__coast">Цена:</div>{coast} {coast === 'Договорная' ? undefined : viewCoast(type)}</p>
            {/* Элемент выбора */}
            <div className="item-pos__choice">
                {/* Кнопка + выбранный элемент */}
                <div className="item-pos__choice--sht" onMouseOut={() => mars()}>
                    <button 
                        onClick={() => Con(1)} 
                        className={count === 0 ? "disabled" : ""}
                        onMouseOut={() => addPos()}
                    >-</button>
                    <p>{count}</p>
                    <button 
                        onClick={() => Con(0)} 
                        onMouseOut={() => addPos()}
                    >+</button>
                </div>
                
            </div>
        </div>
    )
}