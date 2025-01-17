const { getDevices, postDevice, deleteDevice, getDevice } = require('../../test-infra/api/index.js');

async function assertDeviceProperty(deviceBody) {
    expect(deviceBody).toHaveProperty('id');
    expect(deviceBody).toHaveProperty('type');
    expect(deviceBody).toHaveProperty('system_name');
    expect(deviceBody).toHaveProperty('hdd_capacity');
}
describe('GET tests', () => {
    test('Should return a list of devices and verify the structure', async () => {
        const response = await getDevices();

        expect(response.status).toBe(200);
        expect(response.data).toBeInstanceOf(Array);
        expect(response.data.length).toBeGreaterThan(0);

        const firstDevice = response.data[0];

        await assertDeviceProperty(firstDevice);
    });


    test('Should return a single item based', async () => {
        const newDeviceBody = {
            type: 'MAC',
            system_name: `GET ITEM - ${Date.now()}`,
            hdd_capacity: '44'
        }
        const postRequestResponse = (await postDevice(newDeviceBody)).data;

        const getDeviceResponse = await getDevice(postRequestResponse.id);
        expect(getDeviceResponse.status).toBe(200);
        expect(getDeviceResponse.data).toBeInstanceOf(Object);

        const deviceBody = getDeviceResponse.data;
        await assertDeviceProperty(deviceBody);

        await deleteDevice(postRequestResponse.id);
    });


    test('Should return 404 when GET in a non-existent item', async () => {
        const invalidId = `${Date.now()}`;

        const getDeviceResponse = await getDevice(invalidId);

        expect(getDeviceResponse.status).toBe(404);
    });

});
