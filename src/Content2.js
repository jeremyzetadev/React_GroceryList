import React from 'react'
import { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'

const Content2 = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      checked: false,
      item: "Sugar",
    },
    {
      id: 2,
      checked: false,
      item: "Milk",
    },
    {
      id: 3,
      checked: true,
      item: "Coffee",
    },
  ]);

  
  const handleCheck = (id) => {
    const listItems = items.map((item)=>(item.id===id ? {...item, checked: !item.checked} : item));
    setItems(listItems);
    localStorage.setItem('shoppinglist',JSON.stringify(listItems));
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item)=>(item.id!=id))
    setItems(listItems);
    localStorage.setItem('shoppinglist',JSON.stringify(listItems));
  }
  
  return (
    <main>
      {items.length ? (
      <ul>
        {items.map((item) => (
          <li className="item" key={item.id}>
            <input type="checkbox" checked={item.checked} onChange={()=>handleCheck(item.id)}/>
            <label
              style={(item.checked) ? {textDecoration: 'line-through'} : null}
              onDoubleClick={()=>handleCheck(item.id)}
            >{item.item}</label>
            <FaTrashAlt role="button" tabIndex="0" onClick={()=>handleDelete(item.id)}/>
          </li>
        ))}
      </ul>   
      ) : (
        <p style={{marginTop: '2rem' }}>Your list is empty</p>
      )
      }
    </main>
  )

}

export default Content2
