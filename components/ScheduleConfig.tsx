"use client"

import React from 'react';
import { type ScheduleConfig } from '../utils/scheduleUtils';
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"

interface ScheduleConfigProps {
  config: ScheduleConfig;
  onConfigChange: (newConfig: ScheduleConfig) => void;
}

export default function ScheduleConfigComponent({ config, onConfigChange }: ScheduleConfigProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | { name: string; value: string }) => {
    const name = 'target' in e ? e.target.name : e.name;
    const value = 'target' in e ? e.target.value : e.value;
    
    let newValue: any = value;

    if (name === 'daysPerWeek' || name === 'hoursPerDay' || name === 'teacherHoursPerDay') {
      newValue = parseInt(value, 10);
    } else if (name === 'classes' || name === 'teachers' || name === 'subjects' || name === 'breakPattern') {
      newValue = value.split(',').map(item => item.trim());
    }

    onConfigChange({ ...config, [name]: newValue });
  };

  return (
    <Card>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {[
          { label: "Days per Week", name: "daysPerWeek", type: "number" },
          { label: "Hours per Day", name: "hoursPerDay", type: "number" },
          { label: "Classes", name: "classes", type: "text", value: config.classes.join(', ') },
          { label: "Teachers", name: "teachers", type: "text", value: config.teachers.join(', ') },
          { label: "Subjects", name: "subjects", type: "text", value: config.subjects.join(', ') },
          { label: "Break Pattern", name: "breakPattern", type: "text", value: config.breakPattern.map(String).join(', ') }
        ].map((field) => (
          <div key={field.name} className="space-y-2">
            <Label>{field.label}</Label>
            <Input
              type={field.type}
              name={field.name}
              value={field.value || String(config[field.name as keyof typeof config])}
              onChange={handleChange}
              placeholder={`Enter ${field.label.toLowerCase()}`}
            />
          </div>
        ))}
        
        <div className="space-y-2">
          <Label>Rotation Pattern</Label>
          <Select 
            value={config.rotationPattern} 
            onValueChange={(value) => handleChange({ name: "rotationPattern", value })}
          >
            <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
              <SelectValue placeholder="Select rotation pattern" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily Rotation</SelectItem>
              <SelectItem value="weekly">Weekly Rotation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Teacher Hours per Day</Label>
          <Input
            type="number"
            name="teacherHoursPerDay"
            value={config.teacherHoursPerDay}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </CardContent>
    </Card>
  );
}

