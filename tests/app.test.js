const fs = require('fs');
const path = require('path');
const { addJPODate, addDataToCSV } = require('./app'); // Assurez-vous que la fonction est exportée dans app.js

describe('addJPODate', () => {
    afterEach(() => {
        jest.restoreAllMocks(); // Restaurez tous les espions après chaque test
    });

    it('should throw an error if date is empty', () => {
        expect(() => {
            addJPODate('');
        }).toThrow('Date cannot be empty');
    });

    it('should throw an error if date format is invalid', () => {
        expect(() => {
            addJPODate('20240607');
        }).toThrow('Invalid date format, expected YYYY-MM-DD');
    });

    it('should throw an error if date is not in the future', () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 1); // Date passée
        const pastDateString = pastDate.toISOString().split('T')[0];
        expect(() => {
            addJPODate(pastDateString);
        }).toThrow('Date must be a future date');
    });

    it('should write date to CSV if date is valid and in the future', () => {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 10); // Date future
        const futureDateString = futureDate.toISOString().split('T')[0];
        const mockCSV = `JPO Date,${futureDateString}\n`;

        const writeFileSpy = jest.spyOn(fs, 'appendFileSync').mockImplementation(() => {});

        addJPODate(futureDateString);

        expect(writeFileSpy).toHaveBeenCalledWith(path.join(__dirname, 'jpo_dates.csv'), mockCSV);
        writeFileSpy.mockRestore();
    });
});

describe('addDataToCSV', () => {
    afterEach(() => {
        jest.restoreAllMocks(); // Restaurez tous les espions après chaque test
    });

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

        expect(writeFileSpy).toHaveBeenCalledWith(path.join(__dirname, 'data.csv'), mockCSV);
        writeFileSpy.mockRestore();
    });
});
