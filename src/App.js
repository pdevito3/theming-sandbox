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

function UpdatePaletteCss(baseHex, cssVarName, documentRoot){
  let palette = generateColorPalette(rgbToHex(baseHex));
  // root.style.setProperty("navBg50", "newval"); /***** 50 is broken. I have a ticket in with the library creator
  documentRoot.style.setProperty(`--${cssVarName}100`, hexToRgb(palette["100"].hex));
  documentRoot.style.setProperty(`--${cssVarName}200`, hexToRgb(palette["200"].hex));
  documentRoot.style.setProperty(`--${cssVarName}300`, hexToRgb(palette["300"].hex));
  documentRoot.style.setProperty(`--${cssVarName}400`, hexToRgb(palette["400"].hex));
  documentRoot.style.setProperty(`--${cssVarName}500`, hexToRgb(palette["500"].hex));
  documentRoot.style.setProperty(`--${cssVarName}600`, hexToRgb(palette["600"].hex));
  documentRoot.style.setProperty(`--${cssVarName}700`, hexToRgb(palette["700"].hex));
  documentRoot.style.setProperty(`--${cssVarName}800`, hexToRgb(palette["800"].hex));
  documentRoot.style.setProperty(`--${cssVarName}900`, hexToRgb(palette["900"].hex));
}

function useCssVariableUpdate(themeQuery){
  React.useEffect(() => {  
    let root = document.documentElement;
    
    if(themeQuery.isSuccess){
      root.style.setProperty('--navBg', themeQuery.data.navBg);
      root.style.setProperty('--navFi', themeQuery.data.navFi);
      root.style.setProperty('--navContent', themeQuery.data.navContent);

      // calculate values:
      UpdatePaletteCss( themeQuery.data.navBg, "navBg", root);
      UpdatePaletteCss( themeQuery.data.navFi, "navFi", root);
      UpdatePaletteCss( themeQuery.data.navContent, "navContent", root);
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
        <button className="iconButton iconShadowOg">
        {/* <svg className="svg" aria-hidden="true" focusable="false" data-prefix="far" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z" class=""></path></svg> */}
        </button>
      </div>
      <div className="p3">
        <button className="iconButton iconShadowTheme">
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
        <div className="navFi100">{}</div>
        <div className="navFi200">{}</div>
        <div className="navFi300">{}</div>
        <div className="navFi400">{}</div>
        <div className="navFi500">{}</div>
        <div className="navFi600">{}</div>
        <div className="navFi700">{}</div>
        <div className="navFi800">{}</div>
        <div className="navFi900">{}</div>
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
