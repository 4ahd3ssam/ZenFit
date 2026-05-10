// Free workouts API: wger.de — no auth, CORS enabled
// Docs: https://wger.de/api/v2/

const cache = new Map();

// remove HTML tags from API description
const stripHtml = (s) =>
  s.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export async function fetchExercises(opts) {
  const cacheKey = `v2:${opts.equipment}:${opts.category || "all"}`;

  // return cached data if exists
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  // API endpoint
  const url =
    "https://wger.de/api/v2/exerciseinfo/?language=2&limit=120&status=2";

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch exercises");

  const data = await res.json();

  let list = data.results
    .filter((r) => r.name && r.description)
    .map((r) => ({
      id: r.id,
      name: r.name,
      description: stripHtml(r.description).slice(0, 400),
      muscle:
        (r.muscles[0] && (r.muscles[0].name_en || r.muscles[0].name)) ||
        (r.category && r.category.name) ||
        "Full body",
      equipment:
        r.equipment.map((e) => e.name).join(", ") || "Bodyweight",
      image:
        (r.images.find((i) => i.is_main) &&
          r.images.find((i) => i.is_main).image) ||
        (r.images[0] && r.images[0].image),
      category: r.category ? r.category.name : undefined,
    }));

  // filter for home workouts only
  if (opts.equipment === "home") {
    list = list.filter((e) =>
      /none|bodyweight|mat|band|dumbbell/i.test(e.equipment)
    );
  }

  cache.set(cacheKey, list);
  return list;
}

// fallback data if API fails
export const FALLBACK_EXERCISES = [
  {
    id: -1,
    name: "Push-Up",
    description:
      "Lower your body until your chest nearly touches the floor, then push back up.",
    muscle: "Chest",
    equipment: "Bodyweight",
    sets: 4,
    reps: 5
  },
  {
    id: -2,
    name: "Bodyweight Squat",
    description:
      "Stand with feet shoulder-width apart, lower hips back and down, return to standing.",
    muscle: "Quads",
    equipment: "Bodyweight",
    sets: 4,
    reps: 5
  },
  {
    id: -3,
    name: "Plank",
    description:
      "Hold a forearm plank with a straight line from head to heels.",
    muscle: "Core",
    equipment: "Bodyweight",
    sets: 4,
    reps: 5
  },
  {
    id: -4,
    name: "Lunges",
    description:
      "Step forward and lower until both knees form 90 degrees. Alternate legs.",
    muscle: "Glutes",
    equipment: "Bodyweight",
    sets: 4,
    reps: 5
  },
  {
    id: -5,
    name: "Mountain Climbers",
    description:
      "From plank, drive knees toward chest in a running motion.",
    muscle: "Core",
    equipment: "Bodyweight",
    sets: 4,
    reps: 5
  },
  {
    id: -6,
    name: "Burpees",
    description:
      "Squat, kick back to plank, push-up, jump back up explosively.",
    muscle: "Full body",
    equipment: "Bodyweight",
    sets: 4,
    reps: 5
  },
  {
    id: -7,
    name: "Glute Bridge",
    description: "Lie on back, drive hips up by squeezing glutes.",
    muscle: "Glutes",
    equipment: "Bodyweight",
    sets: 4,
    reps: 5
  },
  {
    id: -8,
    name: "Tricep Dips",
    description:
      "Using a chair, lower body by bending elbows and press back up.",
    muscle: "Triceps",
    equipment: "Chair",
    sets: 4,
    reps: 5
  },
  {
    id: -9,
    name: "Jumping Jacks",
    description:
      "Jump while spreading legs and raising arms overhead.",
    muscle: "Full body",
    equipment: "Bodyweight",
    sets: 4,
    reps: 5
  },
  {
    id: -10,
    name: "Bicycle Crunches",
    description:
      "Lying on back, alternate elbow to opposite knee.",
    muscle: "Abs",
    equipment: "Bodyweight",
    sets: 4,
    reps: 5
  },
  {
    id: -11,
    name: "High Knees",
    description:
      "Run in place driving knees up toward chest.",
    muscle: "Cardio",
    equipment: "Bodyweight",
    sets: 4,
    reps: 5
  },
  {
    id: -12,
    name: "Superman",
    description:
      "Lying face down, lift arms and legs off the ground.",
    muscle: "Lower back",
    equipment: "Bodyweight",
    sets: 4,
    reps: 5
  },
];