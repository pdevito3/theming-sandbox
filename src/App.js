import React, { useState } from 'react'

function App() {
  const [themeName, setThemeName] = useState("red")

  const changeTheme = React.useCallback(
    () => {
      let root = document.documentElement;

      if(themeName === "red"){        
        root.style.setProperty('--primary', "blue");
        setThemeName("blue") 
      } 
      else{
        root.style.setProperty('--primary', "red");
        setThemeName("red");
      }
    },
    [themeName],
  )


  return (
    <div>
      <p className="primary">
        {themeName}
      </p>
      <button onClick={() => changeTheme()}>
        change theme
      </button>
    </div>
  );
}

export default App;
