import React from 'react';

function SectionHeading({ title, subtitle, className = '' }) {
  return (
    <div className={`text-center mb-12 md:mb-16 ${className}`}>
      <h2 className="text-4xl md:text-5xl lg:text-6xl mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;