import Button from "./button";

const PlanType = [
  {
    name: "Free Plan",
    desc: "Build consistency without the overwhelm. Track your habits, stay accountable, and start building momentum one day at a time.",
  },
  {
    name: "Momentum Pro",
    desc: "Turn small actions into long-term growth. Unlock advanced tools designed to help you stay disciplined, focused, and consistent.",
  },
  {
    name: "Lifetime Plan",
    desc: "Pay once. Build momentum forever. For creators, students, athletes, and ambitious people who want every premium feature without a subscription.",
  },
];

const planFeatures = [
  [
    "Track up to 5 habits",
    "Daily streak tracking",
    "Progress insights",
    "Simple habit analytics",
  ],
  [
    "Unlimited habits",
    "Personalized recommendations",
    "Smart reminders",
    "Goal tracking system",
  ],
  [
    "Everything in Momentum Pro",
    "Lifetime updates",
    "Early access to new features",
    "Exclusive future integrations",
  ],
];

const planPrices = ["$0/mo", "$9/mo", "$79 one-time"];

export default function PricingCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {PlanType.map((plan, index) => (
        <div
          key={index}
          className="space-y-5 bg-white p-10 flex flex-col justify-around rounded-2xl w-[500px]"
        >
          <div>
            <p className="text-xl font-semibold">{plan.name}</p>
            <p className="text-sm text-[#6B7280]">{plan.desc}</p>
          </div>

          <div className="flex flex-col gap-3">
            {planFeatures[index].map((feature, featureIndex) => (
              <div
                key={featureIndex}
                className="flex items-center gap-3 bg-[#F9F7F4] border border-[#E8E4DF] rounded-xl px-4 py-3"
              >
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
          <Button variant={"full"} side={"md"}>
            {planPrices[index]}
          </Button>
        </div>
      ))}
    </div>
  );
}
