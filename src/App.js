import React, { useState } from 'react'
import useTheme from '../src/hooks/useTheme'
import generateColorPalette from '../src/hooks/generateColorPalette'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClientProvider, QueryClient } from 'react-query'
import { hexToRgb, rgbToHex } from './helpers/helpers.js';

const colors = ["bannerPrimary","bannerFi","bannerSecondary","contentPrimaryBg","contentPrimaryFi","contentSecondaryBg","contentSecondaryFi","accentBg","accentFi","selectedBg","hyperlink"];
const staticColors = ["blue","red","yellowGreen","gold","skyBlue","profiseeGreen","coolGray","seaGreen","workspace"];

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
  // root.style.setProperty("bannerPrimary50", "newval"); /***** 50 is broken. I have a ticket in with the library creator
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
      colors.map((color) => {
        return UpdatePaletteCss( themeQuery.data[color], color, root);
      });
      staticColors.map((color) => {
        return UpdatePaletteCss( themeQuery.data[color], color, root);
      });
    }
  }, [themeQuery])
}

function ThemeComponent() {  
  const [themeName, setThemeName] = useState("default")
  const themeQuery = useTheme(themeName);
  useCssVariableUpdate(themeQuery);
  const paletteScale = [ "100", "200", "300", "400", "500", "600", "700", "800", "900"]

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
      


    <p className="bg-red-500 h-10 w-10 text-bannerSecondary500">test</p>

      {colors.map((color) => {
        return (
          <div>
            <p className="pt-3 pb-1 font-semibold text-xs">{color}</p>
            <div key={color} className="flex">
            
              {paletteScale.map((scale) => {
                return (
                  <div key={`${color}${scale}`} className={`${color}${scale} w-20 h-20`}>
                    <p className="text-xs p-1">{scale}</p>  
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default App;
