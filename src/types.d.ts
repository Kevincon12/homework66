export interface Meal {
    id?: string;
    type: 'breakfast' | 'snack' | 'lunch' | 'dinner';
    description: string;
    calories: number;
}
