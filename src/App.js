import React, { useState } from 'react'
import useTheme from '../src/hooks/useTheme'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClientProvider, QueryClient } from 'react-query'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
    <ThemeComponent />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function useCssVariableUpdate(themeQuery){
  React.useEffect(() => {  
    let root = document.documentElement;
    
    if(themeQuery.isSuccess){
      root.style.setProperty('--primary', themeQuery.data.primary);
    }
  }, [themeQuery])
}

function ThemeComponent() {  
  const [themeName, setThemeName] = useState("default")
  const [themeKey, setThemeKey] = useState(1)
  const themeQuery = useTheme(themeKey);
  useCssVariableUpdate(themeQuery);

  const changeTheme = React.useCallback(
    () => {
      if(themeName === "default"){        
        setThemeKey(2)
        setThemeName("custom") 
      } 
      else{
        setThemeKey(1)
        setThemeName("default");
      }
    },
    [themeName]
  )

  return (
    <div>
      <p className="primary">
        {
          themeQuery.isLoading ? "Loading..." : ""
        }
        {
          themeQuery.isSuccess ? themeQuery.data.primary : ""
        }
      </p>
      <button onClick={() => changeTheme()}>
        change theme to {themeName === "default" ? "custom" : "default"}
      </button>
    </div>
  )
}

export default App;
