import React, { useState } from 'react'
import useTheme from '../src/hooks/useTheme'
import generateColorPalette from '../src/hooks/generateColorPalette'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClientProvider, QueryClient } from 'react-query'
import { hexToRgb, rgbToHex } from './helpers/helpers.js';


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
      root.style.setProperty('--navBg', themeQuery.data.navBg);
      root.style.setProperty('--navFi', themeQuery.data.navFi);
      root.style.setProperty('--navContent', themeQuery.data.navContent);

      // calculate values:
      let navBgPalette = generateColorPalette(rgbToHex(themeQuery.data.navBg));
      // root.style.setProperty("navBg50", "newval"); /***** 50 is broken. I have a ticket in with the library creator
      root.style.setProperty("--navBg100", hexToRgb(navBgPalette["100"].hex));
      root.style.setProperty("--navBg200", hexToRgb(navBgPalette["200"].hex));
      root.style.setProperty("--navBg300", hexToRgb(navBgPalette["300"].hex));
      root.style.setProperty("--navBg400", hexToRgb(navBgPalette["400"].hex));
      root.style.setProperty("--navBg500", hexToRgb(navBgPalette["500"].hex));
      root.style.setProperty("--navBg600", hexToRgb(navBgPalette["600"].hex));
      root.style.setProperty("--navBg700", hexToRgb(navBgPalette["700"].hex));
      root.style.setProperty("--navBg800", hexToRgb(navBgPalette["800"].hex));
      root.style.setProperty("--navBg900", hexToRgb(navBgPalette["900"].hex));

      
      let navContentPalette = generateColorPalette(rgbToHex(themeQuery.data.navContent));
      // root.style.setProperty("navBg50", "newval"); /***** 50 is broken. I have a ticket in with the library creator
      root.style.setProperty("--navContent100", hexToRgb(navContentPalette["100"].hex));
      root.style.setProperty("--navContent200", hexToRgb(navContentPalette["200"].hex));
      root.style.setProperty("--navContent300", hexToRgb(navContentPalette["300"].hex));
      root.style.setProperty("--navContent400", hexToRgb(navContentPalette["400"].hex));
      root.style.setProperty("--navContent500", hexToRgb(navContentPalette["500"].hex));
      root.style.setProperty("--navContent600", hexToRgb(navContentPalette["600"].hex));
      root.style.setProperty("--navContent700", hexToRgb(navContentPalette["700"].hex));
      root.style.setProperty("--navContent800", hexToRgb(navContentPalette["800"].hex));
      root.style.setProperty("--navContent900", hexToRgb(navContentPalette["900"].hex));
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
      <p className="navBg navFi">
        {
          themeQuery.isLoading ? "Loading..." : ""
        }
        {
          themeQuery.isSuccess ? "test" : ""
        }
      </p>
      <button className="navContent" onClick={() => changeTheme()}>
        change theme to {themeName === "default" ? "custom" : "default"}
      </button>
      <div className="p3">
        <button className="iconButton">
        {/* <svg className="svg" aria-hidden="true" focusable="false" data-prefix="far" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z" class=""></path></svg> */}
        </button>
      </div>
      <div className="flex">
        <div className="navBg100">{}</div>
        <div className="navBg200">{}</div>
        <div className="navBg300">{}</div>
        <div className="navBg400">{}</div>
        <div className="navBg500">{}</div>
        <div className="navBg600">{}</div>
        <div className="navBg700">{}</div>
        <div className="navBg800">{}</div>
        <div className="navBg900">{}</div>
      </div>
      <div className="flex">
        <div className="navContent100">{}</div>
        <div className="navContent200">{}</div>
        <div className="navContent300">{}</div>
        <div className="navContent400">{}</div>
        <div className="navContent500">{}</div>
        <div className="navContent600">{}</div>
        <div className="navContent700">{}</div>
        <div className="navContent800">{}</div>
        <div className="navContent900">{}</div>
      </div>
    </div>
  )
}

export default App;
