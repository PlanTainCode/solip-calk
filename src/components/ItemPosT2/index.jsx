import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removePos, setPos, removeAllPos } from "../../features/pos/posSlice";
import { removeMussum, setMussum } from '../../features/mussum/mussumSlice'
import { resetTotal, setTotal } from '../../features/total/totalSlice'
import { isEqual } from 'underscore'

export const ItemPosT2 = ({params, rodUid, poss, uid, title, coast, type, dopP, dopA}) => {

    const pos = useSelector((state) => state.posData.pos)
    const currentPos = pos.find((p) => p.uid === uid);

    const whatPos = () => {
        if (currentPos) {
            if (currentPos.value === 1) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    
    const [clicked, setCkicked] = React.useState(whatPos())
    const [scroll, setScroll] = React.useState(0);
    const dispatch = useDispatch()

    const [posLenght, setPosLenght] = React.useState([])

    const [matrs, setMatrs] = React.useState();

    const mussum = useSelector((state) => state.mussumData.mussum)

    
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
        }
        
    }


    
    // Данные

    const addPos = (value) => {

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
        setMatrs(pos.value)
        if (value === null) {
            dispatch(removePos(uid))
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



    React.useEffect(() => {
        if (clicked === true) {
            addPos(1)
        } else {
            addPos(null)
        }
    }, [clicked])


    return (
        <div className='item-pos'>
            {/* Наименование услуги (тут все четко) */}
            <p className="item-pos__b">{title}</p>
            {/* Цена услуги (тоже все четко) */}
            <p><div className="item-pos__coast">Цена:</div>{coast} {coast === 'Договорная' ? undefined : viewCoast(type)}</p>
            {/* Элемент выбора */}
            <div className="item-pos__choice">
                {/* Кнопка + выбранный элемент */}
                <span 
                    className={clicked ? "item-pos__choice--title active" : "item-pos__choice--title"} 
                    onClick={() => {setCkicked(!clicked); mars()}}

                >
                    {clicked ? 'Убрать' : 'Добавить'}
                    {/* Добавить */}
                </span>
                {/* Список элементов выбора */}
                
                {/* Конец залупы */}
            </div>
        </div>
    )
}