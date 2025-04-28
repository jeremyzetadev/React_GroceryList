import React from 'react'

const Footer = ({length}) => {
  const today = new Date();

  return (
    <footer style={{
      backgroundColor: 'mediumblue',
      color: '#fff',
    }}>
      {length!=0 ?
        (<p>{length} List {length===1 ? "item" : "items"}</p>)
      : 
        (<p>There is no items in the list</p>)
      }
      {/* 
       <p>Copyright &copy; {today.getFullYear()}</p> 
      */}
    </footer>
  )
}

export default Footer
