import { getDevices } from '../../test-infra/api/index';
import mainPage from '../../test-infra/e2e/pageObjects/mainPage';
import { baseURL } from '../config/testConfig';

fixture`Device Details Verification`
    .page(baseURL)

test(`Successfully verifies device information for each list item`, async t => {
    const devicesEndpointResponse = (await getDevices()).data;
    for (const testCase of devicesEndpointResponse) {
        const { system_name: systemName, type: systemType, hdd_capacity: systemCapacity } = testCase;

        await t.expect((await mainPage.getDeviceBox(systemName)).exists).ok();
        await t.expect((await mainPage.getDeviceName(systemName)).textContent).eql(systemName);
        await t.expect((await mainPage.getDeviceType(systemName)).textContent).eql(systemType);
        await t.expect((await mainPage.getDeviceCapacity(systemName)).textContent).contains(systemCapacity);

        await t.expect((await mainPage.editDeviceButton(systemName)).exists).ok();
        await t.expect((await mainPage.deleteDeviceButton(systemName)).exists).ok();
    }
});
