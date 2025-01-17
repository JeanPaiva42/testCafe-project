import { t } from 'testcafe'
import newDevicePage from '../../pageObjects/newDevicePage'

export const submitNewDevice = async () => {
    await t.click(await newDevicePage.getSubmitButton());
}
