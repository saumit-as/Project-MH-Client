export interface User {
  username: string;
  key: string;
  userId: string;
  profileCompleted: boolean;
  //   profileId: string;
}

export interface Profile {
  key: string;
  assesmentCompleted: boolean;
  suggestedAreas: AreaOfImprovements[] | AreaOfImprovements;
  areaOfImprovement: AreaOfImprovements[] | AreaOfImprovements;
}

type AreaOfImprovements = "None" | "Anxiety" | "Depression" | "Addiction";

export interface Habit {
  key: string;
  name: string;
  date: string;
  duration: string;
  streak: number;
}

export interface TaskSet {
  key: string;
  email: string;
  tasks: Tasks[];
}

export interface Tasks {
  key: string;
  name: string;
  urgency: "urgent" | "not urgent";
  priority: "important" | "not important";
  duration: string;
}
