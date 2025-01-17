# API Bug Report

**Title**: Missing validation and incorrect status codes in device API endpoints

**Description**: Several API endpoints for device management are not properly validating input data and returning incorrect status codes.

---

## POST Endpoint

### 1. **Creating a device without specifying `hdd_capacity`**

#### Reproduction Steps:
1. Send a `POST` request to create a device without specifying `hdd_capacity`.
2. **Expected Result**: The API should return an error indicating that `hdd_capacity` is required. Status Code shouldn't be 200.
3. **Actual Result**: The device is created successfully without `hdd_capacity`.

---

### 2. **Creating a device without specifying `type`**

#### Reproduction Steps:
1. Send a `POST` request to create a device without specifying `type`.
2. **Expected Result**: The API should return an error indicating that `type` is required. Status Code shouldn't be 200.
3. **Actual Result**: The device is created successfully without `type`.

---

### 3. **Creating a device without specifying `system_name`**

#### Reproduction Steps:
1. Send a `POST` request to create a device without specifying `system_name`.
2. **Expected Result**: The API should return an error indicating that `system_name` is required. Status Code shouldn't be 200.
3. **Actual Result**: The device is created successfully without `system_name`.

---

## PUT Endpoint

### 4. **Updating a non-existent device**

#### Reproduction Steps:
1. Send a `PUT` request to update a device that does not exist.
2. **Expected Result**: The API should return a `404 Not Found` status.
3. **Actual Result**: The API returns a `200 OK` status, even though the device does not exist.

---

## DELETE Endpoint

### 5. **Deleting a non-existent device**

#### Reproduction Steps:
1. Send a `DELETE` request to delete a device that does not exist.
2. **Expected Result**: The API should return a `404 Not Found` status.
3. **Actual Result**: The API returns a `200 OK` status, even though the device does not exist.

---

## GET Endpoint

### 6. **Retrieving a non-existent device**

#### Reproduction Steps:
1. Send a `GET` request to retrieve a device that does not exist.
2. **Expected Result**: The API should return a `404 Not Found` status.
3. **Actual Result**: The API does not return a `404 Not Found` status when trying to get a non-existing item.

---

## Suggested Fixes:
- Implement validation to ensure required fields (`hdd_capacity`, `type`, `system_name`) are provided in the `POST` request.
- Ensure that the `PUT` and `DELETE` endpoints return appropriate status codes (`404 Not Found`) when trying to update or delete non-existing items.
- Modify the `GET` endpoint to return a `404 Not Found` status when attempting to retrieve a non-existing device.
