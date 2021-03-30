import React, { useEffect} from "react";

import {
    createSaturationScale,
    createHueScale,
    createDistributionValues,
  } from '../helpers/scales.js';
  import {
    hexToHSL,
    HSLToHex,
    isHex,
    round,
    luminanceFromHex,
    lightnessFromHSLum,
  } from '../helpers/helpers.js';

export default function useColorPalette(hex) {  
    useEffect(() => {
      const newPalette = {};

        const tweakHue = 0;
        const tweakLMax = 97;
        const tweakLMin = 10;
        const tweakSaturation = 0;
      
      if (hex.length === 7 && isHex(hex)) {
        const distribution = 'lightness';
        const useLightness = distribution === 'lightness';
        const lum = luminanceFromHex(hex);
        const inputHsl = hexToHSL(hex);
        const { h, s, l } = inputHsl;
        const hueScale = createHueScale(tweakHue);
        const saturationScale = createSaturationScale(tweakSaturation);
  
        const distributionScale = createDistributionValues(
            tweakLMin,
            tweakLMax,
            useLightness ? l : lum,
          );
  
        hueScale.forEach(({key, tweak}, i) => {
          // Hue value must be between 0-360
          // todo: fix this inside the function
          let newH = h + hueScale[i].tweak;
          newH = newH < 0 ? 360 + newH - 1 : newH;
          newH = newH > 720 ? newH - 360 : newH;
          newH = newH > 360 ? newH - 360 : newH;
  
          // Saturation must be between 0-100
          // todo: fix this inside the function
          let newS = s + saturationScale[i].tweak;
          newS = newS > 100 ? 100 : newS;

          const newL = useLightness
            ? distributionScale[i].tweak
            : lightnessFromHSLum(newH, newS, distributionScale[i].tweak);
  
            console.log({newH, newS, newL});
          const newHex = HSLToHex(newH, newS, newL);
          const paletteI = key;
  
          newPalette[paletteI] = {
            hex: newHex,
            h: newH,
            hScale: hueScale[i].tweak,
            s: round(newS, 2),
            sScale: saturationScale[i].tweak,
            l: round(newL, 2),
            lum: round(luminanceFromHex(newHex)),
            dist: distribution,
          };
        });
  
        console.log(newPalette);
      }
    })
};