import { useEffect } from 'react';
import frame1 from '../assets/logo/frame1.png';
import frame2 from '../assets/logo/frame2.png';
import frame3 from '../assets/logo/frame3.png';
import frame4 from '../assets/logo/frame4.png';

const FRAMES = [frame1, frame2, frame3, frame4];

export const useFaviconAnimation = () => {
  useEffect(() => {
    let cur = 0;
    
    const updateFavicon = (src) => {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = src;
      link.type = 'image/png';
    };

    const interval = setInterval(() => {
      cur = (cur + 1) % FRAMES.length;
      updateFavicon(FRAMES[cur]);
    }, 2600);

    return () => clearInterval(interval);
  }, []);
};
