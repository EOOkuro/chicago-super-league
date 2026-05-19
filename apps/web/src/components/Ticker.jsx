import React from 'react';

function Ticker() {
  const text = "Hunnids AC • Bronzeville AC • Midway FC • Pilsen FC • Hyde Park Rangers • Beverly FC • Al Farooq FC • GF.Chicago.SN • ";
  
  return (
    <div className="bg-[hsl(var(--black))] text-[hsl(var(--true-white))] py-4 overflow-hidden border-y border-[hsl(var(--gray))]/30">
      <div className="flex whitespace-nowrap w-[200%] animate-ticker">
        <div className="w-1/2 flex justify-around font-['Bebas_Neue'] text-2xl md:text-3xl tracking-wider">
          {text}
        </div>
        <div className="w-1/2 flex justify-around font-['Bebas_Neue'] text-2xl md:text-3xl tracking-wider">
          {text}
        </div>
      </div>
    </div>
  );
}

export default Ticker;