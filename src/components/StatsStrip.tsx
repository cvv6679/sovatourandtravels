import React from "react";
import { MapPin, Calendar, Users } from "lucide-react";

const stats = [
  { icon: <MapPin className="w-6 h-6 text-primary" />, value: "15+", label: "Routes" },
  { icon: <Calendar className="w-6 h-6 text-primary" />, value: "30+", label: "Years Experience" },
  { icon: <Users className="w-6 h-6 text-primary" />, value: "1000+", label: "Happy Travelers" },
];

const StatsStrip = () => (
  <section className="section-padding bg-background/5">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-3">
            {stat.icon}
            <div>
              <div className="text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsStrip;
