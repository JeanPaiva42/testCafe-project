import { t } from 'testcafe'
import newDevicePage from '../../pageObjects/newDevicePage'

export const insertNewDeviceCapacity = async (newDeviceCapacity) => {
    await t.typeText(await newDevicePage.getSystemCapacityInput(), newDeviceCapacity), { replace: true };
}
