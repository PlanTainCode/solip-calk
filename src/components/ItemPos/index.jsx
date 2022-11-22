import React from "react";
import { useDispatch } from "react-redux";
import { removePos, setPos } from "../../features/pos/posSlice";

export const ItemPos = ({pos, uid, title, coast}) => {

    // Открытие/закрытие модульного окна
    const [itemActive, setItemActive] = React.useState(false)

    // Активный элемент
    const [activeItem, setActiveItem] = React.useState(null)

    // Значение активного элемента (по факту нахуй не сдалось)
    const [value, setValue] = React.useState(null)

    // Активный элемент сравненный с pos'ом
    const [plus, setPlus] = React.useState(null)

    // Список выборов
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
    ]

    // Массив с активными обьектами (с одним активным обьектом)
    const activeName = items[activeItem]

    // Диспатч
    const dispatch = useDispatch()

    // Добавление элемента в массив pos + организация работы клиента
    const addPos = (value, index) => {

        setActiveItem(index);
        setItemActive(false)

        const pos = {

            uid: uid,
            coast: coast,
            value: value,
        }

        dispatch(removePos(pos.uid))
        dispatch(setPos(pos))
        
    }


    // Проверка на нахождение в pos'е
    React.useEffect(() => {
        const newItem = pos.find((ps) => ps.uid === uid)

        if (newItem !== null) {
            setPlus(newItem)
        }

        
    })

    // console.log(plus)

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
                    onClick={() => setItemActive(!itemActive)}
                >
                    {activeItem === null ? 'Добавить' : activeName.title}
                </span>
                {/* Список элементов выбора */}
                <ul className={itemActive ? "item-pos__choice--sub active" : "item-pos__choice--sub"}>
                    {items.map((item, index) => (
                        <li 
                            key={`${item.value}_${index}`} 
                            value={item.value}
                            onClick={() => addPos(item.value, index)}
                            className={activeItem !== null && activeName.title === item.title ? "active" : ""}
                        >{item.title}</li>
                    ))}
                    <li value={null} onClick={(e) => addPos(e.target.value, null)}>Отмена</li>
                </ul>
                {/* Конец залупы */}
            </div>
        </div>
    )
}