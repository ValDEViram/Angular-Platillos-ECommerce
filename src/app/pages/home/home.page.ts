import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public loaded = false;
  dishes: any[] = [];
  filteredDishes: any[] = [];
  readonly API: string =
    'https://www.themealdb.com/api/json/v1/1/search.php?f=b';

  getIngredients = (meal: { [key: string]: any }): string[] => {
    return Object.keys(meal)
      .filter((key) => key.startsWith('strIngredient') && meal[key]) // Only truthy values
      .map((key) => meal[key]); // Map to ingredient values
  };

  async getFoodAPI() {
    try {
      const res = await fetch(this.API);
      const data = await res.json();

      if (data.meals) {
        const mealData = data.meals.map((meal: { [key: string]: any }) => {
          const {
            strMeal = null,
            strCategory = null,
            strArea = null,
            strMealThumb = null,
            strYoutube = null,
            strSource = null,
          } = meal;

          return {
            strMeal,
            strCategory,
            strArea,
            strMealThumb,
            strYoutube,
            strSource,
            ingredients: this.getIngredients(meal),
          };
        });

        this.dishes = mealData;
        this.filteredDishes = this.dishes;
        if (this.dishes) {
          this.loaded = true;
          console.log(this.loaded);
        }
        console.log(this.dishes);
      } else {
        console.error('No se encontró ningun platillo');
      }
    } catch (error) {
      console.error('Error al capturar los datos de la API', error);
    }
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredDishes = this.dishes.filter(
      (d) => d.strMeal.toLowerCase().indexOf(query) > -1
    );
    console.log(this.filteredDishes);
  }

  constructor() {}

  ngOnInit() {
    this.getFoodAPI();
  }
}
