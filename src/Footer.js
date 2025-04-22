import React from 'react'

const Footer = () => {
  const today = new Date();

  return (
    <footer style={{
      backgroundColor: 'mediumblue',
      color: '#fff',
    }}>
      <p>Copyright &copy; {today.getFullYear()}</p>
    </footer>
  )
}

export default Footer
