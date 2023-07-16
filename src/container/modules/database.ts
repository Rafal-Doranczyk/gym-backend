// import { AsyncContainerModule } from 'inversify';
// import { createConnection, ConnectionOptions } from 'typeorm';

// import * as Entities from 'entities';
// import * as R from 'repositories';

// const getDbConnection = async () => {
//   const {
//     POSTGRES_DB,
//     POSTGRES_PORT,
//     POSTGRES_HOST,
//     POSTGRES_USER,
//     POSTGRES_PASSWORD,
//   } = process.env;
//   const options: ConnectionOptions = {
//     type: 'postgres',
//     host: POSTGRES_HOST,
//     port: +POSTGRES_PORT,
//     username: POSTGRES_USER,
//     password: POSTGRES_PASSWORD,
//     database: POSTGRES_DB,
//   };
//   try {
//     return await createConnection({
//       ...options,
//       database: `${options.database}`,
//       entities: [...Object.values(Entities)],
//       dropSchema: true,
//       synchronize: true,
//     });
//   } catch (error) {
//     console.log('DB ERROR');
//     console.log(error);
//   }
// };

// export default new AsyncContainerModule(async (bind) => {
//   const connection = await getDbConnection();

//   // USER
//   const userRepository = connection.getCustomRepository(R.UserRepository);
//   bind(R.UserRepository).toConstantValue(userRepository);

//   const nutritionGoalsRepository = connection.getCustomRepository(R.NutritionGoalsRepository);
//   bind(R.NutritionGoalsRepository).toConstantValue(nutritionGoalsRepository);

//   // DIARY
//   const measurementsRepository = connection.getCustomRepository(R.MeasurementsRepository);
//   bind(R.MeasurementsRepository).toConstantValue(measurementsRepository);

//   // INGREDIENTS
//   const ingredientsRepository = connection.getCustomRepository(R.IngredientRepository);
//   bind(R.IngredientRepository).toConstantValue(ingredientsRepository);

//   const ingredientPriceRepository = connection.getCustomRepository(R.IngredientPriceRepository);
//   bind(R.IngredientPriceRepository).toConstantValue(ingredientPriceRepository);

//   // MEALS
//   const mealRepository = connection.getCustomRepository(R.MealRepository);
//   bind(R.MealRepository).toConstantValue(mealRepository);

//   const mealIngredientRepository = connection.getCustomRepository(R.MealIngredientRepository);
//   bind(R.MealIngredientRepository).toConstantValue(mealIngredientRepository);

//   // PLANS
//   const eatingDayPlanRepository = connection.getCustomRepository(R.EatingDayPlanRepository);
//   bind(R.EatingDayPlanRepository).toConstantValue(eatingDayPlanRepository);

//   // NUTRITION GROUPS
//   const ingredientGroupRepository = connection.getCustomRepository(R.IngredientGroupRepository);
//   bind(R.IngredientGroupRepository).toConstantValue(ingredientGroupRepository);

//   const mealGroupRepository = connection.getCustomRepository(R.MealGroupRepository);
//   bind(R.MealGroupRepository).toConstantValue(mealGroupRepository);

//   const eatingDayPlanGroupRepository = connection.getCustomRepository(
//     R.EatingDayPlanGroupRepository,
//   );
//   bind(R.EatingDayPlanGroupRepository).toConstantValue(eatingDayPlanGroupRepository);
// });
