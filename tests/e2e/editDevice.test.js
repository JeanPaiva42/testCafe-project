import mainPage from '../../test-infra/e2e/pageObjects/mainPage';
import { getDevices, putDevice } from '../../test-infra/api/index';
import { userAttemptsTo } from '../../test-infra/e2e/userActions/index';
import { baseURL } from '../config/testConfig';

const newDeviceName = 'Renamed Device';
let firstDeviceFromResponse;

async function cleanUp(deviceBody) {
    await putDevice(deviceBody);
}

fixture`Editing Device Details`
    .page(baseURL)
    .beforeEach(async t => {
        firstDeviceFromResponse = (await getDevices()).data[0];
    })
    .afterEach(async t => {
        cleanUp(firstDeviceFromResponse);
    })

test(`Succesfully edits device through the UI`, async t => {
    const { system_name: systemName, type: systemType, hdd_capacity: systemCapacity } = firstDeviceFromResponse;

    await userAttemptsTo.clickOnEditDevice(systemName);
    await userAttemptsTo.insertNewDeviceName(newDeviceName);
    await userAttemptsTo.submitNewDevice();
    await userAttemptsTo.reloadPage();

    // Confirms that the element on the screen has the correct name and type and capacity
    await t.expect((await mainPage.getDeviceName(newDeviceName)).textContent).eql(newDeviceName);
    await t.expect((await mainPage.getDeviceType(newDeviceName)).textContent).eql(systemType);
    await t.expect((await mainPage.getDeviceCapacity(newDeviceName)).textContent).contains(systemCapacity);
    // revert the item to the previous state
    cleanUp(firstDeviceFromResponse);
});

test(`Successfully edits device through API`, async t => {
    const { type: systemType, hdd_capacity: systemCapacity } = firstDeviceFromResponse;
    const testDeviceBody = { ...firstDeviceFromResponse, system_name: newDeviceName };

    await putDevice(testDeviceBody);

    await userAttemptsTo.reloadPage();

    await t.expect((await mainPage.getDeviceName(newDeviceName)).textContent).eql(newDeviceName);
    await t.expect((await mainPage.getDeviceType(newDeviceName)).textContent).eql(systemType);
    await t.expect((await mainPage.getDeviceCapacity(newDeviceName)).textContent).contains(systemCapacity);

    cleanUp(firstDeviceFromResponse);
});
