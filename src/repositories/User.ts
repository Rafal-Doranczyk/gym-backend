import { TokenPayload } from 'google-auth-library';
import { UpdateUserSettingsPayload, constants, enums } from 'gym-shared';

import { dataSource } from '../container/modules/database';

import { UserSettingsEntity, UserEntity } from '@/entities';

function getInitialUserSettings(payload?: UpdateUserSettingsPayload) {
  const settings = new UserSettingsEntity();
  settings.palette = payload?.palette || constants.DEFAULT_PALETTE_MODE;
  settings.currency = payload?.currency || constants.DEFAULT_CURRENCY;
  settings.activeMeasurementsKeys = Object.values(enums.MEASUREMENTS_TYPES);

  return settings;
}

function UserRepo() {
  return dataSource.getRepository(UserEntity).extend({
    async createUserWithGoogle(payload: TokenPayload) {
      const user = this.create({
        email: payload.email,
        username: payload.name,
      });

      user.settings = getInitialUserSettings();

      await this.save(user);

      return user;
    },
  });
}

export default UserRepo();
