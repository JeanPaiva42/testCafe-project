import mainPage from '../../test-infra/e2e/pageObjects/mainPage';
import { getDevices, postDevice, deleteDevice } from '../../test-infra/api/index.js';
import { userAttemptsTo } from '../../test-infra/e2e/userActions/index';
import { baseURL } from '../config/testConfig';

let getDevicesResponseList;
let lastDeviceFromResponse;
let nameOfDeviceToBeDeleted;
let idOfDeviceToBeDeleted;

async function cleanUp(deviceBody) {
    await postDevice(deviceBody);
}

async function verifyDeviceDeletion(t, deviceName, sizeOfListBeforeDelete) {
    const updatedDevicesList = (await getDevices()).data;

    // Assert that the device is not found in the list
    await t.expect((await mainPage.getDeviceName(deviceName)).exists).notOk();

    // Assert that the list size has decreased
    await t.expect(sizeOfListBeforeDelete).notEql(updatedDevicesList.length);
}

// tests are running in a very sterile environment already, but on this case if we have more than one device with the same name, this test could fail
fixture`Deleting devices Verifications`
    .page(baseURL)
    .beforeEach(async t => {
        getDevicesResponseList = (await getDevices()).data;

        lastDeviceFromResponse = getDevicesResponseList[getDevicesResponseList.length - 1];
        idOfDeviceToBeDeleted = lastDeviceFromResponse.id;
        nameOfDeviceToBeDeleted = lastDeviceFromResponse.system_name;
    })
    .afterEach(async t => {
        await cleanUp(lastDeviceFromResponse);
    });

test(`Successfully deletes a device through the UI`, async t => {
    await userAttemptsTo.clickOnDeleteDevice(nameOfDeviceToBeDeleted);
    await userAttemptsTo.reloadPage();

    await verifyDeviceDeletion(t, nameOfDeviceToBeDeleted, getDevicesResponseList.length);
});

test(`Successfully deletes a device through the API`, async t => {
    const deleteResponse = await deleteDevice(idOfDeviceToBeDeleted);
    // assert for the endpoint response
    await t.expect(deleteResponse.status).eql(200);

    await userAttemptsTo.reloadPage();

    await verifyDeviceDeletion(t, nameOfDeviceToBeDeleted, getDevicesResponseList.length);
});
