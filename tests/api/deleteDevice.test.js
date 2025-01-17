const { postDevice, deleteDevice, updateDevice, getDevice } = require('../../test-infra/api/index.js');

describe('DELETE tests', () => {
    const newDeviceBody = {
        type: 'MAC',
        system_name: `DELETE Device - ${Date.now()}`,
        hdd_capacity: '44'
    }

    test('Should be able to delete existing item', async () => {
        const testDevice = (await postDevice(newDeviceBody)).data;
        const deleteResponse = await deleteDevice(testDevice.id);

        expect(deleteResponse.status).toBe(200);
        expect(deleteResponse.data).toBe(1);
    });

    test('Should throw error when deleting non-existing item', async () => {
        const randomId = `${Date.now()}`;

        const deleteResponse = await deleteDevice(randomId);

        expect(deleteResponse.status).not.toBe(200);
    });
});
