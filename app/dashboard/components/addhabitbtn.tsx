"use client";

import { useState } from "react";
import Button from "./button";
import AddHabitModal from "./AddHabitModal";

export default function AddHabitBtn() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant={"primary"} side={"md"} onClick={() => setOpen(true)}>
        <span className="mr-2">+</span> Add Habit
      </Button>
      <AddHabitModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
