export function calculateStreak(logs: string[]): number {
  const sorted = [...logs].sort().reverse();
  let streak = 0;
  let expected = new Date();
  for (const log of sorted) {
    const logDate = new Date(log);
    const diff = Math.floor(
      (expected.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diff === 0 || diff === 1) {
      streak++;
      expected = logDate;
    } else break;
  }
  return streak;
}

export function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

export function isCompletedToday(logs: string[]): boolean {
  const today = getToday();
  return logs.some((d) => d.split("T")[0] === today);
}

export function calculateWeeklyData(
  habits: { id: string }[],
  logs: Record<string, string[]>
): { day: string; score: number }[] {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const now = new Date();
  const currentDay = now.getDay();
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;

  return days.map((day, i) => {
    const date = new Date(now);
    date.setDate(now.getDate() + mondayOffset + i);
    const dateStr = date.toISOString().split("T")[0];

    if (date > now) return { day, score: 0 };

    const completedThatDay = Object.entries(logs).filter(([, dates]) =>
      dates.some((d) => d.split("T")[0] === dateStr)
    ).length;

    const score =
      habits.length === 0
        ? 0
        : Math.round((completedThatDay / habits.length) * 100);
    return { day, score };
  });
}

export function calculateConsistency(
  habits: { id: string }[],
  logs: Record<string, string[]>,
  days: number = 30
): number {
  if (habits.length === 0) return 0;
  const now = new Date();
  let total = 0;
  let completed = 0;
  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    total += habits.length;
    habits.forEach((h) => {
      if ((logs[h.id] || []).some((d) => d.split("T")[0] === dateStr)) {
        completed++;
      }
    });
  }
  return total === 0 ? 0 : Math.round((completed / total) * 100);
}

export function calculateOverallScore(
  habits: { id: string }[],
  logs: Record<string, string[]>
): number {
  if (habits.length === 0) return 0;
  const allDates = new Set(
    Object.values(logs)
      .flat()
      .map((d) => d.split("T")[0])
  );
  if (allDates.size === 0) return 0;
  const totalPossible = habits.length * allDates.size;
  const totalCompleted = Object.values(logs).flat().length;
  return Math.round((totalCompleted / totalPossible) * 100);
}

export function calculateCategoryProgress(
  habits: { id: string; category: string; icon: string }[],
  logs: Record<string, string[]>,
  days: number = 30
): { name: string; icon: string; score: number }[] {
  const categories = [...new Set(habits.map((h) => h.category))];
  const now = new Date();

  return categories.map((cat) => {
    const catHabits = habits.filter((h) => h.category === cat);
    const icon = catHabits[0]?.icon ?? "📂";
    let total = 0;
    let completed = 0;
    for (let i = 0; i < days; i++) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      total += catHabits.length;
      catHabits.forEach((h) => {
        if ((logs[h.id] || []).some((d) => d.split("T")[0] === dateStr)) {
          completed++;
        }
      });
    }
    const score = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { name: cat, icon, score };
  });
}
