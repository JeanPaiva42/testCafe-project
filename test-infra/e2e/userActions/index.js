import { userAttemptsTo as generalActions } from './generalActions';
import { userAttemptsTo as mainPageActions } from './mainPageActions';
import { userAttemptsTo as newDeviceActions } from './newDeviceActions';

export const userAttemptsTo = {
    ...generalActions,
    ...newDeviceActions,
    ...mainPageActions
};
