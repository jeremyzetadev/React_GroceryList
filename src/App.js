import Header from './Header';
import Footer from './Footer';
import Content2 from './Content2';
import { useState } from 'react';

function App() {
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
    <div className="App">
      <Header title="Grocery List"/>
      <Content2
        items={items}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer
        length={items.length}
      />
    </div>
  );
}

export default App;
