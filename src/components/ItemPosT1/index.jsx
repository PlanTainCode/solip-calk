import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { removePos, setPos, removeAllPos } from "../../features/pos/posSlice";
import { removeMussum, setMussum } from '../../features/mussum/mussumSlice'
import { resetTotal, setTotal } from '../../features/total/totalSlice'
import { isEqual } from 'underscore'

export const ItemPosT1 = ({params, rodUid, poss, uid, title, coast, type, dopP, dopA}) => {
    

    const dispatch = useDispatch()
    const [scroll, setScroll] = React.useState(0);

    const pos = useSelector((state) => state.posData.pos);
    const currentPos = pos.find((p) => p.uid === uid);
    const [count, setCount] = React.useState(currentPos ? currentPos.value : 0);



    const [matrs, setMatrs] = React.useState()

    const [posLenght, setPosLenght] = React.useState([])

    // обновлять при скролле
    const handleScroll = () => {
      setScroll(window.scrollY);
  
    };

    React.useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    React.useEffect(() => {
      mars()
    }, [scroll])

    React.useEffect(() => {

      if (isEqual(pos, posLenght) === true) {
        // console.log('');
      } else {
        // console.log('');
        setPosLenght(pos);
      }

    })

    React.useEffect(() => {
      if (currentPos) {
        mars()
      }
    }, [])


    const mussum = useSelector((state) => state.mussumData.mussum)

    // Функции подсчета
    const pars = (length, width, high, type) => {
        if (type === 'S') {
          return (Number(width) * Number(length))
        }

        if (type === '1sh') {
          return (((Number(width) + Number(length)) / 2) * Number(high))
        }
        if (type === 'sht') {
          return 1
        }
        if (type === 'P') {
            return ((Number(width) + Number(length)) * 2)
        }
        if (type === 'Lsh') {
            return ((Number(width) + Number(length)) / 2)
        }
      }
  
      const item = (coast, value, length, width, high, type, dopP, dopA) => {
        if (coast === "Enligt överenskommelse") {
          dispatch(setMussum(1))
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
          setMatrs(mussum.reduce((a, b) => a + b))
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
            return "kr/bit"
        }

        if (type === 'P') {
            return "kr/m"
        }

        if (type === 'Lsh') {
            return "kr/m"
        }
      }



    const Con = (val) => {

        if (val === 1) {
            if (count > 0) {
                setCount((prev) => prev - 1)
            } else {
                setCount(0)
            }
            
        } 
        
        if (val === 0) {
            setCount((prev) => prev + 1)
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
    
        // console.log(pos)

        dispatch(removePos(uid))
        dispatch(setPos(pos))
        setMatrs(pos)
        if (count === 0) {
            dispatch(removePos(uid))
        }
    }

    React.useEffect(() => {
      addPos();
    }, [count]);

    React.useEffect(() => {
      mars();
    }, [matrs]);


    return (
        <div className='item-pos'>
            {/* Наименование услуги (тут все четко) */}
            <p className="item-pos__b">{title}</p>
            {/* Цена услуги (тоже все четко) */}
            <p><div className="item-pos__coast">Цена:</div>{coast} {coast === 'Enligt överenskommelse' ? undefined : viewCoast(type)}</p>
            {/* Элемент выбора */}
            <div className="item-pos__choice">
                {/* Кнопка + выбранный элемент */}
                <div 
                  className="item-pos__choice--sht" 
                  // onMouseOut={() => mars()}
                >
                    <button 
                        onClick={() => Con(1)} 
                        className={count === 0 ? "disabled" : ""}
                    >-</button>
                    <p>{count}</p>
                    <button 
                        onClick={() => Con(0)} 
                    >+</button>
                </div>
                
            </div>
        </div>
    )
}