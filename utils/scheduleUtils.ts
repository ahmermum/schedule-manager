type Teacher = string;
type Class = string;
type DaySchedule = (Teacher | null)[];
type WeekSchedule = DaySchedule[];

export interface ScheduleConfig {
  daysPerWeek: number;
  hoursPerDay: number;
  classes: string[];
  teachers: string[];
  subjects: string[];
  breakPattern: number[];
  rotationPattern: 'daily' | 'weekly';
  teacherHoursPerDay: number;
}

export function generateInitialSchedule(teachers: Teacher[], classes: Class[]): WeekSchedule {
  const daySchedule: DaySchedule = Array(8).fill(null);
  return Array(5).fill(daySchedule);
}

export function rotateTeachers(schedule: WeekSchedule): WeekSchedule {
  return schedule.map(day => {
    const firstTeacher = day[0];
    return [...day.slice(1), firstTeacher];
  });
}

export function assignTeachers(schedule: WeekSchedule, teachers: Teacher[]): WeekSchedule {
  return schedule.map(day => {
    let availableTeachers = [...teachers];
    return day.map((slot, index) => {
      if (index % 2 === 0 && availableTeachers.length > 0) {
        const teacherIndex = Math.floor(Math.random() * availableTeachers.length);
        const teacher = availableTeachers[teacherIndex];
        availableTeachers.splice(teacherIndex, 1);
        return teacher;
      }
      return null;
    });
  });
}

