import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, InputGroup, FormControl, Button, ListGroup } from 'react-bootstrap';

function App() {
  const [userInput, setUserInput] = useState('');
  const [list, setList] = useState([]);
  const [mode, setMode] = useState(false);


  const themeMode = () => {
    document.querySelector('body').setAttribute('data-bs-theme', mode ? 'dark' : 'light');
    setMode(!mode);
  };

  const addItem = (e) => {
    e.preventDefault();
    if (userInput.trim() !== '') {
      const newItem = {
        id: Math.random(),
        value: userInput,
        isChecked: false,
      };
      setList([...list, newItem]);
      setUserInput('');
    }
  };
  const deleteItem = (itemId) => {
    const updatedList = list.filter((item) => item.id !== itemId);
    setList(updatedList);
  };
  const checkItem = (itemId) => {
   //itemcheck and store
    const updatedList = list.map((item) => {
      if (item.id === itemId) {
        return {...item, isChecked:!item.isChecked };
      }
      return item;
    });
    setList(updatedList);
    };
  useEffect(() => {
      const items = JSON.parse(localStorage.getItem('myList'));
      if (items) {
       setList(items);
      }
    },[]); 
  useEffect(() => {
    localStorage.setItem('myList', JSON.stringify(list));
  }, [list,checkItem]);
  
  
  return (
    
    <Container>
      <Row>
        <div className='flex justify-center  mt-2'>
        <div className='h1 fw-bold mr-5'>TODO LIST</div> 
        <div className='mt-2 mb-2 ml-5'>
        <button className={mode?"bg-dark btn ":"bg-light btn "} onClick={themeMode}> {mode?"🌙":"🌞"} </button>
        </div>
        </div>
      </Row>
      
      <hr />
      <Row className='mt-3'>
        <Col md={{ span: 5, offset: 4 }}>
          <form onSubmit={addItem}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Add item..."
              size="lg"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <Button variant="primary" type='submit'>
              Add
            </Button>
          </InputGroup>
          </form>
          <ListGroup>
            {list.map((item) => (
              <ListGroup.Item key={item.id}>
                <div className="d-flex justify-between">
                    <div >
                       <input role="button" type="checkbox" className='mr-3' id={item.id} onChange={() => checkItem(item.id)} checked={item.isChecked}/>
                       <label role="button" className={item.isChecked ? 'text-decoration-line-through fw-bold text-danger' : 'fw-bold'} htmlFor={item.id}>{item.value}</label>
                    </div>
                    <div>
                      <Button variant="danger" size="sm" className="ml-2" onClick={() => deleteItem(item.id)}>
                         Delete
                      </Button>
                    </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      
    </Container>
  );
}

export default App;

