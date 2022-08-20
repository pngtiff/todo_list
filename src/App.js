import './style.css';
import React from 'react';
import Header from './components/Header'
import Todo from './components/Todo'

function App() {
  // Dark Mode setting
  const [darkMode, setDarkMode] = React.useState(false)

  function toggleDarkMode() {
    setDarkMode(prevMode => !prevMode)
  }

  return (
    <main className={darkMode ? "dark" : ""}>
      <Header 
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <Todo 
        darkMode={darkMode}
        
        toggleDarkMode={toggleDarkMode}
      />
    </main>
  );
}

export default App;
