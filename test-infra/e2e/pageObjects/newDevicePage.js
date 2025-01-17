// pageObjects/loginPage.js

import { Selector } from 'testcafe';

// This one is basically the same as the edit device page
class NewDevicePage {
    constructor() {
        this.systemNameInputField = Selector('#system_name');
        this.systemCapacityInputField = Selector('#hdd_capacity');
        this.deviceTypeDropdown = Selector('#type');
        this.submitButton = Selector('.submitButton');
    }

    async getSystemNameInput() {
        return this.systemNameInputField;
    }

    async getSystemCapacityInput() {
        return this.systemCapacityInputField;
    }

    async getTypeDropdown() {
        return this.deviceTypeDropdown;
    }

    async getSubmitButton() {
        return this.submitButton;
    }



}

export default new NewDevicePage();
