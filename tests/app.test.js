const fs = require('fs');
const { addDataToCSV } = require('./app'); // Assurez-vous que la fonction est exportée dans app.js

describe('addDataToCSV', () => {
    it('should throw an error if inputs are empty', () => {
        expect(() => {
            addDataToCSV('', '', '', '');
        }).toThrow('Inputs cannot be empty');
    });

    it('should throw an error if name contains special characters', () => {
        expect(() => {
            addDataToCSV('John@', 'Doe', '1234567890', 'john.doe@example.com');
        }).toThrow('Name cannot contain special characters');
    });

    it('should throw an error if first name contains special characters', () => {
        expect(() => {
            addDataToCSV('John', 'D@oe', '1234567890', 'john.doe@example.com');
        }).toThrow('First name cannot contain special characters');
    });

    it('should throw an error if phone contains special characters', () => {
        expect(() => {
            addDataToCSV('John', 'Doe', '12345!67890', 'john.doe@example.com');
        }).toThrow('Phone number cannot contain special characters');
    });

    it('should throw an error if email does not contain @ and .', () => {
        expect(() => {
            addDataToCSV('John', 'Doe', '1234567890', 'johndoeexamplecom');
        }).toThrow('Invalid email format');
    });

    it('should write data to CSV if inputs are valid', () => {
        const mockData = ['John', 'Doe', '1234567890', 'john.doe@example.com'];
        const mockCSV = `John,Doe,1234567890,john.doe@example.com\n`;
        const writeFileSpy = jest.spyOn(fs, 'appendFileSync').mockImplementation(() => {});

        addDataToCSV(...mockData);

        expect(writeFileSpy).toHaveBeenCalledWith(expect.any(String), mockCSV);
        writeFileSpy.mockRestore();
    });
});
