const { postDevice, deleteDevice, putDevice, getDevice } = require('../../test-infra/api/index.js');

describe('PUT tests', () => {
    const newDeviceBody = {
        type: 'MAC',
        system_name: `PUT Device - ${Date.now()}`,
        hdd_capacity: '44'
    }
    let testDevice;
    beforeEach(async () => {
        testDevice = (await postDevice(newDeviceBody)).data;
    });

    afterEach(async () => {
        await deleteDevice(testDevice.id);
    })

    test('Should be able to update an existing device', async () => {
        const previousDeviceName = newDeviceBody.system_name;
        const updateRequestBody = { ...testDevice, system_name: `UPDATED Device - ${Date.now()}` }

        const updateResponse = await putDevice(updateRequestBody);
        expect(updateResponse.status).toBe(200);

        const getTestDevice = (await getDevice(updateRequestBody.id)).data;
        expect(previousDeviceName).not.toBe(getTestDevice.system_name);
    });


    test('Should throw error when updating record with invalid id', async () => {
        const updateRequestBody = { ...testDevice, id: null }

        const updateResponse = await putDevice(updateRequestBody);

        expect(updateResponse.status).not.toBe(200);
    });


    test('Should throw error when updating record with invalid body', async () => {
        const updateRequestBody = { id: `${Date.now()}` }

        const updateResponse = await putDevice(updateRequestBody);

        expect(updateResponse.status).not.toBe(200);
    });

});
