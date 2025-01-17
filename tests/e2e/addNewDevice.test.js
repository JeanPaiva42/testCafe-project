import mainPage from '../../test-infra/e2e/pageObjects/mainPage';
import { userAttemptsTo } from '../../test-infra/e2e/userActions/index';
import { baseURL } from '../config/testConfig';

fixture`Device Addition Verification`
    .page(baseURL)

test(`Successfully adds new device to the list`, async t => {
    const newDeviceName = `TEST DEVICE - ${Date.now()}`;
    const newDeviceType = 'MAC';
    const newDeviceCapacity = '1';

    await userAttemptsTo.clickOnAddNewDevice();
    await userAttemptsTo.insertNewDeviceName(newDeviceName);
    await userAttemptsTo.selectNewDeviceType(newDeviceType);
    await userAttemptsTo.insertNewDeviceCapacity(newDeviceCapacity);
    await userAttemptsTo.submitNewDevice();

    await t.expect((await mainPage.getDeviceBox(newDeviceName)).exists).ok();
    await t.expect((await mainPage.getDeviceName(newDeviceName)).textContent).eql(newDeviceName)
        .expect((await mainPage.getDeviceType(newDeviceName)).textContent).eql(newDeviceType)
        .expect((await mainPage.getDeviceCapacity(newDeviceName)).textContent).contains(newDeviceCapacity);
});
