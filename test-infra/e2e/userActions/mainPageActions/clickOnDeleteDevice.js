import { t } from 'testcafe'
import mainPage from '../../pageObjects/mainPage'

export const clickOnDeleteDevice = async (deviceName) => {
    await t.click(await mainPage.deleteDeviceButton(deviceName));
}
