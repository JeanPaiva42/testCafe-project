const { getDevices, postDevice, deleteDevice } = require('../../test-infra/api/index.js');
const { containsObjectWithKeyValue } = require('../utils/containsObjectWithKeyValue.js');

describe('POST tests', () => {
    const newDeviceBody = {
        type: 'MAC',
        system_name: `NEW PC 2 - ${Date.now()}`,
        hdd_capacity: '44'
    }
    let postDeviceResponse;
    let getDevicesResponse;

    beforeEach(async () => {
        getDevicesResponse = (await getDevices()).data;
    });

    afterEach(async () => {
        await deleteDevice(postDeviceResponse.data.id);
    })

    test('Should be able post a new device', async () => {
        postDeviceResponse = await postDevice(newDeviceBody);
        expect(postDeviceResponse.status).toBe(200);
        expect(postDeviceResponse.data).toHaveProperty('id');

        const getDevicesResponseAfterPost = (await getDevices()).data;
        expect(getDevicesResponse.length).not.toBe(getDevicesResponseAfterPost.length);
        expect(containsObjectWithKeyValue(getDevicesResponseAfterPost, 'system_name', newDeviceBody.system_name)).toBe(true);
    });

    test('Should not be able post a new device without a system_name', async () => {
        const invalidRequestBody = {
            type: 'MAC',
            hdd_capacity: '44'
        }

        postDeviceResponse = await postDevice(invalidRequestBody);
        expect(postDeviceResponse.status).not.toBe(200);

        const getDevicesResponseAfterPost = (await getDevices());
        expect(getDevicesResponse.length).toBe(getDevicesResponseAfterPost.length);
        expect(containsObjectWithKeyValue(getDevicesResponseAfterPost, 'system_name', newDeviceBody.system_name)).toBe(false);
    });

    test('Should not be able post a new device without a hdd_capacity', async () => {
        const invalidRequestBody = {
            type: 'MAC',
            system_name: `PC with missing HDD - ${Date.now()}`,
        }

        postDeviceResponse = await postDevice(invalidRequestBody);
        expect(postDeviceResponse.status).not.toBe(200);

        const getDevicesResponseAfterPost = (await getDevices());
        expect(getDevicesResponse.length).toBe(getDevicesResponseAfterPost.length);
        expect(containsObjectWithKeyValue(getDevicesResponseAfterPost, 'system_name', newDeviceBody.system_name)).toBe(false);
    });


    test('Should not be able post a new device without a type', async () => {
        const newDeviceBody = {
            system_name: `PC with missing type - ${Date.now()}`,
            hdd_capacity: '44'
        }

        postDeviceResponse = await postDevice(newDeviceBody);
        expect(postDeviceResponse.status).not.toBe(200);

        const getDevicesResponseAfterPost = (await getDevices());
        expect(getDevicesResponse.length).toBe(getDevicesResponseAfterPost.length);
        expect(containsObjectWithKeyValue(getDevicesResponseAfterPost, 'system_name', newDeviceBody.system_name)).toBe(false);
    });


});
