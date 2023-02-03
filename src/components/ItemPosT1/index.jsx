import React from "react";
import { useDispatch } from "react-redux";
import { removePos, setPos } from "../../features/pos/posSlice";

export const ItemPosT1 = ({params, rodUid, poss, uid, title, coast, type}) => {
    
    const dispatch = useDispatch()
    
    const [count, setCount] = React.useState(0)


    const newCount = count;
    // React.useEffect(() => {
        
    //     const newItem = poss.find((ps) => ps.uid === uid)
    //     if (newItem) {
    //         setCount(newItem.value)
    //     }
    // })

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
            value: newCount,
            type: type,
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
                <div className="item-pos__choice--sht">
                    <button 
                        onClick={() => Con(1)} 
                        className={count === 0 ? "disabled" : ""}
                        onMouseOut={() => addPos()}
                    >-</button>
                    <p>{newCount}</p>
                    <button 
                        onClick={() => Con(0)} 
                        onMouseOut={() => addPos()}
                    >+</button>
                </div>
                
            </div>
        </div>
    )
}