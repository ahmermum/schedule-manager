'use client';

import React, { useState } from 'react';
import WeeklySchedule from '../components/WeeklySchedule';
import ScheduleConfigComponent from '../components/ScheduleConfig';
import { type ScheduleConfig } from '../utils/scheduleUtils';

export default function Home() {
  const [activeTab, setActiveTab] = useState('schedule');
  const [config, setConfig] = useState<ScheduleConfig>({
    daysPerWeek: 5,
    hoursPerDay: 8,
    classes: ['Class 1', 'Class 2', 'Class 3'],
    teachers: ['Teacher A', 'Teacher B', 'Teacher C'],
    subjects: ['Math', 'English', 'Science'],
    breakPattern: [3, 6],
    rotationPattern: 'weekly' as 'weekly' | 'daily',
    teacherHoursPerDay: 6
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex justify-center space-x-8 px-6" aria-label="Tabs">
              {['schedule', 'config'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm sm:text-base capitalize transition-all duration-200`}
                >
                  {tab === 'schedule' ? '📅 Schedule' : '⚙️ Configuration'}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            <div className="animate-fadeIn">
              {activeTab === 'schedule' ? (
                <div className="space-y-4">
                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Weekly Class Schedule
                  </h1>
                  <p className="text-gray-500">
                    View and manage your weekly class schedule efficiently.
                  </p>
                  <WeeklySchedule />
                </div>
              ) : (
                <div className="space-y-4">
                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Schedule Configuration
                  </h1>
                  <p className="text-gray-500">
                    Customize your schedule settings and preferences.
                  </p>
                  <ScheduleConfigComponent config={config} onConfigChange={setConfig} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

