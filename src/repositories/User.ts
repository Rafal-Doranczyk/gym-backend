import { TokenPayload } from 'google-auth-library';
import { UpdateUserSettingsPayload, constants, enums } from 'gym-shared';

import { UserSettingsEntity, UserEntity } from 'entities';
import { dataSource } from 'container/modules/database';

function UserRepository() {
  return dataSource.getRepository(UserEntity).extend({
    getInitialUserSettings(payload?: UpdateUserSettingsPayload) {
      const settings = new UserSettingsEntity();
      settings.palette = payload?.palette || constants.DEFAULT_PALETTE_MODE;
      settings.currency = payload?.currency || constants.DEFAULT_CURRENCY;
      settings.activeMeasurementsKeys = Object.values(enums.MEASUREMENTS_TYPES);

      return settings;
    },
    async createUserWithGoogle(payload: TokenPayload) {
      const user = this.create({
        email: payload.email,
        username: payload.name,
      });

      user.settings = this.getInitialUserSettings();

      // user.ingredientGroups = this.manager
      //   .getCustomRepository(IngredientGroupRepository)
      //   .getInitialUserGroups();

      // user.mealGroups = this.manager.getCustomRepository(MealGroupRepository).getInitialMealGroups();

      // user.eatingDayPlanGroups = this.manager
      //   .getCustomRepository(EatingDayPlanGroupRepository)
      //   .getInitialEatingDayPlanGroups();

      await this.save(user);

      // user.ingredients = await this.manager
      //   .getCustomRepository(IngredientRepository)
      //   .createInitialIngredients(user);

      return user;
    },
  });
}

export default UserRepository();
