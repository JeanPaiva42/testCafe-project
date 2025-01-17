import { t } from 'testcafe'
import mainPage from '../../pageObjects/mainPage'

export const clickOnAddNewDevice = async () => {
    await t.click(await mainPage.getAddNewDeviceButton());
}
