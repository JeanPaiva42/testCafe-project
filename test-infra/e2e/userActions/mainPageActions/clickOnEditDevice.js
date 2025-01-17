import { t } from 'testcafe'
import mainPage from '../../pageObjects/mainPage'

export const clickOnEditDevice = async (deviceName) => {
    await t.click(await mainPage.editDeviceButton(deviceName));
}
