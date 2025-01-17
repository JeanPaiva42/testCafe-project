import { Selector } from 'testcafe';

class MainPage {
    constructor() {
        this.deviceList = Selector('.list-devices');
        this.deviceBox = Selector('.device-main-box');
        this.deviceName = Selector('.device-name');
        this.deviceType = Selector('.device-type');
        this.deviceCapacity = Selector('.device-capacity');
        this.deviceEdit = Selector('.device-edit');
        this.deviceRemove = Selector('.device-remove');
        this.addNewDevice = Selector('a[href="/devices/add"]');
    }

    async getAddNewDeviceButton() {
        return this.addNewDevice;
    }

    async getDeviceList() {
        return this.deviceList;
    }

    async getDeviceBox(deviceName) {
        return this.deviceBox.withText(deviceName);
    }

    async getDeviceName(deviceName) {
        return (await this.getDeviceBox(deviceName)).find('.device-name');
    }

    async getDeviceType(deviceName) {
        return (await this.getDeviceBox(deviceName)).find('.device-type');
    }

    async getDeviceCapacity(deviceName) {
        return (await this.getDeviceBox(deviceName)).find('.device-capacity');
    }

    async editDeviceButton(deviceName) {
        return (await this.getDeviceBox(deviceName)).find('.device-edit');
    }

    async deleteDeviceButton(deviceName) {
        return (await this.getDeviceBox(deviceName)).find('.device-remove');
    }

}

export default new MainPage();
