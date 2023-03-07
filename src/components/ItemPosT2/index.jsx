import React from "react";
import { useDispatch } from "react-redux";
import { removePos, setPos } from "../../features/pos/posSlice";

export const ItemPosT2 = ({params, rodUid, poss, uid, title, coast, type, dopP, dopA}) => {
    
    const [clicked, setCkicked] = React.useState(false)

    const dispatch = useDispatch()


    React.useEffect(() => {
        const newItem = poss.find((ps) => ps.uid === uid)
        if (newItem) {
            // setActiveItem(newItem.value)
        }
    })

    
    // Данные
    const value = clicked === true ? 1 : null;

    const addPos = () => {

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
        }
    }

    const viewCoast = (type) => {

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
            <div className="item-pos__choice">
                {/* Кнопка + выбранный элемент */}
                <span 
                    className={clicked ? "item-pos__choice--title active" : "item-pos__choice--title"} 
                    onClick={() => setCkicked(!clicked)}
                    onMouseOut={() => addPos()}
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