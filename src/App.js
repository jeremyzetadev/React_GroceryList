import Header from './Header';
import Footer from './Footer';
import Content2 from './Content2';
import { useState, useEffect } from 'react';
import AddItem from './AddItem'
import SearchItem from './SearchItem'
import ApiRequest from './ApiRequest'

function App() {
  const API_URL = 'http://localhost:3500/items';

  //const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')) || []);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


    // useEffect(()=>{
    //     localStorage.setItem('shoppinglist',JSON.stringify(items));
    // }, [items])
    // load at start ** No reference var to change any time**
    useEffect(()=>{
        const fetchItems = async () => {
            try{
                const response = await fetch(API_URL);
                if(!response.ok) throw Error('Did not receive expected data');
                const listItems = await response.json();
                setItems(listItems);
                setFetchError(null);
            } catch (err) {
                console.log(err.stack);
                setFetchError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        setTimeout(()=>{
        fetchItems();
        },300)
    },[])

    const addItem = async (item) => {
        const id = items.length ? items[items.length-1].id + 1 : 1;
        const myNewItem = {id, checked:false, item}
        const listItems = [...items, myNewItem];
        setItems(listItems);
        // moved to useEffect every items changed usEffect is called
        // localStorage.setItem('shoppinglist',JSON.stringify(items));
        
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(myNewItem)
        }
        const resultErr = await ApiRequest(API_URL, postOptions);
        if(resultErr) setFetchError(resultErr);
    }

  const handleCheck = async (id) => {
        const listItems = items.map((item)=>(item.id===id ? {...item, checked: !item.checked} : item));
        setItems(listItems);

        const myItem = listItems.filter((item)=>item.id === id);
        const updateOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({checked: myItem[0].checked})
        }
        const reqUrl = `${API_URL}/${id}`;
        const resultErr = await ApiRequest(reqUrl, updateOptions);
        if (resultErr) setFetchError(resultErr);
  }

  const handleDelete = async (id) => {
        const listItems = items.filter((item)=>(item.id!=id))
        setItems(listItems);

        const deleteOptions = {
            method: 'DELETE',
        }
        const reqUrl = `${API_URL}/${id}`;
        const resultErr = await ApiRequest(reqUrl, deleteOptions);
        if(resultErr) setFetchError(resultErr);
  }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!newItem) return;
        addItem(newItem);
        setNewItem("");
    }

  return (
    <div className="App">
      <Header title="Grocery List"/>
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
        />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{color: "red"}}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && 
          <Content2
            items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        }
      </main>
      <Footer
        length={items.length}
      />
    </div>
  );
}

export default App;
