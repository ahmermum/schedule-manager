"use client";

import React, { useState, useEffect } from 'react';
import { generateInitialSchedule, rotateTeachers, assignTeachers } from '../utils/scheduleUtils';

const teachers = ['Teacher A', 'Teacher B', 'Teacher C', 'Teacher D', 'Teacher E', 'Teacher F'];
const classes = ['Class 1', 'Class 2', 'Class 3'];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function WeeklySchedule() {
  const [schedule, setSchedule] = useState(generateInitialSchedule(teachers, classes));
  const [week, setWeek] = useState(1);

  useEffect(() => {
    let newSchedule = generateInitialSchedule(teachers, classes);
    for (let i = 0; i < week; i++) {
      newSchedule = rotateTeachers(newSchedule);
    }
    newSchedule = assignTeachers(newSchedule, teachers);
    setSchedule(newSchedule);
  }, [week]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Week {week}</h2>
        <button
          onClick={() => setWeek(prev => (prev % 6) + 1)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <span>Next Week</span>
          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              {days.map(day => (
                <th key={day} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array(8).fill(null).map((_, hour) => (
              <tr key={hour} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {`${hour + 8}:00 - ${hour + 9}:00`}
                </td>
                {schedule.map((day, dayIndex) => (
                  <td key={dayIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${day[hour] ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {day[hour] || 'Break'}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
            <tr className="bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Homework</td>
              {days.map(day => (
                <td key={day} className="px-6 py-4">
                  <div className="h-16 bg-white rounded border border-gray-200"></div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

