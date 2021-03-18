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
      root.style.setProperty('--bannerBg', themeQuery.data.bannerBg);
      root.style.setProperty('--bannerFi', themeQuery.data.bannerFi);
      root.style.setProperty('--bannerContent', themeQuery.data.bannerContent);
    }
  }, [themeQuery])
}

function ThemeComponent() {  
  const [themeName, setThemeName] = useState("default")
  const themeQuery = useTheme(themeName);
  useCssVariableUpdate(themeQuery);

  const changeTheme = React.useCallback(
    () => {
      if(themeName === "default"){     
        setThemeName("custom") 
      } 
      else{
        setThemeName("default");
      }
    },
    [themeName]
  )

  return (
    <div className="">
      <p className="bannerBg bannerFi">
        {
          themeQuery.isLoading ? "Loading..." : ""
        }
        {
          themeQuery.isSuccess ? "test" : ""
        }
      </p>
      <button className="bannerContent" onClick={() => changeTheme()}>
        change theme to {themeName === "default" ? "custom" : "default"}
      </button>
    </div>
  )
}

export default App;
