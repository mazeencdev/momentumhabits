const data = [
  {
    id: 1,
    title: "Habit Tracking",
    description:
      "Easily track your daily habits and routines to stay on top of your goals.",
    icon: "/insights.svg",
  },
  {
    id: 2,
    title: "Goal Setting",
    description:
      "Set and manage your personal goals with our intuitive goal-setting tools.",
    icon: "/streak.svg",
  },
  {
    id: 3,
    title: "Progress Visualization",
    description:
      "Visualize your progress with charts and graphs to stay motivated.",
    icon: "/progress.svg",
  },
  {
    id: 4,
    title: "Reminders & Notifications",
    description:
      "Receive timely reminders and notifications to keep you on track.",
    icon: "/reminders.svg",
  },
];

export default function Card() {
  return (
    <>
      {data.map((item) => (
        <div className="w-fit h-fit flex flex-col bg-white/90">
          <img
            src={item.icon}
            alt={item.title}
            className="w-10 h-10 mx-auto bg-[#2d6b4f]/20 p-1 rounded-md"
          />
          <h1 className="text-xl font-bold mt-2">{item.title}</h1>
          <p className="text-sm text-black/70 mt-1">{item.description}</p>
        </div>
      ))}
    </>
  );
}
