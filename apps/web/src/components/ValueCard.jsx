import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

function ValueCard({ icon: Icon, title, description }) {
  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="text-2xl mb-2">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ValueCard;