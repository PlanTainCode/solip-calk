import React from "react";
import { useDispatch } from "react-redux";
import { removePos, setPos } from "../../features/pos/posSlice";

export const ItemPos = ({poss, uid, title, coast}) => {
    const [modalActive, setModalActive] = React.useState(false)
    
    const [activeItem, setActiveItem] = React.useState(null)

    const dispatch = useDispatch()

    const cast = poss.map((ps) => ps.coast)
    const times = poss.map((ps) => ps.value)

    



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
            uid: uid,
            coast: coast,
            value: value,
        }

        dispatch(removePos(uid))
        dispatch(setPos(pos))
        
        if (value === null) {
            dispatch(removePos(uid))
            setActiveItem(null)
        }
    }

    // console.log(activeName)

    return (
        <div className='item-pos'>
            {/* Наименование услуги (тут все четко) */}
            <p className="item-pos__b">{title}</p>
            {/* Цена услуги (тоже все четко) */}
            <p><div className="item-pos__coast">Цена:</div>{coast} {coast === 'Договорная' ? undefined : "kr/m2"}</p>
            {/* Элемент выбора */}
            <div className="item-pos__choice">
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
                    {/* <li 
                        value={null} 
                        onClick={() => setModalActive(false) && dispatch(removePos(uid))}
                    >Отмена</li> */}
                </ul>
                {/* Конец залупы */}
            </div>
        </div>
    )
}