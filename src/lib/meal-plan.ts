// Types for dietary preferences
export type DietaryPreference =
  | 'vegetarian'
  | 'vegan'
  | 'gluten-free'
  | 'dairy-free'
  | 'keto'
  | 'paleo';

export type CuisinePreference =
  | 'italian'
  | 'mexican'
  | 'asian'
  | 'mediterranean'
  | 'indian'
  | 'middle-eastern';

export type CalorieRange = 'low' | 'medium' | 'high';

export interface UserPreferences {
  dietary: DietaryPreference[];
  cuisines: CuisinePreference[];
  calorieRange: CalorieRange;
}

// Meal plan types
export interface Meal {
  id: string;
  type: 'Breakfast' | 'Lunch' | 'Dinner';
  name: string;
  image: string;
  calories: number;
  prepTime: string;
}

export interface DayPlan {
  day: string;
  meals: Meal[];
}

export interface MealPlan {
  week: string;
  days: DayPlan[];
}

/**
 * Save user preferences to local storage
 */
export function saveUserPreferences(preferences: UserPreferences): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  }
}

/**
 * Get user preferences from local storage
 */
export function getUserPreferences(): UserPreferences | null {
  if (typeof window !== 'undefined') {
    const preferences = localStorage.getItem('userPreferences');
    if (preferences) {
      return JSON.parse(preferences);
    }
  }
  return null;
}

/**
 * Generate a meal plan based on user preferences
 * In a real app, this would call an API
 */
export function generateMealPlan(preferences?: UserPreferences): MealPlan {
  // In a real implementation, we would use the preferences to filter recipes
  // This is a simplified example with hardcoded data

  // Sample data for the meal plan
  return {
    week: getNextWeekDateRange(),
    days: [
      {
        day: "Monday",
        meals: [
          {
            id: "1",
            type: "Breakfast",
            name: "Greek Yogurt with Berries",
            image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 320,
            prepTime: "5 min",
          },
          {
            id: "2",
            type: "Lunch",
            name: "Chicken Caesar Salad",
            image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 450,
            prepTime: "15 min",
          },
          {
            id: "3",
            type: "Dinner",
            name: "Baked Salmon with Vegetables",
            image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 520,
            prepTime: "25 min",
          },
        ],
      },
      {
        day: "Tuesday",
        meals: [
          {
            id: "4",
            type: "Breakfast",
            name: "Avocado Toast with Egg",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 350,
            prepTime: "10 min",
          },
          {
            id: "5",
            type: "Lunch",
            name: "Vegetable Soup with Bread",
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 380,
            prepTime: "20 min",
          },
          {
            id: "6",
            type: "Dinner",
            name: "Turkey Meatballs with Pasta",
            image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 580,
            prepTime: "30 min",
          },
        ],
      },
      {
        day: "Wednesday",
        meals: [
          {
            id: "7",
            type: "Breakfast",
            name: "Berry Smoothie Bowl",
            image: "https://images.unsplash.com/photo-1553530666-ba11a90a0868?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 290,
            prepTime: "10 min",
          },
          {
            id: "8",
            type: "Lunch",
            name: "Mediterranean Wrap",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 420,
            prepTime: "15 min",
          },
          {
            id: "9",
            type: "Dinner",
            name: "Grilled Chicken with Quinoa",
            image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 550,
            prepTime: "25 min",
          },
        ],
      },
      {
        day: "Thursday",
        meals: [
          {
            id: "10",
            type: "Breakfast",
            name: "Overnight Oats with Almonds",
            image: "https://images.unsplash.com/photo-1502747265570-17c9aaf9a02b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 310,
            prepTime: "5 min (plus overnight)",
          },
          {
            id: "11",
            type: "Lunch",
            name: "Chicken Sandwich",
            image: "https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 480,
            prepTime: "15 min",
          },
          {
            id: "12",
            type: "Dinner",
            name: "Beef Stir Fry",
            image: "https://images.unsplash.com/photo-1512058556646-c4da40fba323?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 560,
            prepTime: "25 min",
          },
        ],
      },
      {
        day: "Friday",
        meals: [
          {
            id: "13",
            type: "Breakfast",
            name: "Vegetable Egg Muffins",
            image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 280,
            prepTime: "20 min",
          },
          {
            id: "14",
            type: "Lunch",
            name: "Black Bean Soup",
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 390,
            prepTime: "15 min",
          },
          {
            id: "15",
            type: "Dinner",
            name: "Grilled Salmon with Asparagus",
            image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 540,
            prepTime: "20 min",
          },
        ],
      },
      {
        day: "Saturday",
        meals: [
          {
            id: "16",
            type: "Breakfast",
            name: "Pancakes with Fresh Fruit",
            image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 420,
            prepTime: "20 min",
          },
          {
            id: "17",
            type: "Lunch",
            name: "Caprese Salad with Avocado",
            image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 380,
            prepTime: "10 min",
          },
          {
            id: "18",
            type: "Dinner",
            name: "Homemade Pizza",
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 650,
            prepTime: "40 min",
          },
        ],
      },
      {
        day: "Sunday",
        meals: [
          {
            id: "19",
            type: "Breakfast",
            name: "Vegetable Frittata",
            image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 360,
            prepTime: "25 min",
          },
          {
            id: "20",
            type: "Lunch",
            name: "Quinoa Bowl with Roasted Vegetables",
            image: "https://images.unsplash.com/photo-1556039225-f7dee1aba945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 410,
            prepTime: "30 min",
          },
          {
            id: "21",
            type: "Dinner",
            name: "Lemon Herb Roasted Chicken",
            image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 520,
            prepTime: "1 hr",
          },
        ],
      },
    ],
  };
}

/**
 * Helper function to get the next week's date range
 */
function getNextWeekDateRange(): string {
  const now = new Date();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Start of next week (next Monday)
  const start = new Date(now);
  start.setDate(now.getDate() + (7 - now.getDay() + 1) % 7 + 1);

  // End of next week (Sunday after next)
  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  // Format: "June 10 - June 16, 2024"
  return `${monthNames[start.getMonth()]} ${start.getDate()} - ${monthNames[end.getMonth()]} ${end.getDate()}, ${start.getFullYear()}`;
}
