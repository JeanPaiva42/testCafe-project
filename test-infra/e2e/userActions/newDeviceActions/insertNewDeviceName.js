import { t } from 'testcafe'
import newDevicePage from '../../pageObjects/newDevicePage'

export const insertNewDeviceName = async (newDeviceName) => {
    await t.typeText(await newDevicePage.getSystemNameInput(), newDeviceName, { replace: true });
}
