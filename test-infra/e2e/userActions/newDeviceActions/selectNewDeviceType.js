import { t } from 'testcafe'
import newDevicePage from '../../pageObjects/newDevicePage'

export const selectNewDeviceType = async (newDeviceType) => {
    const dropdown = await newDevicePage.getTypeDropdown();
    const option = dropdown.child(`option[value="${newDeviceType}"]`);
    await t
        .click(dropdown)
        .click(option);
}
