import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

function TeamCard({ name, description, image }) {
  return (
    <Card className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group">
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-3xl mb-3 text-primary">{name}</h3>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

export default TeamCard;