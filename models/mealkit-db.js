const mealkits = [
    {
        title: 'Curried Chicken Salad Lettuce Wraps',
        includes: 'Apple, Raisins & Cilantro',
        description: '',
        category: 'Classic Meals',
        price: 19.99,
        cookingTime: 20,
        servings: 4,
        caloriesPerServing: 890,
        imageUrl: 'img/curried_chicken.jpeg',
        topMeal: true
    },
    {
        title: 'Roasted Sockeye Salmon',
        includes: 'Salmon, Potato, Green Bean & Eggs',
        description: '',
        category: 'Classic Meals',
        price: 19.99,
        cookingTime: 20,
        servings: 4,
        caloriesPerServing: 890,
        imageUrl: 'img/sockeye_salmon.jpeg',
        topMeal: true
    },
    {
        title: 'Caprese Veggie Burger',
        includes: 'Mozzarella, Basil Pesto & Arugula Salad',
        description: '',
        category: 'Vegan Meals',
        price: 19.99,
        cookingTime: 20,
        servings: 4,
        caloriesPerServing: 890,
        imageUrl: 'img/veggie_burger.jpeg',
        topMeal: true
    },
    {
        title: 'Chicken Taco Salad Boats',
        includes: 'Black Beans, Tomato, Cheese & Guacamole',
        description: '',
        category: 'Classic Meals',
        price: 19.99,
        cookingTime: 20,
        servings: 4,
        caloriesPerServing: 890,
        imageUrl: 'img/taco_salad.jpeg',
        topMeal: true
    },
    {
        title: 'Rotisserie Chicken Noodle Soup',
        includes: 'Vegetables, Cilantro & Lime',
        description: '',
        category: 'Classic Meals',
        price: 19.99,
        cookingTime: 20,
        servings: 4,
        caloriesPerServing: 890,
        imageUrl: 'img/chicken_noodle_soup.jpeg',
        topMeal: true
    },
    {
        title: 'Mixed Berry-Lime Smoothie Bowl',
        includes: 'Banana & Granola',
        description: '',
        category: 'Vegan Meals',
        price: 19.99,
        cookingTime: 20,
        servings: 4,
        caloriesPerServing: 890,
        imageUrl: 'img/berry_smoothie.jpeg',
        topMeal: true
    }
];

module.exports.getTopMeals = () => {
    const topMeals = [];

    mealkits.forEach(meal => {
        if (meal.topMeal) {
            topMeals.push(meal);
        }
    })

    return topMeals;
}

module.exports.getMealsByCategory = () => {
    const category = {};
    
    mealkits.forEach(meal => {
        if (category[meal.category]) {
            console.log(category[meal.category].mealKits)
            category[meal.category].mealKits.push(meal);
        } else {
            category[meal.category] = {
                categoryName: meal.category,
                mealKits: [meal]
            }
        }
    })

    const categoriesArray = [];

    for (const key in category) {
        categoriesArray.push(category[key])
    }

    return categoriesArray
}