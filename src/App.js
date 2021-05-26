import React, { useState } from 'react'
import useTheme from './hooks/themes/useTheme'
import generateColorPalette from '../src/hooks/generateColorPalette'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClientProvider, QueryClient } from 'react-query'
import { hexToRgb, rgbToHex } from './helpers/helpers.js';

const colors = ["bannerPrimary","bannerFi","bannerSecondary","contentPrimaryBg","contentPrimaryFi","contentSecondaryBg","contentSecondaryFi","accentBg","accentFi","selectedBg","hyperlink"];

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
  const paletteScale = [ "100", "200", "300", "400", "500", "600", "700", "800", "900"]; /***** 50 is broken. I have a ticket in with the library creator */
  let palette = generateColorPalette(rgbToHex(baseHex));

  paletteScale.forEach((scale) => {
    documentRoot.style.setProperty(`--${cssVarName}${scale}`, hexToRgb(palette[scale].hex));
  })
}

function useCssVariableUpdate(themeQuery){
  React.useEffect(() => {  
    let root = document.documentElement;
    
    if(themeQuery.isSuccess){
      colors.map((color) => {
        return UpdatePaletteCss( themeQuery.data[color], color, root);
      });
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
      <p className="bannerPrimary bannerFi">
        {
          themeQuery.isLoading ? "Loading..." : ""
        }
        {
          themeQuery.isSuccess ? "test" : ""
        }
      </p>
      <button className="bannerSecondary" onClick={() => changeTheme()}>
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

      {colors.map((color) => {
        return (
          <div>
            <p>{color}</p>
            <div key={color} className="flex">
              <div className={`${color}100`}>{}</div>
              <div className={`${color}200`}>{}</div>
              <div className={`${color}300`}>{}</div>
              <div className={`${color}400`}>{}</div>
              <div className={`${color}500`}>{}</div>
              <div className={`${color}600`}>{}</div>
              <div className={`${color}700`}>{}</div>
              <div className={`${color}800`}>{}</div>
              <div className={`${color}900`}>{}</div>
            </div>
          </div>
        )
      })}

      {/* <div className="flex">
        <div className="bannerPrimary100">{}</div>
        <div className="bannerPrimary200">{}</div>
        <div className="bannerPrimary300">{}</div>
        <div className="bannerPrimary400">{}</div>
        <div className="bannerPrimary500">{}</div>
        <div className="bannerPrimary600">{}</div>
        <div className="bannerPrimary700">{}</div>
        <div className="bannerPrimary800">{}</div>
        <div className="bannerPrimary900">{}</div>
      </div>
      <div className="flex">
        <div className="bannerFi100">{}</div>
        <div className="bannerFi200">{}</div>
        <div className="bannerFi300">{}</div>
        <div className="bannerFi400">{}</div>
        <div className="bannerFi500">{}</div>
        <div className="bannerFi600">{}</div>
        <div className="bannerFi700">{}</div>
        <div className="bannerFi800">{}</div>
        <div className="bannerFi900">{}</div>
      </div>
      <div className="flex">
        <div className="bannerSecondary100">{}</div>
        <div className="bannerSecondary200">{}</div>
        <div className="bannerSecondary300">{}</div>
        <div className="bannerSecondary400">{}</div>
        <div className="bannerSecondary500">{}</div>
        <div className="bannerSecondary600">{}</div>
        <div className="bannerSecondary700">{}</div>
        <div className="bannerSecondary800">{}</div>
        <div className="bannerSecondary900">{}</div>
      </div> */}
    </div>
  )
}

export default App;
